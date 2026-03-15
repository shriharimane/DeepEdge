import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════
   GLOBAL STYLES + FONTS
═══════════════════════════════════════════════ */
function GlobalStyles() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap";
    document.head.appendChild(link);
    const s = document.createElement("style");
    s.textContent = `
      *{cursor:crosshair!important;box-sizing:border-box;}
      body,html{margin:0;padding:0;background:#000a00;overflow-x:hidden;}
      input,textarea,button{font-family:'Share Tech Mono',monospace!important;}
      ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#003311;border-radius:2px}
      .font-orb{font-family:'Orbitron',monospace}
      .font-mono{font-family:'Share Tech Mono',monospace}
      @keyframes scanl{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}
      @keyframes pdot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
      @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
      @keyframes hflash{0%{background:rgba(255,0,60,.15)}100%{background:rgba(255,0,60,.4)}}
      @keyframes glitch{0%,90%,100%{clip-path:none;transform:none}91%{clip-path:polygon(0 20%,100% 20%,100% 40%,0 40%);transform:translateX(-4px);color:#00f5ff}93%{clip-path:polygon(0 60%,100% 60%,100% 80%,0 80%);transform:translateX(4px);color:#ff003c}95%{clip-path:none;transform:none}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
      @keyframes pulse-border{0%,100%{box-shadow:0 0 0 0 rgba(0,255,65,.4)}50%{box-shadow:0 0 0 4px rgba(0,255,65,.1)}}
      @keyframes spin-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
      @keyframes progress-fill{from{width:0%}to{width:var(--w)}}
      @keyframes type-cursor{0%,100%{opacity:1}50%{opacity:0}}
      .glitch{animation:glitch 5s linear infinite}
      .scanline::before{content:'';position:absolute;top:0;left:0;width:60%;height:2px;background:linear-gradient(90deg,transparent,rgba(0,255,65,.7),transparent);animation:scanl 3s linear infinite}
      .shimmer-bar::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);animation:shimmer 2s linear infinite}
      .hex-d{animation:hflash 1s ease infinite alternate}
      .fade-up{animation:fadeUp .5s ease both}
      .fade-up-1{animation:fadeUp .5s .1s ease both;opacity:0}
      .fade-up-2{animation:fadeUp .5s .2s ease both;opacity:0}
      .fade-up-3{animation:fadeUp .5s .3s ease both;opacity:0}
      .fade-up-4{animation:fadeUp .5s .4s ease both;opacity:0}
      .fade-up-5{animation:fadeUp .5s .5s ease both;opacity:0}
      .blink{animation:blink 1s step-end infinite}
      .float-anim{animation:float 4s ease-in-out infinite}
      .spin-slow{animation:spin-slow 8s linear infinite}
      .input-cyber{background:rgba(0,255,65,.04)!important;border:1px solid rgba(0,255,65,.25)!important;color:#00ff41!important;outline:none!important;transition:all .3s}
      .input-cyber:focus{border-color:rgba(0,255,65,.7)!important;box-shadow:0 0 0 2px rgba(0,255,65,.1),0 0 15px rgba(0,255,65,.15)!important;}
      .input-cyber::placeholder{color:rgba(0,255,65,.3)!important}
      .input-cyber:-webkit-autofill{-webkit-text-fill-color:#00ff41!important;-webkit-box-shadow:0 0 0 1000px #001a00 inset!important;}
      .btn-cyber{background:rgba(0,255,65,.08);border:1px solid rgba(0,255,65,.5);color:#00ff41;transition:all .3s;position:relative;overflow:hidden;}
      .btn-cyber::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(0,255,65,.12),transparent);transform:translateX(-100%);transition:transform .4s}
      .btn-cyber:hover::before{transform:translateX(100%)}
      .btn-cyber:hover{border-color:#00ff41;box-shadow:0 0 20px rgba(0,255,65,.3),inset 0 0 10px rgba(0,255,65,.05)}
      .btn-cyber:active{transform:scale(.98)}
      .panel-box{background:rgba(0,18,4,.9);border:1px solid rgba(0,255,65,.2);position:relative;overflow:hidden;}
      .panel-box::before{content:'';position:absolute;top:0;left:0;width:60%;height:2px;background:linear-gradient(90deg,transparent,rgba(0,255,65,.6),transparent);animation:scanl 3.5s linear infinite}
      .drop-zone{border:2px dashed rgba(0,255,65,.3);background:rgba(0,255,65,.03);transition:all .3s}
      .drop-zone:hover,.drop-zone.drag-over{border-color:rgba(0,255,65,.7);background:rgba(0,255,65,.07);box-shadow:0 0 20px rgba(0,255,65,.15)}
      .nav-link{color:rgba(0,255,65,.45);transition:all .2s;position:relative;}
      .nav-link:hover,.nav-link.active{color:#00ff41}
      .nav-link.active::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:2px;background:#00ff41;box-shadow:0 0 6px #00ff41}
      .tag-animate{animation:fadeUp .3s ease both}
    `;
    document.head.appendChild(s);
    return () => { document.head.removeChild(link); document.head.removeChild(s); };
  }, []);
  return null;
}

/* ══════════════════════════════════════════════
   MATRIX CANVAS
═══════════════════════════════════════════════ */
function MatrixRain({ opacity = 0.06 }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    const chars = "アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF<>[]{}|/\\!@#$%^&*";
    let drops = [];
    const resize = () => { c.width = innerWidth; c.height = innerHeight; drops = Array(Math.floor(c.width / 14)).fill(1); };
    resize(); window.addEventListener("resize", resize);
    const id = setInterval(() => {
      ctx.fillStyle = "rgba(0,0,0,0.05)"; ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = "#00ff41"; ctx.font = "12px Share Tech Mono";
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 14, y * 14);
        if (y * 14 > c.height && Math.random() > .975) drops[i] = 0;
        drops[i]++;
      });
    }, 60);
    return () => { clearInterval(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, opacity, pointerEvents: "none" }} />;
}

/* ══════════════════════════════════════════════
   SCANLINES OVERLAY
═══════════════════════════════════════════════ */
const Scanlines = () => (
  <div style={{ position: "fixed", inset: 0, zIndex: 5, pointerEvents: "none",
    background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.065) 2px,rgba(0,0,0,.065) 4px)" }} />
);

/* ══════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════ */
const ri = (a, b) => Math.floor(Math.random() * (b - a)) + a;
const rip = () => `${ri(1,255)}.${ri(0,255)}.${ri(0,255)}.${ri(1,254)}`;
const ts = () => new Date().toTimeString().slice(0, 8);

/* ══════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════ */
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "analysis", label: "File Analysis" },
  { id: "login", label: "Login" },
  { id: "register", label: "Register" },
];

