import {
  Activity,
  ArrowUpRight,
  LayoutDashboard,
  CarFront,
  Wrench,
  Package,
  Wallet,
  Users,
  Bell,
  ChevronDown,
  Check,
  Clock3,
} from "lucide-react";
export default function Dashboard() {
  return (
    <div className="dashboard-frame">
      <div className="dashboard-caption">
        <span>
          <span className="small-dot" /> EXECUTIVE WORKSPACE
        </span>
        <span>ILLUSTRATIVE CONCEPT</span>
      </div>
      <div className="dashboard">
        <aside className="dash-rail">
          <span className="dash-logo">a.</span>
          {[LayoutDashboard, CarFront, Wrench, Package, Wallet, Users].map(
            (Icon, i) => (
              <span className={i === 0 ? "rail-active" : ""} key={i}>
                <Icon size={18} />
              </span>
            ),
          )}
        </aside>
        <div className="dash-main">
          <div className="dash-heading">
            <div>
              <span className="muted micro">DEALERSHIP OVERVIEW</span>
              <h3>A clearer picture.</h3>
            </div>
            <span className="dash-filter">
              All departments <ChevronDown size={12} />
            </span>
          </div>
          <div className="kpi-grid">
            {[
              ["Sales pipeline", "Connected", "Opportunities → delivery"],
              ["Workshop", "In view", "Appointments → job cards"],
              ["Inventory", "Coordinated", "Vehicles → parts"],
            ].map(([label, value, sub], i) => (
              <div key={label}>
                <span className="muted micro">
                  {label}
                  <ArrowUpRight size={12} />
                </span>
                <strong>{value}</strong>
                <small>
                  <span className="small-dot" />
                  {sub}
                </small>
                <div className={`mini-bars bars-${i}`}>
                  {[30, 50, 35, 65, 50, 80, 70, 95, 80, 100].map((v, j) => (
                    <i key={j} style={{ height: `${v}%` }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="dash-bottom">
            <div className="chart-panel">
              <div className="panel-heading">
                <span>Department overview</span>
                <span className="muted micro">CONCEPT VIEW</span>
              </div>
              <div className="chart-legend">
                <span>
                  <i /> Sales
                </span>
                <span>
                  <i /> Aftersales
                </span>
              </div>
              <svg
                viewBox="0 0 400 130"
                role="img"
                aria-label="Illustrative department trends; not actual performance data"
              >
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor="#36d6a5" stopOpacity=".2" />
                    <stop offset="1" stopColor="#36d6a5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[20, 55, 90, 125].map((y) => (
                  <path
                    key={y}
                    d={`M0 ${y} H400`}
                    stroke="#25313c"
                    strokeDasharray="3 6"
                  />
                ))}
                <path
                  d="M0 110 C40 110 40 60 85 80 S140 100 170 55 S220 80 250 40 S320 60 350 20 S380 35 400 10 L400 130 L0 130Z"
                  fill="url(#chartFill)"
                />
                <path
                  d="M0 110 C40 110 40 60 85 80 S140 100 170 55 S220 80 250 40 S320 60 350 20 S380 35 400 10"
                  stroke="#36d6a5"
                  fill="none"
                  strokeWidth="3"
                />
                <path
                  d="M0 120 C45 90 60 125 100 100 S160 120 200 85 S270 100 310 75 S365 85 400 50"
                  stroke="#6d90bb"
                  fill="none"
                  strokeWidth="2"
                />
              </svg>
              <div className="chart-axis">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
              </div>
            </div>
            <div className="alerts-panel">
              <div className="panel-heading">
                <span>Attention centre</span>
                <Bell size={13} />
              </div>
              {[
                [Clock3, "Follow-ups", "Review next actions"],
                [Activity, "Workshop", "Check job progress"],
                [Check, "Approvals", "See pending requests"],
              ].map(([Icon, title, sub]) => {
                const I = Icon as typeof Check;
                return (
                  <div className="alert-row" key={title as string}>
                    <I size={15} />
                    <div>
                      <strong>{title as string}</strong>
                      <small>{sub as string}</small>
                    </div>
                    <ArrowUpRight size={12} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-note">
        <span className="small-dot" /> Connected departments. One management
        perspective.
      </div>
    </div>
  );
}
