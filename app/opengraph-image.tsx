import { ImageResponse } from "next/og";
export const alt =
  "AOP — Your dealership. One connected operating system. In development.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "70px",
        background: "#080d14",
        color: "#f4f7fa",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 60, fontWeight: 800 }}>
          aop<span style={{ color: "#36d6a5" }}>.</span>
        </span>
        <span style={{ fontSize: 17, color: "#36d6a5" }}>
          OPERATOR-LED · IN DEVELOPMENT
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 68,
          fontWeight: 600,
          letterSpacing: -3,
          lineHeight: 1.1,
        }}
      >
        <span>Your dealership.</span>
        <span>One connected</span>
        <span style={{ color: "#36d6a5" }}>operating system.</span>
      </div>
      <div style={{ fontSize: 22, color: "#a0aebe" }}>
        Automotive One Platform · Help shape what comes next.
      </div>
    </div>,
    size,
  );
}
