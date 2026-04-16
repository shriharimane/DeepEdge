import { useState } from "react";

export function LoginPage({ setPage, setAuthed }) {
  const [form, setForm] = useState({ user: "", pass: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [showPass, setShowPass] = useState(false);

  const addLog = (msg, type = "info") =>
    setLogs((l) => [...l.slice(-6), { msg, type, id: Date.now() + Math.random() }]);

  const handleLogin = () => {
    if (!form.user || !form.pass) {
      setError("// ERROR: Credentials required");
      return;
    }

    setError("");
    setLoading(true);
    setProgress(0);
    setLogs([]);

    const steps = [
      [300, "Initiating secure handshake...", "info"],
      [600, "Verifying identity token...", "info"],
      [900, `Authenticating ${form.user}...`, "warn"],
      [1200, "Checking access privileges...", "info"],
      [1500, "Validating 2FA...", "info"],
      [1800, "ACCESS GRANTED — Loading session", "ok"],
    ];

    steps.forEach(([delay, msg, type]) =>
      setTimeout(
        () => {
          addLog(msg, type);
          setProgress(Math.round((delay / 1800) * 100));
        },
        delay
      )
    );

    setTimeout(() => {
      setLoading(false);
      setAuthed(true);
      setPage("dashboard");
    }, 2100);
  };

  const logColors = {
    info: "rgba(0,255,65,.65)",
    warn: "#ffe600",
    ok: "#00f5ff",
    err: "#ff003c",
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 130px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        position: "relative",
        zIndex: 10,
      }}
    >
      <div style={{ width: "100%", maxWidth: 480 }}>
        {/* Header */}
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            className="font-orb glitch"
            style={{
              fontSize: "2.2rem",
              fontWeight: 900,
              color: "#00ff41",
              textShadow:
                "0 0 25px #00ff41, 0 0 50px rgba(0,255,65,.3)",
              letterSpacing: ".25em",
              marginBottom: 6,
            }}
          >
            NEXUS
            <span style={{ color: "#00f5ff" }}>//</span>
            SEC
          </div>
          <div
            className="font-orb"
            style={{
              fontSize: ".65rem",
              letterSpacing: ".3em",
              color: "rgba(0,255,65,.5)",
            }}
          >
            SECURE AUTHENTICATION PORTAL
          </div>
          <div
            style={{
              marginTop: 12,
              display: "flex",
              justifyContent: "center",
              gap: 6,
            }}
          >
            {["AES-256", "TLS 1.3", "ZERO-TRUST"].map((t) => (
              <span
                key={t}
                style={{
                  fontSize: ".52rem",
                  padding: "2px 8px",
                  border: "1px solid rgba(0,255,65,.2)",
                  color: "rgba(0,255,65,.45)",
                  letterSpacing: ".1em",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Card */}
        <div
          className="panel-box fade-up-1"
          style={{ padding: 28, borderRadius: 2 }}
        >
          {/* Corner Decorations */}
          {[["top:0,left:0", "borderTop", "borderLeft"],
            ["top:0,right:0", "borderTop", "borderRight"],
            ["bottom:0,left:0", "borderBottom", "borderLeft"],
            ["bottom:0,right:0", "borderBottom", "borderRight"],
          ].map((_, i) => {
            const pos = [
              { top: 0, left: 0 },
              { top: 0, right: 0 },
              { bottom: 0, left: 0 },
              { bottom: 0, right: 0 },
            ][i];
            const br = [
              {
                borderTop: "2px solid #00ff41",
                borderLeft: "2px solid #00ff41",
                borderRadius: "2px 0 0 0",
              },
              {
                borderTop: "2px solid #00ff41",
                borderRight: "2px solid #00ff41",
                borderRadius: "0 2px 0 0",
              },
              {
                borderBottom: "2px solid #00ff41",
                borderLeft: "2px solid #00ff41",
                borderRadius: "0 0 0 2px",
              },
              {
                borderBottom: "2px solid #00ff41",
                borderRight: "2px solid #00ff41",
                borderRadius: "0 0 2px 0",
              },
            ][i];

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 14,
                  height: 14,
                  ...pos,
                  ...br,
                  zIndex: 2,
                }}
              />
            );
          })}

          <div
            className="font-orb"
            style={{
              fontSize: ".62rem",
              letterSpacing: ".25em",
              color: "#00f5ff",
              marginBottom: 22,
              paddingBottom: 10,
              borderBottom: "1px solid rgba(0,255,65,.15)",
            }}
          >
            <span style={{ color: "#00ff41" }}>■ </span>
            OPERATOR LOGIN
          </div>

          {/* Fields */}
          <div style={{ marginBottom: 16 }}>
            <label
              className="font-mono"
              style={{
                fontSize: ".62rem",
                color: "rgba(0,255,65,.6)",
                letterSpacing: ".15em",
                display: "block",
                marginBottom: 6,
              }}
            >
              <span style={{ color: "#00f5ff" }}>[01]</span>
              OPERATOR ID
            </label>
            <input
              className="input-cyber font-mono"
              type="text"
              placeholder="Enter operator ID..."
              value={form.user}
              onChange={(e) =>
                setForm((f) => ({ ...f, user: e.target.value }))
              }
              style={{
                width: "100%",
                padding: "10px 14px",
                fontSize: ".75rem",
                borderRadius: 2,
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label
              className="font-mono"
              style={{
                fontSize: ".62rem",
                color: "rgba(0,255,65,.6)",
                letterSpacing: ".15em",
                display: "block",
                marginBottom: 6,
              }}
            >
              <span style={{ color: "#00f5ff" }}>[02]</span>
              ACCESS CODE
            </label>
            <div style={{ position: "relative" }}>
              <input
                className="input-cyber font-mono"
                type={showPass ? "text" : "password"}
                placeholder="Enter access code..."
                value={form.pass}
                onChange={(e) =>
                  setForm((f) => ({ ...f, pass: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: "10px 40px 10px 14px",
                  fontSize: ".75rem",
                  borderRadius: 2,
                }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <button
                onClick={() => setShowPass((s) => !s)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "rgba(0,255,65,.5)",
                  fontSize: ".7rem",
                  cursor: "crosshair",
                }}
              >
                {showPass ? "◉" : "◎"}
              </button>
            </div>
          </div>

          {/* Auth log */}
          {logs.length > 0 && (
            <div
              style={{
                background: "rgba(0,0,0,.5)",
                border: "1px solid rgba(0,255,65,.12)",
                padding: "10px 12px",
                marginBottom: 14,
                borderRadius: 2,
                maxHeight: 100,
                overflowY: "auto",
              }}
            >
              {logs.map((l) => (
                <div
                  key={l.id}
                  className="tag-animate font-mono"
                  style={{
                    fontSize: ".6rem",
                    color: logColors[l.type],
                    marginBottom: 2,
                  }}
                >
                  <span style={{ color: "#00f5ff", marginRight: 4 }}>
                    &gt;
                  </span>
                  {l.msg}
                </div>
              ))}
            </div>
          )}

          {/* Progress bar */}
          {loading && (
            <div style={{ marginBottom: 14 }}>
              <div
                style={{
                  height: 4,
                  background: "rgba(0,255,65,.1)",
                  border: "1px solid rgba(0,255,65,.2)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: "#00ff41",
                    boxShadow: "0 0 8px #00ff41",
                    width: progress + "%",
                    transition: "width .3s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="shimmer-bar"
                    style={{ position: "absolute", inset: 0 }}
                  />
                </div>
              </div>
              <div
                style={{
                  fontSize: ".58rem",
                  color: "rgba(0,255,65,.45)",
                  marginTop: 4,
                  textAlign: "right",
                }}
              >
                AUTH: {progress}%
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              style={{
                fontSize: ".65rem",
                color: "#ff003c",
                marginBottom: 12,
                padding: "6px 10px",
                background: "rgba(255,0,60,.07)",
                border: "1px solid rgba(255,0,60,.25)",
              }}
            >
              {error}
            </div>
          )}

          <button
            className="btn-cyber font-orb"
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: ".68rem",
              letterSpacing: ".25em",
              borderRadius: 2,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "AUTHENTICATING..." : "▶ AUTHENTICATE"}
          </button>

          <div
            style={{
              marginTop: 16,
              display: "flex",
              justifyContent: "space-between",
              fontSize: ".6rem",
            }}
          >
            <button
              onClick={() => setPage("register")}
              style={{
                background: "none",
                border: "none",
                color: "rgba(0,255,65,.5)",
                fontFamily: "'Share Tech Mono',monospace",
                letterSpacing: ".1em",
                cursor: "crosshair",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#00ff41")}
              onMouseLeave={(e) =>
                (e.target.style.color = "rgba(0,255,65,.5)")
              }
            >
              ⟶ REQUEST ACCESS
            </button>
            <button
              style={{
                background: "none",
                border: "none",
                color: "rgba(0,255,65,.5)",
                fontFamily: "'Share Tech Mono',monospace",
                letterSpacing: ".1em",
                cursor: "crosshair",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#00f5ff")}
              onMouseLeave={(e) =>
                (e.target.style.color = "rgba(0,255,65,.5)")
              }
            >
              RECOVER CREDENTIALS
            </button>
          </div>
        </div>

        {/* Bottom badges */}
        <div
          className="fade-up-2"
          style={{
            marginTop: 16,
            display: "flex",
            justifyContent: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {[
            ["🔒", "ENCRYPTED"],
            ["🛡", "ZERO-TRUST"],
            ["⚡", "2FA READY"],
            ["🔑", "PKI AUTH"],
          ].map(([i, l]) => (
            <div
              key={l}
              style={{
                fontSize: ".55rem",
                padding: "3px 10px",
                border: "1px solid rgba(0,255,65,.15)",
                color: "rgba(0,255,65,.4)",
                letterSpacing: ".08em",
              }}
            >
              {i} {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
