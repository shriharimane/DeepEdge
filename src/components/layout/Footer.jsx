import { useEffect, useState } from "react";
import { fmt } from "../shared/Utils";

export function Footer() {
  const [up, setUp] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setUp((u) => u + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer
      className="font-mono"
      style={{
        background: "rgba(0,6,0,.97)",
        borderTop: "1px solid rgba(0,255,65,.15)",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          padding: "12px 20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          fontSize: ".6rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            className="font-orb"
            style={{
              fontWeight: 700,
              color: "#00ff41",
              textShadow: "0 0 7px #00ff41",
              fontSize: ".75rem",
            }}
          >
            NEXUS//SEC
          </span>
          <span style={{ color: "rgba(0,255,65,.2)" }}>|</span>
          <span style={{ color: "rgba(0,255,65,.4)" }}>
            SESSION:{" "}
            <span style={{ color: "#00f5ff" }}>
              {fmt(up)}
            </span>
          </span>
          <span style={{ color: "rgba(0,255,65,.2)" }}>|</span>
          <span style={{ color: "rgba(0,255,65,.4)" }}>
            BUILD:{" "}
            <span style={{ color: "#00ff41" }}>
              v4.2.1-stable
            </span>
          </span>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Docs", "API", "Alerts", "Support", "Privacy"].map(
            (l) => (
              <button
                key={l}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(0,255,65,.4)",
                  fontSize: ".6rem",
                  fontFamily: "'Share Tech Mono',monospace",
                  letterSpacing: ".08em",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "#00ff41")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(0,255,65,.4)")
                }
              >
                {l}
              </button>
            )
          )}
        </div>

        <span style={{ color: "rgba(0,255,65,.25)" }}>
          &copy; 2025 NEXUS SECURITY —{" "}
          <span style={{ color: "#ff003c" }}>CLASSIFIED</span>
        </span>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(0,255,65,.07)",
          padding: "8px 20px",
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          fontSize: ".58rem",
        }}
      >
        {[
          ["ENCRYPTION", "AES-256-GCM", "#00ff41"],
          ["CERT EXPIRY", "127 DAYS", "#00f5ff"],
          ["LAST SCAN", "00:04:17 AGO", "#00ff41"],
          ["COMPLIANCE", "SOC2 / ISO27001", "#ffe600"],
          ["DATA CENTER", "DC-EAST-03", "#00f5ff"],
          ["THREAT DB", "v2025.03.01", "#00ff41"],
        ].map(([l, v, c]) => (
          <div key={l}>
            <div style={{ color: "rgba(0,255,65,.3)" }}>
              {l}
            </div>
            <div style={{ color: c }}>{v}</div>
          </div>
        ))}
      </div>
    </footer>
  );
}
