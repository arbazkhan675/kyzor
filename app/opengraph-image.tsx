import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Kyzor | Custom E-commerce Applications & Business Automations";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #09090b 0%, #18181b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "sans-serif",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            K
          </div>
          <span style={{ fontSize: "36px", fontWeight: "bold", letterSpacing: "-1px" }}>Kyzor</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
          <span
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#a855f7",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Custom Engineering Agency
          </span>
          <h1
            style={{
              fontSize: "52px",
              fontWeight: "800",
              lineHeight: "1.15",
              margin: 0,
              color: "#ffffff",
            }}
          >
            Custom E-commerce Applications & Business Automations
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "#a1a1aa",
              margin: 0,
              lineHeight: "1.4",
            }}
          >
            Built completely from scratch with zero platform locks.
          </p>
        </div>

        <div
          style={{
            fontSize: "18px",
            color: "#71717a",
            fontWeight: "600",
          }}
        >
          kyzor.online
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