function Navbar({ page, setPage, authed, setAuthed }) {
  const [clock, setClock] = useState(new Date().toTimeString().slice(0,8));
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => { const id = setInterval(() => setClock(new Date().toTimeString().slice(0,8)), 1000); return () => clearInterval(id); }, []);

  return (
    <nav className="font-mono" style={{ background: "rgba(0,6,0,.97)", borderBottom: "1px solid rgba(0,255,65,.18)", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", flexWrap: "wrap", gap: 8 }}>
        {/* Logo */}
        <button onClick={() => setPage("dashboard")} style={{ background: "none", border: "none", padding: 0 }}>
          <span className="font-orb glitch" style={{ fontSize: "1.1rem", fontWeight: 900, letterSpacing: ".25em", color: "#00ff41", textShadow: "0 0 14px #00ff41" }}>
            NEXUS<span style={{ color: "#00f5ff" }}>//</span>SEC
          </span>
        </button>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 2, alignItems: "center" }} className="hidden-mobile">
          {NAV_ITEMS.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)}
              className={`nav-link ${page === n.id ? "active" : ""}`}
              style={{ background: "none", border: "none", padding: "6px 14px", fontSize: ".68rem", letterSpacing: ".15em", fontFamily: "'Share Tech Mono',monospace" }}>
              {page === n.id && <span style={{ color: "#00f5ff", marginRight: 4 }}>■</span>}{n.label.toUpperCase()}
            </button>
          ))}
          {authed && (
            <button onClick={() => { setAuthed(false); setPage("login"); }}
              style={{ marginLeft: 8, padding: "4px 12px", fontSize: ".6rem", letterSpacing: ".12em", border: "1px solid rgba(255,0,60,.4)", color: "#ff003c", background: "rgba(255,0,60,.07)", fontFamily: "'Share Tech Mono',monospace" }}>
              LOGOUT
            </button>
          )}
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 12, fontSize: ".62rem", letterSpacing: ".08em" }}>
            {[{ c: "#00ff41", l: "SECURE" }, { c: "#ff003c", l: "3 ALERTS", d: ".5s" }, { c: "#00f5ff", l: "ONLINE", d: "1s" }].map(({ c, l, d="0s" }) => (
              <span key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: c, boxShadow: `0 0 5px ${c}`, animation: `pdot 1.5s ${d} infinite`, display: "inline-block" }} />
                <span style={{ color: "rgba(0,255,65,.55)" }}>{l}</span>
              </span>
            ))}
          </div>
          <span className="font-orb" style={{ fontSize: ".78rem", color: "#00f5ff", textShadow: "0 0 7px #00f5ff" }}>{clock}</span>
          {authed && <span style={{ fontSize: ".58rem", padding: "2px 8px", border: "1px solid rgba(0,255,65,.3)", color: "#00ff41", letterSpacing: ".1em" }}>● AUTH</span>}
        </div>
      </div>

      {/* Sub nav bar */}
      <div style={{ borderTop: "1px solid rgba(0,255,65,.1)", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
        <div style={{ display: "flex" }}>
          {NAV_ITEMS.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)}
              className={`nav-link ${page === n.id ? "active" : ""}`}
              style={{ background: page === n.id ? "rgba(0,255,65,.07)" : "none", border: "none", borderBottom: page === n.id ? "2px solid #00ff41" : "2px solid transparent", padding: "7px 16px", fontSize: ".6rem", letterSpacing: ".18em", fontFamily: "'Share Tech Mono',monospace" }}>
              {n.label.toUpperCase()}
            </button>
          ))}
        </div>
        <div style={{ fontSize: ".58rem", color: "rgba(0,255,65,.35)", padding: "4px 0" }}>
          SESSION: <span style={{ color: "#00f5ff" }}>ADM-0x4F2A</span>
          <span style={{ margin: "0 8px", color: "rgba(0,255,65,.2)" }}>|</span>
          NODE: <span style={{ color: "#00ff41" }}>NEXUS-EAST-03</span>
        </div>
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════ */
function Footer() {
  const [up, setUp] = useState(0);
  useEffect(() => { const id = setInterval(() => setUp(u => u + 1), 1000); return () => clearInterval(id); }, []);
  const fmt = s => `${String(Math.floor(s/3600)).padStart(2,"0")}:${String(Math.floor((s%3600)/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  return (
    <footer className="font-mono" style={{ background: "rgba(0,6,0,.97)", borderTop: "1px solid rgba(0,255,65,.15)", marginTop: "auto" }}>
      <div style={{ padding: "12px 20px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 10, fontSize: ".6rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className="font-orb" style={{ fontWeight: 700, color: "#00ff41", textShadow: "0 0 7px #00ff41", fontSize: ".75rem" }}>NEXUS//SEC</span>
          <span style={{ color: "rgba(0,255,65,.2)" }}>|</span>
          <span style={{ color: "rgba(0,255,65,.4)" }}>SESSION: <span style={{ color: "#00f5ff" }}>{fmt(up)}</span></span>
          <span style={{ color: "rgba(0,255,65,.2)" }}>|</span>
          <span style={{ color: "rgba(0,255,65,.4)" }}>BUILD: <span style={{ color: "#00ff41" }}>v4.2.1-stable</span></span>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {["Docs","API","Alerts","Support","Privacy"].map(l => (
            <button key={l} style={{ background: "none", border: "none", color: "rgba(0,255,65,.4)", fontSize: ".6rem", fontFamily: "'Share Tech Mono',monospace", letterSpacing: ".08em" }}
              onMouseEnter={e => e.target.style.color = "#00ff41"} onMouseLeave={e => e.target.style.color = "rgba(0,255,65,.4)"}>{l}</button>
          ))}
        </div>
        <span style={{ color: "rgba(0,255,65,.25)" }}>&copy; 2025 NEXUS SECURITY — <span style={{ color: "#ff003c" }}>CLASSIFIED</span></span>
      </div>
      <div style={{ borderTop: "1px solid rgba(0,255,65,.07)", padding: "8px 20px", display: "flex", flexWrap: "wrap", gap: 20, fontSize: ".58rem" }}>
        {[["ENCRYPTION","AES-256-GCM","#00ff41"],["CERT EXPIRY","127 DAYS","#00f5ff"],["LAST SCAN","00:04:17 AGO","#00ff41"],["COMPLIANCE","SOC2 / ISO27001","#ffe600"],["DATA CENTER","DC-EAST-03","#00f5ff"],["THREAT DB","v2025.03.01","#00ff41"]].map(([l,v,c]) => (
          <div key={l}><div style={{ color: "rgba(0,255,65,.3)" }}>{l}</div><div style={{ color: c }}>{v}</div></div>
        ))}
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════
   LOGIN PAGE
═══════════════════════════════════════════════ */
function LoginPage({ setPage, setAuthed }) {
  const [form, setForm] = useState({ user: "", pass: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [showPass, setShowPass] = useState(false);

  const addLog = (msg, type = "info") => setLogs(l => [...l.slice(-6), { msg, type, id: Date.now() + Math.random() }]);

  const handleLogin = () => {
    if (!form.user || !form.pass) { setError("// ERROR: Credentials required"); return; }
    setError(""); setLoading(true); setProgress(0); setLogs([]);
    const steps = [
      [300, "Initiating secure handshake...", "info"],
      [600, "Verifying identity token...", "info"],
      [900, `Authenticating ${form.user}...`, "warn"],
      [1200, "Checking access privileges...", "info"],
      [1500, "Validating 2FA...","info"],
      [1800, "ACCESS GRANTED — Loading session", "ok"],
    ];
    steps.forEach(([delay, msg, type]) => setTimeout(() => { addLog(msg, type); setProgress(Math.round((delay/1800)*100)); }, delay));
    setTimeout(() => { setLoading(false); setAuthed(true); setPage("dashboard"); }, 2100);
  };

  const logColors = { info: "rgba(0,255,65,.65)", warn: "#ffe600", ok: "#00f5ff", err: "#ff003c" };

  return (
    <div style={{ minHeight: "calc(100vh - 130px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative", zIndex: 10 }}>
      <div style={{ width: "100%", maxWidth: 480 }}>
        {/* Header */}
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 32 }}>
          <div className="font-orb glitch" style={{ fontSize: "2.2rem", fontWeight: 900, color: "#00ff41", textShadow: "0 0 25px #00ff41, 0 0 50px rgba(0,255,65,.3)", letterSpacing: ".25em", marginBottom: 6 }}>
            NEXUS<span style={{ color: "#00f5ff" }}>//</span>SEC
          </div>
          <div className="font-orb" style={{ fontSize: ".65rem", letterSpacing: ".3em", color: "rgba(0,255,65,.5)" }}>SECURE AUTHENTICATION PORTAL</div>
          <div style={{ marginTop: 12, display: "flex", justifyContent: "center", gap: 6 }}>
            {["AES-256","TLS 1.3","ZERO-TRUST"].map(t => (
              <span key={t} style={{ fontSize: ".52rem", padding: "2px 8px", border: "1px solid rgba(0,255,65,.2)", color: "rgba(0,255,65,.45)", letterSpacing: ".1em" }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="panel-box fade-up-1" style={{ padding: 28, borderRadius: 2 }}>
          {/* Corner decorations */}
          {[["top:0,left:0","borderTop","borderLeft"],["top:0,right:0","borderTop","borderRight"],["bottom:0,left:0","borderBottom","borderLeft"],["bottom:0,right:0","borderBottom","borderRight"]].map((_, i) => {
            const pos = [{ top:0,left:0 },{ top:0,right:0 },{ bottom:0,left:0 },{ bottom:0,right:0 }][i];
            const br = [{ borderTop:"2px solid #00ff41",borderLeft:"2px solid #00ff41",borderRadius:"2px 0 0 0" },{ borderTop:"2px solid #00ff41",borderRight:"2px solid #00ff41",borderRadius:"0 2px 0 0" },{ borderBottom:"2px solid #00ff41",borderLeft:"2px solid #00ff41",borderRadius:"0 0 0 2px" },{ borderBottom:"2px solid #00ff41",borderRight:"2px solid #00ff41",borderRadius:"0 0 2px 0" }][i];
            return <div key={i} style={{ position:"absolute",width:14,height:14,...pos,...br,zIndex:2 }} />;
          })}

          <div className="font-orb" style={{ fontSize: ".62rem", letterSpacing: ".25em", color: "#00f5ff", marginBottom: 22, paddingBottom: 10, borderBottom: "1px solid rgba(0,255,65,.15)" }}>
            <span style={{ color: "#00ff41" }}>■ </span>OPERATOR LOGIN
          </div>

          {/* Fields */}
          <div style={{ marginBottom: 16 }}>
            <label className="font-mono" style={{ fontSize: ".62rem", color: "rgba(0,255,65,.6)", letterSpacing: ".15em", display: "block", marginBottom: 6 }}>
              <span style={{ color: "#00f5ff" }}>[01]</span> OPERATOR ID
            </label>
            <input className="input-cyber font-mono" type="text" placeholder="Enter operator ID..."
              value={form.user} onChange={e => setForm(f => ({ ...f, user: e.target.value }))}
              style={{ width: "100%", padding: "10px 14px", fontSize: ".75rem", borderRadius: 2 }}
              onKeyDown={e => e.key === "Enter" && handleLogin()} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label className="font-mono" style={{ fontSize: ".62rem", color: "rgba(0,255,65,.6)", letterSpacing: ".15em", display: "block", marginBottom: 6 }}>
              <span style={{ color: "#00f5ff" }}>[02]</span> ACCESS CODE
            </label>
            <div style={{ position: "relative" }}>
              <input className="input-cyber font-mono" type={showPass ? "text" : "password"} placeholder="Enter access code..."
                value={form.pass} onChange={e => setForm(f => ({ ...f, pass: e.target.value }))}
                style={{ width: "100%", padding: "10px 40px 10px 14px", fontSize: ".75rem", borderRadius: 2 }}
                onKeyDown={e => e.key === "Enter" && handleLogin()} />
              <button onClick={() => setShowPass(s => !s)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(0,255,65,.5)", fontSize: ".7rem" }}>
                {showPass ? "◉" : "◎"}
              </button>
            </div>
          </div>

          {/* Auth log */}
          {logs.length > 0 && (
            <div style={{ background: "rgba(0,0,0,.5)", border: "1px solid rgba(0,255,65,.12)", padding: "10px 12px", marginBottom: 14, borderRadius: 2, maxHeight: 100, overflowY: "auto" }}>
              {logs.map(l => (
                <div key={l.id} className="tag-animate font-mono" style={{ fontSize: ".6rem", color: logColors[l.type], marginBottom: 2 }}>
                  <span style={{ color: "#00f5ff", marginRight: 4 }}>&gt;</span>{l.msg}
                </div>
              ))}
            </div>
          )}

          {/* Progress bar */}
          {loading && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ height: 4, background: "rgba(0,255,65,.1)", border: "1px solid rgba(0,255,65,.2)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", background: "#00ff41", boxShadow: "0 0 8px #00ff41", width: progress + "%", transition: "width .3s ease", position: "relative", overflow: "hidden" }}>
                  <div className="shimmer-bar" style={{ position: "absolute", inset: 0 }} />
                </div>
              </div>
              <div style={{ fontSize: ".58rem", color: "rgba(0,255,65,.45)", marginTop: 4, textAlign: "right" }}>AUTH: {progress}%</div>
            </div>
          )}

          {/* Error */}
          {error && <div style={{ fontSize: ".65rem", color: "#ff003c", marginBottom: 12, padding: "6px 10px", background: "rgba(255,0,60,.07)", border: "1px solid rgba(255,0,60,.25)" }}>{error}</div>}

          <button className="btn-cyber font-orb" onClick={handleLogin} disabled={loading}
            style={{ width: "100%", padding: "12px", fontSize: ".68rem", letterSpacing: ".25em", borderRadius: 2, opacity: loading ? .7 : 1 }}>
            {loading ? "AUTHENTICATING..." : "▶ AUTHENTICATE"}
          </button>

          <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", fontSize: ".6rem" }}>
            <button onClick={() => setPage("register")} style={{ background: "none", border: "none", color: "rgba(0,255,65,.5)", fontFamily: "'Share Tech Mono',monospace", letterSpacing: ".1em" }}
              onMouseEnter={e => e.target.style.color="#00ff41"} onMouseLeave={e => e.target.style.color="rgba(0,255,65,.5)"}>
              ⟶ REQUEST ACCESS
            </button>
            <button style={{ background: "none", border: "none", color: "rgba(0,255,65,.5)", fontFamily: "'Share Tech Mono',monospace", letterSpacing: ".1em" }}
              onMouseEnter={e => e.target.style.color="#00f5ff"} onMouseLeave={e => e.target.style.color="rgba(0,255,65,.5)"}>
              RECOVER CREDENTIALS
            </button>
          </div>
        </div>

        {/* Bottom badges */}
        <div className="fade-up-2" style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          {[["🔒","ENCRYPTED"],["🛡","ZERO-TRUST"],["⚡","2FA READY"],["🔑","PKI AUTH"]].map(([i,l]) => (
            <div key={l} style={{ fontSize: ".55rem", padding: "3px 10px", border: "1px solid rgba(0,255,65,.15)", color: "rgba(0,255,65,.4)", letterSpacing: ".08em" }}>{i} {l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   REGISTER PAGE
═══════════════════════════════════════════════ */
function RegisterPage({ setPage }) {
  const [form, setForm] = useState({ user: "", email: "", pass: "", confirm: "", code: "", role: "analyst" });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});
  const [strength, setStrength] = useState(0);

  const calcStrength = (p) => {
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    if (p.length >= 14) s++;
    return s;
  };
  const strengthColors = ["#ff003c","#ff003c","#ff8c00","#ffe600","#00ff41","#00f5ff"];
  const strengthLabels = ["","WEAK","WEAK","FAIR","STRONG","MAXIMUM"];

  const validate1 = () => {
    const e = {};
    if (!form.user || form.user.length < 3) e.user = "Min 3 characters required";
    if (!form.email || !form.email.includes("@")) e.email = "Valid email required";
    setErrors(e); return Object.keys(e).length === 0;
  };
  const validate2 = () => {
    const e = {};
    if (strength < 2) e.pass = "Password too weak";
    if (form.pass !== form.confirm) e.confirm = "Passwords do not match";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && !validate1()) return;
    if (step === 2 && !validate2()) return;
    if (step === 3) { handleRegister(); return; }
    setStep(s => s + 1); setErrors({});
  };

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 2200);
  };

  if (done) return (
    <div style={{ minHeight: "calc(100vh - 130px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative", zIndex: 10 }}>
      <div className="panel-box fade-up" style={{ padding: 40, maxWidth: 420, width: "100%", textAlign: "center", borderRadius: 2 }}>
        <div style={{ fontSize: "3rem", marginBottom: 12 }} className="float-anim">✓</div>
        <div className="font-orb" style={{ fontSize: "1.2rem", fontWeight: 700, color: "#00ff41", textShadow: "0 0 14px #00ff41", letterSpacing: ".2em", marginBottom: 8 }}>ACCESS GRANTED</div>
        <div className="font-mono" style={{ fontSize: ".68rem", color: "rgba(0,255,65,.6)", marginBottom: 20, lineHeight: 1.8 }}>
          Operator account created.<br/>
          Your access request is pending clearance.<br/>
          <span style={{ color: "#00f5ff" }}>Clearance ID: NSC-{ri(10000,99999)}</span>
        </div>
        <button className="btn-cyber font-orb" onClick={() => setPage("login")}
          style={{ width: "100%", padding: "11px", fontSize: ".65rem", letterSpacing: ".2em", borderRadius: 2 }}>
          ▶ PROCEED TO LOGIN
        </button>
      </div>
    </div>
  );

  const ROLES = [["analyst","ANALYST","Threat analyst access"],["engineer","ENGINEER","Full system access"],["viewer","VIEWER","Read-only access"],["admin","ADMIN","Administrative access"]];

  return (
    <div style={{ minHeight: "calc(100vh - 130px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative", zIndex: 10 }}>
      <div style={{ width: "100%", maxWidth: 520 }}>
        {/* Header */}
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 28 }}>
          <div className="font-orb" style={{ fontSize: "1.7rem", fontWeight: 900, color: "#00ff41", textShadow: "0 0 20px #00ff41", letterSpacing: ".2em", marginBottom: 4 }}>
            REQUEST ACCESS
          </div>
          <div className="font-orb" style={{ fontSize: ".6rem", letterSpacing: ".25em", color: "rgba(0,255,65,.45)" }}>OPERATOR REGISTRATION — NEXUS SECURITY NETWORK</div>
        </div>

        {/* Step indicator */}
        <div className="fade-up-1" style={{ display: "flex", alignItems: "center", marginBottom: 22, gap: 0 }}>
          {[1,2,3].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${step >= s ? "#00ff41" : "rgba(0,255,65,.2)"}`, background: step >= s ? "rgba(0,255,65,.12)" : "transparent", color: step >= s ? "#00ff41" : "rgba(0,255,65,.3)", boxShadow: step >= s ? "0 0 10px rgba(0,255,65,.3)" : "none", fontSize: ".65rem", flexShrink: 0 }} className="font-orb">
                {step > s ? "✓" : s}
              </div>
              <div style={{ flex: 1, height: 1, background: step > s ? "#00ff41" : "rgba(0,255,65,.15)", boxShadow: step > s ? "0 0 4px #00ff41" : "none" }} />
            </div>
          ))}
          <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${step >= 3 ? "#00ff41" : "rgba(0,255,65,.2)"}`, background: step >= 3 ? "rgba(0,255,65,.12)" : "transparent", color: step >= 3 ? "#00ff41" : "rgba(0,255,65,.3)", fontSize: ".65rem" }} className="font-orb">3</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".55rem", color: "rgba(0,255,65,.4)", marginBottom: 20, letterSpacing: ".1em" }}>
          <span style={{ color: step >= 1 ? "#00f5ff" : undefined }}>IDENTITY</span>
          <span style={{ color: step >= 2 ? "#00f5ff" : undefined }}>CREDENTIALS</span>
          <span style={{ color: step >= 3 ? "#00f5ff" : undefined }}>CLEARANCE</span>
        </div>

        <div className="panel-box fade-up-2" style={{ padding: 28, borderRadius: 2 }}>
          {/* Corner decorations */}
          {[0,1,2,3].map(i => {
            const pos = [{ top:0,left:0 },{ top:0,right:0 },{ bottom:0,left:0 },{ bottom:0,right:0 }][i];
            const br = [{ borderTop:"2px solid #00ff41",borderLeft:"2px solid #00ff41" },{ borderTop:"2px solid #00ff41",borderRight:"2px solid #00ff41" },{ borderBottom:"2px solid #00ff41",borderLeft:"2px solid #00ff41" },{ borderBottom:"2px solid #00ff41",borderRight:"2px solid #00ff41" }][i];
            return <div key={i} style={{ position:"absolute",width:14,height:14,...pos,...br,zIndex:2 }} />;
          })}

          <div className="font-orb" style={{ fontSize: ".6rem", letterSpacing: ".22em", color: "#00f5ff", marginBottom: 20, paddingBottom: 9, borderBottom: "1px solid rgba(0,255,65,.14)" }}>
            <span style={{ color: "#00ff41" }}>■ </span>
            {["IDENTITY VERIFICATION","CREDENTIAL SETUP","CLEARANCE LEVEL"][step-1]}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div>
              {[["user","OPERATOR ID","text","Choose a unique operator ID...","01"],["email","SECURE EMAIL","email","Enter secure email address...","02"]].map(([f, label, type, ph, num]) => (
                <div key={f} style={{ marginBottom: 16 }}>
                  <label className="font-mono" style={{ fontSize: ".6rem", color: "rgba(0,255,65,.6)", letterSpacing: ".14em", display: "block", marginBottom: 5 }}>
                    <span style={{ color: "#00f5ff" }}>[{num}]</span> {label}
                  </label>
                  <input className="input-cyber font-mono" type={type} placeholder={ph} value={form[f]} onChange={e => setForm(x => ({ ...x, [f]: e.target.value }))}
                    style={{ width: "100%", padding: "10px 14px", fontSize: ".73rem", borderRadius: 2 }} />
                  {errors[f] && <div style={{ fontSize: ".58rem", color: "#ff003c", marginTop: 4 }}>⚠ {errors[f]}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <div style={{ marginBottom: 16 }}>
                <label className="font-mono" style={{ fontSize: ".6rem", color: "rgba(0,255,65,.6)", letterSpacing: ".14em", display: "block", marginBottom: 5 }}>
                  <span style={{ color: "#00f5ff" }}>[03]</span> ACCESS CODE
                </label>
                <input className="input-cyber font-mono" type="password" placeholder="Create access code..."
                  value={form.pass} onChange={e => { setForm(x => ({ ...x, pass: e.target.value })); setStrength(calcStrength(e.target.value)); }}
                  style={{ width: "100%", padding: "10px 14px", fontSize: ".73rem", borderRadius: 2 }} />
                {form.pass && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: "flex", gap: 3, marginBottom: 4 }}>
                      {[1,2,3,4,5].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: 1, background: i <= strength ? strengthColors[strength] : "rgba(0,255,65,.1)", boxShadow: i <= strength ? `0 0 4px ${strengthColors[strength]}` : "none", transition: "all .3s" }} />)}
                    </div>
                    <div style={{ fontSize: ".58rem", color: strengthColors[strength], letterSpacing: ".1em" }}>STRENGTH: {strengthLabels[strength]}</div>
                  </div>
                )}
                {errors.pass && <div style={{ fontSize: ".58rem", color: "#ff003c", marginTop: 4 }}>⚠ {errors.pass}</div>}
              </div>
              <div style={{ marginBottom: 4 }}>
                <label className="font-mono" style={{ fontSize: ".6rem", color: "rgba(0,255,65,.6)", letterSpacing: ".14em", display: "block", marginBottom: 5 }}>
                  <span style={{ color: "#00f5ff" }}>[04]</span> CONFIRM CODE
                </label>
                <input className="input-cyber font-mono" type="password" placeholder="Confirm access code..."
                  value={form.confirm} onChange={e => setForm(x => ({ ...x, confirm: e.target.value }))}
                  style={{ width: "100%", padding: "10px 14px", fontSize: ".73rem", borderRadius: 2 }} />
                {errors.confirm && <div style={{ fontSize: ".58rem", color: "#ff003c", marginTop: 4 }}>⚠ {errors.confirm}</div>}
              </div>
              <div style={{ fontSize: ".58rem", color: "rgba(0,255,65,.35)", marginTop: 10, lineHeight: 1.7 }}>
                &#9642; Min 8 characters &nbsp;&#9642; Uppercase + number &nbsp;&#9642; Special character recommended
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <div style={{ marginBottom: 18 }}>
                <div className="font-mono" style={{ fontSize: ".6rem", color: "rgba(0,255,65,.6)", letterSpacing: ".14em", marginBottom: 10 }}>
                  <span style={{ color: "#00f5ff" }}>[05]</span> CLEARANCE ROLE
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {ROLES.map(([val, label, desc]) => (
                    <button key={val} onClick={() => setForm(f => ({ ...f, role: val }))}
                      style={{ padding: "10px 8px", border: `1px solid ${form.role === val ? "#00ff41" : "rgba(0,255,65,.2)"}`, background: form.role === val ? "rgba(0,255,65,.1)" : "rgba(0,255,65,.03)", textAlign: "left", borderRadius: 2, boxShadow: form.role === val ? "0 0 10px rgba(0,255,65,.2)" : "none", transition: "all .3s" }}>
                      <div className="font-orb" style={{ fontSize: ".6rem", color: form.role === val ? "#00ff41" : "rgba(0,255,65,.5)", letterSpacing: ".12em", marginBottom: 3 }}>{label}</div>
                      <div className="font-mono" style={{ fontSize: ".52rem", color: "rgba(0,255,65,.35)" }}>{desc}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="font-mono" style={{ fontSize: ".6rem", color: "rgba(0,255,65,.6)", letterSpacing: ".14em", display: "block", marginBottom: 5 }}>
                  <span style={{ color: "#00f5ff" }}>[06]</span> AUTHORIZATION CODE
                </label>
                <input className="input-cyber font-mono" type="text" placeholder="Enter org authorization code..."
                  value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))}
                  style={{ width: "100%", padding: "10px 14px", fontSize: ".73rem", borderRadius: 2 }} />
                <div style={{ fontSize: ".56rem", color: "rgba(0,255,65,.3)", marginTop: 4 }}>Contact your security admin for the org code</div>
              </div>
              <div style={{ padding: "10px 12px", background: "rgba(0,255,65,.04)", border: "1px solid rgba(0,255,65,.15)", fontSize: ".6rem", color: "rgba(0,255,65,.5)", lineHeight: 1.8 }}>
                <div className="font-orb" style={{ color: "#00f5ff", fontSize: ".58rem", letterSpacing: ".15em", marginBottom: 6 }}>■ ACCESS SUMMARY</div>
                <div>OPERATOR: <span style={{ color: "#00ff41" }}>{form.user || "—"}</span></div>
                <div>EMAIL: <span style={{ color: "#00ff41" }}>{form.email || "—"}</span></div>
                <div>ROLE: <span style={{ color: "#00f5ff" }}>{form.role.toUpperCase()}</span></div>
              </div>
            </div>
          )}

          {loading && (
            <div style={{ marginTop: 14, marginBottom: 2 }}>
              <div style={{ height: 4, background: "rgba(0,255,65,.1)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "100%", background: "linear-gradient(90deg,#00ff41,#00f5ff,#00ff41)", backgroundSize: "200%", animation: "shimmer 1s linear infinite" }} />
              </div>
              <div className="font-mono" style={{ fontSize: ".58rem", color: "#00f5ff", marginTop: 6, textAlign: "center" }}>REGISTERING OPERATOR...</div>
            </div>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            {step > 1 && (
              <button className="btn-cyber font-mono" onClick={() => setStep(s => s - 1)}
                style={{ padding: "10px 16px", fontSize: ".62rem", letterSpacing: ".15em", borderRadius: 2, flex: "0 0 auto" }}>
                ◀ BACK
              </button>
            )}
            <button className="btn-cyber font-orb" onClick={nextStep} disabled={loading}
              style={{ flex: 1, padding: "11px", fontSize: ".65rem", letterSpacing: ".22em", borderRadius: 2 }}>
              {step === 3 ? (loading ? "REGISTERING..." : "▶ SUBMIT REQUEST") : `CONTINUE ▶`}
            </button>
          </div>

          <div style={{ marginTop: 14, textAlign: "center" }}>
            <button onClick={() => setPage("login")} style={{ background: "none", border: "none", color: "rgba(0,255,65,.4)", fontSize: ".6rem", fontFamily: "'Share Tech Mono',monospace", letterSpacing: ".1em" }}
              onMouseEnter={e => e.target.style.color="#00ff41"} onMouseLeave={e => e.target.style.color="rgba(0,255,65,.4)"}>
              ← RETURN TO LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   FILE ANALYSIS PAGE
═══════════════════════════════════════════════ */
function AnalysisPage() {
  const [csvFile, setCsvFile] = useState(null);
  const [pcapFile, setPcapFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const [results, setResults] = useState(null);
  const [logs, setLogs] = useState([]);
  const [dragOver, setDragOver] = useState({ csv: false, pcap: false });
  const csvRef = useRef(null);
  const pcapRef = useRef(null);

  const addLog = (msg, type = "info") => setLogs(l => [...l, { msg, type, id: Date.now() + Math.random() }]);

  const handleDrop = (e, type) => {
    e.preventDefault();
    setDragOver(d => ({ ...d, [type]: false }));
    const file = e.dataTransfer.files[0];
    if (!file) return;
    if (type === "csv") setCsvFile(file);
    else setPcapFile(file);
  };

  const analyze = () => {
    if (!csvFile && !pcapFile) return;
    setAnalyzing(true); setProgress(0); setResults(null); setLogs([]);
    const steps = [
      [200, 5, "Initializing analysis engine...", "info"],
      [600, 15, "Parsing file headers...", "info"],
      [1000, 28, "Loading threat signatures v2025.03...", "info"],
      [1400, 42, "Running deep packet inspection...", "warn"],
      [1900, 58, "Cross-referencing CVE database...", "info"],
      [2400, 72, "Correlating IoCs with threat intel...", "warn"],
      [2900, 85, "Running ML anomaly detection...", "info"],
      [3400, 95, "Generating threat report...", "ok"],
      [3800, 100, "Analysis complete.", "ok"],
    ];
    steps.forEach(([delay, p, msg, type]) => setTimeout(() => { setProgress(p); setStage(msg); addLog(msg, type); }, delay));
    setTimeout(() => {
      setAnalyzing(false);
      setResults({
        risk: ri(60, 95),
        threats: ri(3, 18),
        anomalies: ri(12, 48),
        packets: csvFile ? null : ri(10000, 250000),
        records: csvFile ? ri(500, 50000) : null,
        ips: Array.from({ length: ri(3,7) }, () => ({ ip: rip(), hits: ri(100,5000), flag: ["RU","CN","KP","IR","BR"][ri(0,5)] })),
        events: Array.from({ length: ri(5,10) }, (_, i) => ({
          id: i, time: ts(), type: ["SQL Injection","Port Scan","XSS","Brute Force","Data Exfil","C2 Beacon","DDoS Flood"][ri(0,7)],
          sev: ["CRITICAL","HIGH","MEDIUM","LOW"][ri(0,4)], src: rip(), dst: rip()
        })),
        proto: { TCP: ri(40,70), UDP: ri(15,35), ICMP: ri(2,10), Other: ri(1,5) },
        timeline: Array.from({ length: 24 }, () => ri(0, 100)),
      });
    }, 4000);
  };

  const reset = () => { setCsvFile(null); setPcapFile(null); setResults(null); setLogs([]); setProgress(0); };

  const sevColors = { CRITICAL: "#ff003c", HIGH: "#ff8c00", MEDIUM: "#ffe600", LOW: "#00ff41" };
  const sevBg = { CRITICAL: "rgba(255,0,60,.15)", HIGH: "rgba(255,140,0,.12)", MEDIUM: "rgba(255,230,0,.1)", LOW: "rgba(0,255,65,.08)" };

  return (
    <div style={{ padding: "16px 16px 24px", position: "relative", zIndex: 10, maxWidth: 1200, margin: "0 auto" }}>
      {/* Page title */}
      <div className="fade-up" style={{ marginBottom: 20 }}>
        <div className="font-orb" style={{ fontSize: "1.1rem", fontWeight: 700, color: "#00ff41", textShadow: "0 0 12px #00ff41", letterSpacing: ".2em" }}>
          ■ FILE ANALYSIS ENGINE
        </div>
        <div className="font-mono" style={{ fontSize: ".62rem", color: "rgba(0,255,65,.45)", marginTop: 4, letterSpacing: ".1em" }}>
          Upload .CSV or .PCAP files for deep threat analysis and anomaly detection
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        {/* CSV Drop */}
        {[
          { key: "csv", ref: csvRef, file: csvFile, setFile: setCsvFile, accept: ".csv", icon: "📊", label: "CSV FILE", sub: "Network logs, threat data, event exports", ext: ".CSV", color: "#00f5ff" },
          { key: "pcap", ref: pcapRef, file: pcapFile, setFile: setPcapFile, accept: ".pcap,.pcapng", icon: "📡", label: "PCAP FILE", sub: "Packet captures, network traffic dumps", ext: ".PCAP / .PCAPNG", color: "#00ff41" },
        ].map(({ key, ref, file, setFile, accept, icon, label, sub, ext, color }) => (
          <div key={key} className={`panel-box fade-up-${key === "csv" ? 1 : 2}`} style={{ padding: 16, borderRadius: 2 }}>
            <div className="font-orb" style={{ fontSize: ".58rem", letterSpacing: ".22em", color: "#00f5ff", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid rgba(0,255,65,.14)" }}>
              <span style={{ color: "#00ff41" }}>■ </span>{label}
            </div>
            {file ? (
              <div style={{ padding: "18px 14px", border: "1px solid rgba(0,255,65,.35)", background: "rgba(0,255,65,.05)", borderRadius: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: "1.5rem" }}>{icon}</span>
                  <div>
                    <div className="font-mono" style={{ fontSize: ".7rem", color: "#00ff41" }}>{file.name}</div>
                    <div className="font-mono" style={{ fontSize: ".58rem", color: "rgba(0,255,65,.45)" }}>{(file.size / 1024).toFixed(1)} KB · {ext}</div>
                  </div>
                  <button onClick={() => setFile(null)} style={{ marginLeft: "auto", background: "none", border: "none", color: "rgba(255,0,60,.6)", fontSize: "1rem" }}>✕</button>
                </div>
                <div style={{ height: 3, background: "rgba(0,255,65,.1)", borderRadius: 1, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: "100%", background: color, boxShadow: `0 0 5px ${color}` }} />
                </div>
              </div>
            ) : (
              <div className={`drop-zone ${dragOver[key] ? "drag-over" : ""}`}
                style={{ padding: "28px 16px", borderRadius: 2, textAlign: "center" }}
                onDrop={e => handleDrop(e, key)} onDragOver={e => { e.preventDefault(); setDragOver(d => ({ ...d, [key]: true })); }}
                onDragLeave={() => setDragOver(d => ({ ...d, [key]: false }))}
                onClick={() => ref.current?.click()}>
                <input ref={ref} type="file" accept={accept} style={{ display: "none" }} onChange={e => { if (e.target.files[0]) setFile(e.target.files[0]); }} />
                <div style={{ fontSize: "2rem", marginBottom: 8 }} className={dragOver[key] ? "float-anim" : ""}>{icon}</div>
                <div className="font-orb" style={{ fontSize: ".65rem", letterSpacing: ".18em", color: dragOver[key] ? color : "rgba(0,255,65,.6)", marginBottom: 6 }}>
                  {dragOver[key] ? "DROP TO UPLOAD" : "DROP FILE HERE"}
                </div>
                <div className="font-mono" style={{ fontSize: ".58rem", color: "rgba(0,255,65,.35)", marginBottom: 10 }}>{sub}</div>
                <div style={{ fontSize: ".55rem", padding: "3px 10px", border: `1px solid rgba(0,255,65,.2)`, color: "rgba(0,255,65,.45)", display: "inline-block", letterSpacing: ".1em" }}>
                  OR CLICK TO BROWSE — {ext}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Analyze button */}
      <div className="fade-up-3" style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button className="btn-cyber font-orb" onClick={analyze} disabled={analyzing || (!csvFile && !pcapFile)}
            style={{ padding: "13px 32px", fontSize: ".7rem", letterSpacing: ".25em", borderRadius: 2, opacity: (!csvFile && !pcapFile) ? .4 : 1 }}>
            {analyzing ? "▶ ANALYZING..." : "▶ LAUNCH ANALYSIS"}
          </button>
          {(csvFile || pcapFile || results) && !analyzing && (
            <button className="font-mono" onClick={reset}
              style={{ padding: "12px 20px", fontSize: ".62rem", letterSpacing: ".15em", border: "1px solid rgba(255,0,60,.3)", background: "rgba(255,0,60,.05)", color: "#ff003c", borderRadius: 2 }}>
              ✕ RESET
            </button>
          )}
          {(csvFile || pcapFile) && !analyzing && !results && (
            <div className="font-mono" style={{ fontSize: ".62rem", color: "rgba(0,255,65,.5)" }}>
              {[csvFile && `CSV: ${csvFile.name}`, pcapFile && `PCAP: ${pcapFile.name}`].filter(Boolean).join("  +  ")} ready for analysis
            </div>
          )}
        </div>
      </div>

      {/* Progress + logs */}
      {(analyzing || logs.length > 0) && (
        <div className="panel-box fade-up" style={{ padding: 16, marginBottom: 14, borderRadius: 2 }}>
          <div className="font-orb" style={{ fontSize: ".58rem", letterSpacing: ".22em", color: "#00f5ff", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid rgba(0,255,65,.14)" }}>
            <span style={{ color: "#00ff41" }}>■ </span>ANALYSIS ENGINE LOG
          </div>
          {analyzing && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".6rem", marginBottom: 5 }}>
                <span className="font-mono" style={{ color: "#00f5ff" }}>{stage}</span>
                <span className="font-orb" style={{ color: "#00ff41" }}>{progress}%</span>
              </div>
              <div style={{ height: 8, background: "rgba(0,255,65,.08)", border: "1px solid rgba(0,255,65,.2)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: progress + "%", background: "linear-gradient(90deg,#00ff41,#00f5ff)", boxShadow: "0 0 8px #00ff41", transition: "width .4s ease", position: "relative", overflow: "hidden" }}>
                  <div className="shimmer-bar" style={{ position: "absolute", inset: 0 }} />
                </div>
              </div>
            </div>
          )}
          <div style={{ maxHeight: 120, overflowY: "auto" }}>
            {logs.map(l => (
              <div key={l.id} className="font-mono tag-animate" style={{ fontSize: ".62rem", color: l.type === "ok" ? "#00f5ff" : l.type === "warn" ? "#ffe600" : "rgba(0,255,65,.65)", marginBottom: 2, display: "flex", gap: 8 }}>
                <span style={{ color: "#00f5ff", flexShrink: 0 }}>[{ts()}]</span>{l.msg}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RESULTS */}
      {results && (
        <div>
          {/* Summary cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 14 }}>
            {[
              { label: "RISK SCORE", val: results.risk, suffix: "/100", color: results.risk > 80 ? "#ff003c" : results.risk > 60 ? "#ffe600" : "#00ff41" },
              { label: "THREATS FOUND", val: results.threats, color: "#ff003c" },
              { label: "ANOMALIES", val: results.anomalies, color: "#ffe600" },
              { label: results.packets ? "PACKETS" : "RECORDS", val: (results.packets || results.records || 0).toLocaleString(), color: "#00f5ff" },
            ].map(({ label, val, suffix="", color }) => (
              <div key={label} className="panel-box fade-up" style={{ padding: "14px 12px", textAlign: "center", borderRadius: 2 }}>
                <div className="font-orb" style={{ fontSize: "1.6rem", fontWeight: 700, color, textShadow: `0 0 12px ${color}`, lineHeight: 1 }}>{val}{suffix}</div>
                <div className="font-orb" style={{ fontSize: ".52rem", color: "rgba(0,255,65,.4)", marginTop: 5, letterSpacing: ".14em" }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            {/* Protocol breakdown */}
            <div className="panel-box fade-up-1" style={{ padding: 16, borderRadius: 2 }}>
              <div className="font-orb" style={{ fontSize: ".58rem", letterSpacing: ".2em", color: "#00f5ff", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid rgba(0,255,65,.14)" }}>
                <span style={{ color: "#00ff41" }}>■ </span>PROTOCOL DISTRIBUTION
              </div>
              {Object.entries(results.proto).map(([proto, pct]) => {
                const cols = { TCP: "#00f5ff", UDP: "#00ff41", ICMP: "#ffe600", Other: "#ff8c00" };
                return (
                  <div key={proto} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".65rem", marginBottom: 4 }}>
                      <span className="font-mono" style={{ color: "rgba(0,255,65,.7)" }}>{proto}</span>
                      <span className="font-orb" style={{ color: cols[proto] }}>{pct}%</span>
                    </div>
                    <div style={{ height: 6, background: "rgba(0,255,65,.07)", border: "1px solid rgba(0,255,65,.14)", borderRadius: 1, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: pct + "%", background: cols[proto], boxShadow: `0 0 5px ${cols[proto]}`, position: "relative", overflow: "hidden" }}>
                        <div className="shimmer-bar" style={{ position: "absolute", inset: 0 }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Top IPs */}
            <div className="panel-box fade-up-2" style={{ padding: 16, borderRadius: 2 }}>
              <div className="font-orb" style={{ fontSize: ".58rem", letterSpacing: ".2em", color: "#00f5ff", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid rgba(0,255,65,.14)" }}>
                <span style={{ color: "#00ff41" }}>■ </span>SUSPICIOUS SOURCE IPs
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }} className="font-mono">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(0,255,65,.14)" }}>
                    {["IP ADDRESS","CC","HITS"].map(h => <th key={h} style={{ fontSize: ".55rem", color: "rgba(0,255,65,.4)", letterSpacing: ".12em", padding: "3px 4px", textAlign: "left", fontWeight: "normal" }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {results.ips.map((r, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(0,255,65,.06)" }}>
                      <td style={{ fontSize: ".63rem", color: "rgba(0,255,65,.75)", padding: "5px 4px" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff003c", display: "inline-block", marginRight: 6 }} />
                        {r.ip}
                      </td>
                      <td style={{ fontSize: ".6rem", color: "rgba(0,255,65,.4)", padding: "5px 4px" }}>[{r.flag}]</td>
                      <td style={{ fontSize: ".63rem", color: "#ff8c00", padding: "5px 4px", textAlign: "right" }}>{r.hits.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Event table */}
          <div className="panel-box fade-up-3" style={{ padding: 16, borderRadius: 2, marginBottom: 14 }}>
            <div className="font-orb" style={{ fontSize: ".58rem", letterSpacing: ".2em", color: "#00f5ff", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid rgba(0,255,65,.14)" }}>
              <span style={{ color: "#00ff41" }}>■ </span>DETECTED THREAT EVENTS
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }} className="font-mono">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(0,255,65,.14)" }}>
                  {["TIME","THREAT TYPE","SEVERITY","SOURCE IP","DESTINATION"].map(h => (
                    <th key={h} style={{ fontSize: ".55rem", color: "rgba(0,255,65,.4)", letterSpacing: ".1em", padding: "4px 8px", textAlign: "left", fontWeight: "normal" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.events.map(e => (
                  <tr key={e.id} style={{ borderBottom: "1px solid rgba(0,255,65,.05)" }}
                    onMouseEnter={el => el.currentTarget.style.background = "rgba(0,255,65,.04)"}
                    onMouseLeave={el => el.currentTarget.style.background = "transparent"}>
                    <td style={{ fontSize: ".62rem", color: "rgba(0,255,65,.5)", padding: "6px 8px" }}>{e.time}</td>
                    <td style={{ fontSize: ".65rem", color: "rgba(0,255,65,.85)", padding: "6px 8px" }}>{e.type}</td>
                    <td style={{ padding: "6px 8px" }}>
                      <span style={{ fontSize: ".55rem", padding: "2px 8px", background: sevBg[e.sev], border: `1px solid ${sevColors[e.sev]}`, color: sevColors[e.sev], letterSpacing: ".1em" }}>{e.sev}</span>
                    </td>
                    <td style={{ fontSize: ".62rem", color: "#ff8c00", padding: "6px 8px" }}>{e.src}</td>
                    <td style={{ fontSize: ".62rem", color: "rgba(0,255,65,.5)", padding: "6px 8px" }}>{e.dst}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Traffic timeline */}
          <div className="panel-box fade-up-4" style={{ padding: 16, borderRadius: 2 }}>
            <div className="font-orb" style={{ fontSize: ".58rem", letterSpacing: ".2em", color: "#00f5ff", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid rgba(0,255,65,.14)" }}>
              <span style={{ color: "#00ff41" }}>■ </span>24-HOUR TRAFFIC TIMELINE
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 80 }}>
              {results.timeline.map((v, i) => {
                const c = v > 75 ? "#ff003c" : v > 50 ? "#ffe600" : "#00ff41";
                return (
                  <div key={i} title={`${i}:00 — ${v}`} style={{ flex: 1, background: c, opacity: .8, boxShadow: `0 0 4px ${c}`, height: (v / 100) * 76 + 2, borderRadius: "1px 1px 0 0", minHeight: 2, transition: "all .3s", position: "relative", overflow: "hidden" }}>
                    <div className="shimmer-bar" style={{ position: "absolute", inset: 0 }} />
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".5rem", color: "rgba(0,255,65,.3)", marginTop: 4 }}>
              {["00:00","06:00","12:00","18:00","23:00"].map(t => <span key={t}>{t}</span>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   MINI DASHBOARD (reused panels)
═══════════════════════════════════════════════ */
function Panel({ title, children }) {
  return (
    <div className="panel-box" style={{ padding: 13, borderRadius: 2 }}>
      <div className="font-orb" style={{ fontSize: ".56rem", letterSpacing: ".2em", color: "#00f5ff", marginBottom: 11, paddingBottom: 7, borderBottom: "1px solid rgba(0,255,65,.15)" }}>
        <span style={{ color: "#00ff41" }}>■ </span>{title}
      </div>
      {children}
    </div>
  );
}

function StatBox({ value, label, color = "#00ff41" }) {
  return (
    <div style={{ textAlign: "center", padding: "10px 8px", background: "rgba(0,255,65,.03)", border: "1px solid rgba(0,255,65,.14)" }}>
      <div className="font-orb" style={{ fontSize: "1.5rem", fontWeight: 700, color, textShadow: `0 0 10px ${color}`, lineHeight: 1 }}>{value}</div>
      <div className="font-orb" style={{ fontSize: ".52rem", color: "rgba(0,255,65,.4)", marginTop: 4, letterSpacing: ".12em" }}>{label}</div>
    </div>
  );
}

function ProgBar({ label, value, color }) {
  return (
    <div style={{ marginBottom: 9 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".65rem", marginBottom: 3 }}>
        <span className="font-mono" style={{ color: "rgba(0,255,65,.65)" }}>{label}</span>
        <span className="font-mono" style={{ color: "#00f5ff" }}>{value}%</span>
      </div>
      <div style={{ height: 5, background: "rgba(0,255,65,.07)", border: "1px solid rgba(0,255,65,.15)", borderRadius: 1, overflow: "hidden" }}>
        <div style={{ height: "100%", width: value + "%", background: color, boxShadow: `0 0 5px ${color}`, position: "relative", overflow: "hidden", transition: "width .7s ease" }}>
          <div className="shimmer-bar" style={{ position: "absolute", inset: 0 }} />
        </div>
      </div>
    </div>
  );
}

const ATTACK_COORDS = [[185,95],[678,100],[718,148],[558,158],[308,178],[108,163],[408,125],[538,245],[198,258],[648,78],[478,185],[338,145],[252,285],[608,125],[152,125],[738,195],[348,295],[438,255],[128,225],[588,235]];
const LANDS = ["M25,72 Q80,52 135,67 Q175,49 225,62 Q245,92 235,122 Q215,152 195,149 Q155,162 125,147 Q70,142 38,122 Z","M245,62 Q285,45 365,55 Q425,45 485,59 Q515,85 505,125 Q492,155 460,162 Q420,167 380,159 Q340,163 300,149 Q268,135 252,105 Z","M525,55 Q582,40 652,49 Q705,45 745,65 Q762,89 752,125 Q742,149 712,159 Q682,165 652,155 Q612,159 582,145 Q548,129 532,100 Z","M48,167 Q92,159 132,169 Q152,189 142,225 Q122,245 92,240 Q62,229 47,205 Z","M262,169 Q312,159 372,169 Q412,179 432,209 Q422,255 392,275 Q362,289 332,279 Q296,269 272,245 Q252,215 257,190 Z","M532,169 Q572,159 612,169 Q642,185 646,215 Q636,249 606,259 Q576,262 552,245 Q528,225 527,195 Z"];

function WorldMapSmall() {
  const [ox, oy] = [400, 182];
  return (
    <svg viewBox="0 0 800 365" style={{ width: "100%", height: 175 }}>
      <rect width="800" height="365" fill="rgba(0,14,4,0.7)" rx="2" />
      {Array.from({length:11},(_,i)=><line key={`v${i}`} x1={i*80} y1="0" x2={i*80} y2="365" stroke="rgba(0,255,65,0.04)" strokeWidth=".5"/>)}
      {Array.from({length:10},(_,i)=><line key={`h${i}`} x1="0" y1={i*37} x2="800" y2={i*37} stroke="rgba(0,255,65,0.04)" strokeWidth=".5"/>)}
      {LANDS.map((d,i)=><path key={i} d={d} fill="rgba(0,65,18,0.55)" stroke="rgba(0,255,65,0.28)" strokeWidth=".8"/>)}
      {ATTACK_COORDS.map(([x,y],i)=>{const c=i%3===0?"255,0,60":"0,245,255";const dur=(.7+(i%4)*.3).toFixed(1);return(<g key={i}><line x1={ox} y1={oy} x2={x} y2={y} stroke={`rgba(${c},.18)`} strokeWidth=".8" strokeDasharray="4,3"/><circle cx={x} cy={y} r="3" fill={`rgba(${c},.9)`}/><circle cx={x} cy={y} r="3" fill="none" stroke={`rgba(${c},.7)`} strokeWidth="1.2"><animate attributeName="r" from="3" to="15" dur={`${dur}s`} repeatCount="indefinite"/><animate attributeName="opacity" from=".8" to="0" dur={`${dur}s`} repeatCount="indefinite"/></circle></g>);})}
      <circle cx={ox} cy={oy} r="8" fill="none" stroke="rgba(0,255,65,.9)" strokeWidth="1.5"><animate attributeName="r" from="8" to="22" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" from=".9" to="0" dur="2s" repeatCount="indefinite"/></circle>
      <circle cx={ox} cy={oy} r="5" fill="rgba(0,255,65,.95)"/>
      <text x={ox+9} y={oy-4} fill="rgba(0,255,65,.9)" fontSize="9" fontFamily="Share Tech Mono">HQ</text>
    </svg>
  );
}

function TrafficChart({ d1, d2 }) {
  const ref = useRef(null);
  const draw = useCallback(() => {
    const c = ref.current; if (!c) return;
    const W = c.offsetWidth, H = 110; if (W <= 0) return;
    c.width = W; c.height = H;
    const ctx = c.getContext("2d");
    ctx.clearRect(0,0,W,H);
    for(let i=0;i<5;i++){const y=H/5*i;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.strokeStyle="rgba(0,255,65,.06)";ctx.lineWidth=.5;ctx.stroke();}
    const dL=(data,col,fill)=>{const pts=data.map((v,i)=>[i/(data.length-1)*W,H-(v/100)*H]);ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.strokeStyle=col;ctx.lineWidth=1.8;ctx.stroke();if(fill){ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fillStyle=fill;ctx.fill();}};
    dL(d1,"rgba(0,245,255,.9)","rgba(0,245,255,.06)");
    dL(d2,"rgba(0,255,65,.9)","rgba(0,255,65,.06)");
    ctx.font="9px Share Tech Mono";ctx.fillStyle="rgba(0,245,255,.8)";ctx.fillText("▬ INBOUND",8,12);ctx.fillStyle="rgba(0,255,65,.8)";ctx.fillText("▬ OUTBOUND",88,12);
  }, [d1, d2]);
  useEffect(()=>{draw();},[draw]);
  useEffect(()=>{window.addEventListener("resize",draw);return()=>window.removeEventListener("resize",draw);},[draw]);
  return <canvas ref={ref} style={{ width:"100%", height:110, display:"block" }} />;
}

function GaugeCanvas({ value }) {
  const ref = useRef(null);
  useEffect(()=>{
    const c=ref.current;if(!c)return;const ctx=c.getContext("2d");
    const W=190,H=105,cx=W/2,cy=H-10,r=72;
    ctx.clearRect(0,0,W,H);
    ctx.beginPath();ctx.arc(cx,cy,r,Math.PI,0,false);ctx.strokeStyle="rgba(0,255,65,.1)";ctx.lineWidth=13;ctx.stroke();
    const p=value/100,g=ctx.createLinearGradient(cx-r,0,cx+r,0);g.addColorStop(0,"#00ff41");g.addColorStop(.5,"#ffe600");g.addColorStop(1,"#ff003c");
    ctx.beginPath();ctx.arc(cx,cy,r,Math.PI,Math.PI+Math.PI*p,false);ctx.strokeStyle=g;ctx.lineWidth=13;ctx.lineCap="round";ctx.stroke();
    const na=Math.PI+Math.PI*p;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+60*Math.cos(na),cy+60*Math.sin(na));ctx.strokeStyle="rgba(255,255,255,.9)";ctx.lineWidth=2;ctx.stroke();
    ctx.beginPath();ctx.arc(cx,cy,6,0,2*Math.PI);ctx.fillStyle="#00ff41";ctx.fill();
    for(let i=0;i<=10;i++){const a=Math.PI+Math.PI*(i/10);ctx.beginPath();ctx.moveTo(cx+(r-17)*Math.cos(a),cy+(r-17)*Math.sin(a));ctx.lineTo(cx+(r-8)*Math.cos(a),cy+(r-8)*Math.sin(a));ctx.strokeStyle="rgba(0,255,65,.35)";ctx.lineWidth=1;ctx.stroke();}
  },[value]);
  return <canvas ref={ref} width="190" height="105"/>;
}

const BAR_DATA=[{l:"SQLi",v:84,c:"#ff003c"},{l:"XSS",v:61,c:"#ff8c00"},{l:"CSRF",v:45,c:"#ffe600"},{l:"RCE",v:38,c:"#cc00ff"},{l:"BF",v:72,c:"#00f5ff"},{l:"MITM",v:29,c:"#00ff41"},{l:"DDoS",v:55,c:"#ff003c"}];
const DONUT_DATA=[{l:"Malware",v:34,c:"#ff003c"},{l:"Intrusion",v:28,c:"#ff8c00"},{l:"DDoS",v:19,c:"#ffe600"},{l:"Phishing",v:12,c:"#00f5ff"},{l:"Other",v:7,c:"#00ff41"}];
const LOG_TMPL=[{cl:"#ff003c",m:()=>`[BLOCK] SQL injection from ${rip()}`},{cl:"#ff003c",m:()=>`[ALERT] Brute-force: ${rip()} (${ri(50,500)} attempts)`},{cl:"#ffe600",m:()=>`[WARN]  Port scan: ${rip()}`},{cl:"rgba(0,255,65,.65)",m:()=>`[INFO]  Rule #${ri(1000,9999)} triggered`},{cl:"#00f5ff",m:()=>`[OK]    Packets cleared: ${ri(100,999)}/s`}];
const HEX_ST=["safe","safe","safe","safe","warn","warn","danger","idle","idle"];

