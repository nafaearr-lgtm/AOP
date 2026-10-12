-- Run once in the Supabase SQL editor. No public lead-reading privileges.
create table public.aop_submissions (
 id uuid primary key default gen_random_uuid(), request_id uuid not null unique,
 fingerprint text not null, kind text not null check(kind in ('interest','contact')),
 name text not null, work_email text not null, job_title text, company text not null,
 company_website text, country text not null, automotive_brands text,
 rooftop_count integer check(rooftop_count > 0), operational_challenge text,
 areas_of_interest jsonb not null default '[]', additional_comments text,
 marketing_consent boolean not null default false, consent_timestamp timestamptz,
 policy_version text not null, privacy_acknowledged boolean not null,
 submitted_at timestamptz not null default now(), source_page text not null,
 lead_status text not null default 'New Pre-Launch Interest',
 check (marketing_consent = (consent_timestamp is not null))
);
create index aop_submissions_email_idx on public.aop_submissions(work_email);
create table public.aop_rate_limits (rate_key text primary key, window_started timestamptz not null, attempts integer not null);
alter table public.aop_submissions enable row level security;
alter table public.aop_rate_limits enable row level security;
revoke all on public.aop_submissions, public.aop_rate_limits from anon, authenticated;
-- Called exclusively with server-side service role; atomic rate limiting + retry protection.
create or replace function public.submit_aop_enquiry(p_data jsonb,p_request_id uuid,p_fingerprint text,p_rate_key text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare existing public.aop_submissions%rowtype; n integer; new_id uuid;
begin
 perform pg_advisory_xact_lock(hashtextextended(p_request_id::text,0));
 select * into existing from public.aop_submissions where request_id=p_request_id;
 if found then
  if existing.fingerprint<>p_fingerprint then return jsonb_build_object('error','conflict'); end if;
  return jsonb_build_object('id',existing.id);
 end if;
 insert into public.aop_rate_limits values(p_rate_key,now(),1)
 on conflict(rate_key) do update set
 attempts=case when public.aop_rate_limits.window_started < now()-interval '1 hour' then 1 else public.aop_rate_limits.attempts+1 end,
 window_started=case when public.aop_rate_limits.window_started < now()-interval '1 hour' then now() else public.aop_rate_limits.window_started end
 returning attempts into n;
 if n>5 then return jsonb_build_object('error','rate'); end if;
 insert into public.aop_submissions(request_id,fingerprint,kind,name,work_email,job_title,company,company_website,country,automotive_brands,rooftop_count,operational_challenge,areas_of_interest,additional_comments,marketing_consent,consent_timestamp,policy_version,privacy_acknowledged,source_page,lead_status)
 values(p_request_id,p_fingerprint,p_data->>'kind',p_data->>'name',p_data->>'work_email',p_data->>'job_title',p_data->>'company',p_data->>'company_website',p_data->>'country',p_data->>'automotive_brands',(p_data->>'rooftop_count')::integer,p_data->>'operational_challenge',p_data->'areas_of_interest',p_data->>'additional_comments',(p_data->>'marketing_consent')::boolean,(p_data->>'consent_timestamp')::timestamptz,p_data->>'policy_version',(p_data->>'privacy_acknowledged')::boolean,p_data->>'source_page',p_data->>'lead_status') returning id into new_id;
 delete from public.aop_rate_limits where window_started<now()-interval '2 days';
 return jsonb_build_object('id',new_id);
end; $$;
revoke all on function public.submit_aop_enquiry(jsonb,uuid,text,text) from public,anon,authenticated;
grant execute on function public.submit_aop_enquiry(jsonb,uuid,text,text) to service_role;