function DashboardPage() {
  const [stats,setStats]=useState({t:247,b:"98.4",a:12,n:64});
  const [res,setRes]=useState({cpu:73,mem:58,net:91,disk:44});
  const [gv,setGv]=useState(72);
  const [tIn,setTIn]=useState(()=>Array.from({length:60},()=>Math.random()*65+20));
  const [tOut,setTOut]=useState(()=>Array.from({length:60},()=>Math.random()*35+10));
  const [logs,setLogs]=useState([]);
  const [hexes,setHexes]=useState([]);
  const logRef=useRef(null);

  const genHex=()=>Array.from({length:45},(_,i)=>({id:i,st:HEX_ST[Math.floor(Math.random()*HEX_ST.length)]}));
  const hexColors={safe:["rgba(0,255,65,.15)","#00ff41"],warn:["rgba(255,230,0,.15)","#ffe600"],danger:["rgba(255,0,60,.2)","#ff003c"],idle:["rgba(0,245,255,.08)","#00f5ff"]};

  useEffect(()=>{
    setHexes(genHex());
    const ids=[
      setInterval(()=>{setTIn(d=>[...d.slice(1),Math.random()*70+20]);setTOut(d=>[...d.slice(1),Math.random()*38+10]);},650),
      setInterval(()=>{setStats({t:ri(200,310),b:(97+Math.random()*2).toFixed(1),a:ri(8,20),n:ri(60,68)});},2200),
      setInterval(()=>{setRes({cpu:ri(60,90),mem:ri(48,72),net:ri(72,98),disk:ri(28,62)});},1600),
      setInterval(()=>{setGv(v=>Math.max(20,Math.min(95,v+(Math.random()*10-5))));},1800),
      setInterval(()=>{setHexes(genHex());},4500),
    ];
    const addLog=()=>{const t=LOG_TMPL[Math.floor(Math.random()*LOG_TMPL.length)];setLogs(l=>[...l.slice(-80),{id:Date.now()+Math.random(),c:t.cl,txt:`${ts()}  ${t.m()}`}]);};
    addLog();const logId=setInterval(addLog,500+Math.random()*900);
    return()=>{ids.forEach(clearInterval);clearInterval(logId);};
  },[]);

  useEffect(()=>{if(logRef.current)logRef.current.scrollTop=logRef.current.scrollHeight;},[logs]);

  const tcol=v=>v>85?"#ff003c":v>70?"#ffe600":"#00ff41";
  const tot=DONUT_DATA.reduce((a,b)=>a+b.v,0);
  let da=-Math.PI/2;
  const slices=DONUT_DATA.map(d=>{const sw=(d.v/tot)*2*Math.PI,x1=50+36*Math.cos(da),y1=50+36*Math.sin(da),x2=50+36*Math.cos(da+sw),y2=50+36*Math.sin(da+sw),lg=sw>Math.PI?1:0,p=`M50,50 L${x1},${y1} A36,36 0 ${lg},1 ${x2},${y2} Z`;da+=sw;return{...d,p};});
  const mx=Math.max(...BAR_DATA.map(b=>b.v));

  return (
    <div style={{padding:"14px",position:"relative",zIndex:10}}>
      <div style={{display:"grid",gridTemplateColumns:"235px 1fr 255px",gap:11}}>

        {/* LEFT */}
        <div style={{display:"flex",flexDirection:"column",gap:11}}>
          <Panel title="System Vitals">
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
              <StatBox value={stats.t} label="THREATS/HR"/>
              <StatBox value={`${stats.b}%`} label="BLOCKED" color="#00f5ff"/>
              <StatBox value={stats.a} label="ALERTS" color="#ff003c"/>
              <StatBox value={stats.n} label="NODES UP"/>
            </div>
          </Panel>
          <Panel title="Active Threats">
            {[["SQL Injection","CRITICAL","#ff003c"],["Brute Force","HIGH","#ff8c00"],["Port Scan","HIGH","#ff8c00"],["XSS Attempt","MEDIUM","#ffe600"],["Phishing URL","MEDIUM","#ffe600"],["DNS Anomaly","LOW","#00ff41"]].map(([n,s,c])=>(
              <div key={n} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"1px solid rgba(0,255,65,.07)",fontSize:".68rem"}}>
                <span className="font-mono" style={{color:"rgba(0,255,65,.78)"}}>{n}</span>
                <span className="font-orb" style={{fontSize:".55rem",padding:"2px 7px",border:`1px solid ${c}`,background:`${c}22`,color:c,letterSpacing:".1em"}}>{s}</span>
              </div>
            ))}
          </Panel>
          <Panel title="Resource Usage">
            <ProgBar label="CPU" value={res.cpu} color={tcol(res.cpu)}/>
            <ProgBar label="MEMORY" value={res.mem} color="#00f5ff"/>
            <ProgBar label="NETWORK" value={res.net} color={res.net>88?"#ff003c":"#ffe600"}/>
            <ProgBar label="DISK I/O" value={res.disk} color="#00ff41"/>
          </Panel>
        </div>

        {/* CENTER */}
        <div style={{display:"flex",flexDirection:"column",gap:11}}>
          <Panel title="Global Threat Map — Live Attack Origins">
            <WorldMapSmall/>
          </Panel>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
            <Panel title="Network Traffic (Live)">
              <TrafficChart d1={tIn} d2={tOut}/>
            </Panel>
            <Panel title="Attack Vectors (24h)">
              <div style={{display:"flex",alignItems:"flex-end",gap:5,height:105}}>
                {BAR_DATA.map(b=>(
                  <div key={b.l} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                    <div className="font-mono" style={{fontSize:".55rem",color:"#00f5ff"}}>{b.v}</div>
                    <div style={{width:"100%",height:(b.v/mx)*88,background:b.c,boxShadow:`0 0 6px ${b.c}`,borderRadius:"1px 1px 0 0",minHeight:2,position:"relative",overflow:"hidden"}}>
                      <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(255,255,255,.18) 0%,transparent 50%)"}}/>
                    </div>
                    <div className="font-mono" style={{fontSize:".5rem",color:"rgba(0,255,65,.4)"}}>{b.l}</div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
            <Panel title="Incident Breakdown">
              <div style={{display:"flex",alignItems:"center",gap:14,marginTop:4}}>
                <svg viewBox="0 0 100 100" style={{width:112,height:112,flexShrink:0}}>
                  {slices.map(s=><path key={s.l} d={s.p} fill={s.c} opacity=".88" stroke="#000a00" strokeWidth="1.2"/>)}
                  <circle cx="50" cy="50" r="21" fill="#000a00"/>
                  <text x="50" y="46" textAnchor="middle" fill="#00ff41" fontSize="6.5" fontFamily="Orbitron">TOTAL</text>
                  <text x="50" y="57" textAnchor="middle" fill="#00f5ff" fontSize="10" fontFamily="Orbitron" fontWeight="700">{tot}</text>
                </svg>
                <div className="font-mono" style={{fontSize:".64rem"}}>
                  {DONUT_DATA.map(d=>(
                    <div key={d.l} style={{display:"flex",alignItems:"center",gap:7,marginBottom:7}}>
                      <div style={{width:8,height:8,borderRadius:"50%",background:d.c,flexShrink:0}}/>
                      <span style={{color:"rgba(0,255,65,.7)"}}>{d.l}</span>
                      <span style={{color:d.c}}>{d.v}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Panel>
            <Panel title="Live Event Log">
              <div ref={logRef} style={{height:118,overflowY:"auto",fontSize:".62rem",lineHeight:1.75}}>
                {logs.map(l=><div key={l.id} className="font-mono" style={{color:l.c,whiteSpace:"nowrap",overflow:"hidden"}}>{l.txt}</div>)}
              </div>
            </Panel>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{display:"flex",flexDirection:"column",gap:11}}>
          <Panel title="Threat Score">
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
              <GaugeCanvas value={Math.round(gv)}/>
              <div className="font-orb" style={{fontSize:"1.9rem",fontWeight:700,color:tcol(gv),textShadow:`0 0 14px ${tcol(gv)}`}}>{Math.round(gv)}</div>
              <div className="font-orb" style={{fontSize:".55rem",color:"rgba(0,255,65,.4)",letterSpacing:".15em"}}>RISK INDEX</div>
            </div>
          </Panel>
          <Panel title="Node Health Matrix">
            <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center",marginTop:2}}>
              {hexes.map(h=>(
                <div key={h.id} className={`font-mono ${h.st==="danger"?"hex-d":""}`}
                  style={{width:25,height:25,clipPath:"polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".44rem",background:hexColors[h.st][0],color:hexColors[h.st][1],transition:"all .3s"}}>
                  {String(h.id+1).padStart(2,"0")}
                </div>
              ))}
            </div>
            <div style={{display:"flex",justifyContent:"center",gap:10,marginTop:8,fontSize:".52rem"}}>
              {[["#00ff41","SAFE"],["#ffe600","WARN"],["#ff003c","CRIT"],["#00f5ff","IDLE"]].map(([c,l])=>(
                <span key={l} style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:7,height:7,borderRadius:"50%",background:c,display:"inline-block"}}/><span style={{color:"rgba(0,255,65,.45)"}}>{l}</span></span>
              ))}
            </div>
          </Panel>
          <Panel title="Top Attack Sources">
            <table style={{width:"100%",borderCollapse:"collapse"}} className="font-mono">
              <tbody>
                {[[rip(),"RU",2847,"#ff003c"],[rip(),"CN",1923,"#ff003c"],[rip(),"IR",1441,"#ff8c00"],[rip(),"KP",1209,"#ff8c00"],[rip(),"UA",887,"#ffe600"],[rip(),"BR",654,"#ffe600"]].map(([ip,co,h,c],i)=>(
                  <tr key={i} style={{borderBottom:"1px solid rgba(0,255,65,.06)"}}>
                    <td style={{fontSize:".6rem",color:"rgba(0,255,65,.72)",padding:"5px 3px"}}><span style={{width:6,height:6,borderRadius:"50%",background:c,display:"inline-block",marginRight:5}}/>{ip}</td>
                    <td style={{fontSize:".58rem",color:"rgba(0,255,65,.38)",padding:"5px 3px"}}>[{co}]</td>
                    <td style={{fontSize:".6rem",color:c,padding:"5px 3px",textAlign:"right"}}>{h.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </div>

      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   BOOT SCREEN
═══════════════════════════════════════════════ */
const BOOT_LINES=["Initializing kernel modules...","Loading threat intelligence DB v4.2.1","Connecting to 44 global threat feeds","Starting intrusion detection engine","Mounting encrypted vaults [AES-256-GCM]","Calibrating neural anomaly detector","Establishing secure VPN tunnels [OK]","Syncing firewall ruleset #1247 [58291 rules]","Loading geographic threat map [216 nations]","Initializing SIEM correlation engine","Connecting to NEXUS command relay","ALL SYSTEMS OPERATIONAL"];
function BootScreen({onDone}){
  const [lines,setLines]=useState([]);const [pct,setPct]=useState(0);const [done,setDone]=useState(false);const idx=useRef(0);
  useEffect(()=>{
    const next=()=>{
      if(idx.current>=BOOT_LINES.length){setTimeout(()=>{setDone(true);setTimeout(onDone,600);},300);return;}
      setLines(l=>[...l,BOOT_LINES[idx.current]]);setPct(Math.round(((idx.current+1)/BOOT_LINES.length)*100));idx.current++;setTimeout(next,90+Math.random()*180);
    };
    setTimeout(next,400);
  },[onDone]);
  return(
    <div style={{position:"fixed",inset:0,zIndex:9999,background:"#000",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:14,transition:"opacity .6s",opacity:done?0:1,pointerEvents:done?"none":"all"}} className="font-mono">
      <div className="font-orb glitch" style={{fontSize:"clamp(2rem,5vw,3.2rem)",fontWeight:900,color:"#00ff41",textShadow:"0 0 30px #00ff41,0 0 60px rgba(0,255,65,.3)",letterSpacing:".3em"}}>NEXUS<span style={{color:"#00f5ff"}}>//</span>SEC</div>
      <div className="font-orb" style={{fontSize:".62rem",letterSpacing:".28em",color:"rgba(0,255,65,.45)"}}>CYBER OPERATIONS CENTER v4.2.1</div>
      <div style={{width:"min(520px,90vw)",height:145,overflow:"hidden",fontSize:".68rem",color:"#00cc33"}}>
        {lines.map((l,i)=><div key={i} style={{padding:"2px 0"}}><span style={{color:"#00f5ff"}}>&gt; </span>{l}</div>)}
      </div>
      <div style={{width:"min(520px,90vw)",height:6,background:"rgba(0,255,65,.1)",border:"1px solid #00cc33",borderRadius:2,overflow:"hidden"}}>
        <div style={{height:"100%",width:pct+"%",background:"#00ff41",boxShadow:"0 0 10px #00ff41",transition:"width .05s linear"}}/>
      </div>
      <div style={{fontSize:".72rem",color:"#00f5ff"}}>{pct}%</div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════ */
export default function App() {
  const [booted, setBooted] = useState(false);
  const [page, setPage] = useState("login");
  const [authed, setAuthed] = useState(false);

  return (
    <>
      <GlobalStyles />
      <MatrixRain />
      <Scanlines />
      {!booted && <BootScreen onDone={() => setBooted(true)} />}
      {booted && (
        <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", display: "flex", flexDirection: "column", background: "rgba(0,6,0,.55)" }}>
          <Navbar page={page} setPage={setPage} authed={authed} setAuthed={setAuthed} />
          <main style={{ flex: 1 }}>
            {page === "login" && <LoginPage setPage={setPage} setAuthed={setAuthed} />}
            {page === "register" && <RegisterPage setPage={setPage} />}
            {page === "dashboard" && <DashboardPage />}
            {page === "analysis" && <AnalysisPage />}
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}