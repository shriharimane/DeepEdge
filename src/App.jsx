import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   FONT + GLOBAL HUD STYLES
───────────────────────────────────────────── */
const FontLink = () => {
  useEffect(() => {
    const existing = document.getElementById("nexus-fonts");
    if (!existing) {
      const l = document.createElement("link");
      l.id = "nexus-fonts";
      l.rel = "stylesheet";
      l.href =
        "https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap";
      document.head.appendChild(l);
    }

    const styleExists = document.getElementById("nexus-global-style");
    if (!styleExists) {
      const s = document.createElement("style");
      s.id = "nexus-global-style";
      s.textContent = `
        *{box-sizing:border-box;cursor:crosshair!important}
        html,body,#root{margin:0;padding:0;background:#000a00;overflow-x:hidden}
        body{
          background:
            radial-gradient(circle at top, rgba(0,255,65,.04), transparent 30%),
            linear-gradient(180deg, rgba(0,20,5,.95), rgba(0,5,0,1));
        }

        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#003311}

        @keyframes scanline {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }

        @keyframes pdot {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:.35; transform:scale(.7); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(220%); }
        }

        @keyframes hflash {
          0% { background: rgba(255,0,60,.12); }
          100% { background: rgba(255,0,60,.28); }
        }

        @keyframes glitch {
          0%,100% { clip-path:none; transform:none; }
          92% { clip-path:none; transform:none; }
          93% { clip-path:polygon(0 20%,100% 20%,100% 40%,0 40%); transform:translateX(-3px); }
          94% { clip-path:polygon(0 60%,100% 60%,100% 80%,0 80%); transform:translateX(3px); }
          95% { clip-path:none; transform:none; }
        }

        @keyframes border-glow {
          0%,100% { box-shadow:0 0 6px rgba(0,255,65,.2); }
          50% { box-shadow:0 0 18px rgba(0,255,65,.35), inset 0 0 14px rgba(0,255,65,.03); }
        }

        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(14px); }
          to { opacity:1; transform:none; }
        }

        .font-orbitron{font-family:'Orbitron',monospace}
        .font-mono-hack{font-family:'Share Tech Mono',monospace}
        .panel-border{animation:border-glow 4s ease infinite}
        .glitch{animation:glitch 6s linear infinite}
        .scanline::before{
          content:'';
          position:absolute;
          top:0;
          left:0;
          width:60%;
          height:2px;
          background:linear-gradient(90deg,transparent,rgba(0,255,65,.7),transparent);
          animation:scanline 3s linear infinite;
          pointer-events:none;
        }
        .shimmer::after{
          content:'';
          position:absolute;
          inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
          animation:shimmer 2s linear infinite;
          pointer-events:none;
        }
        .hex-danger{animation:hflash 1s ease infinite alternate}
        .animate-fade-up{animation:fadeSlideUp .45s ease both}
      `;
      document.head.appendChild(s);
    }
  }, []);

  return null;
};

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const ri = (a, b) => Math.floor(Math.random() * (b - a)) + a;
const rip = () => `${ri(1, 255)}.${ri(0, 255)}.${ri(0, 255)}.${ri(1, 254)}`;
const ts = () => new Date().toTimeString().slice(0, 8);

/* ─────────────────────────────────────────────
   BOOT SCREEN
───────────────────────────────────────────── */
const BOOT_LINES = [
  "Initializing kernel modules...",
  "Loading threat intelligence DB v4.2.1",
  "Connecting to 44 global threat feeds",
  "Starting intrusion detection engine",
  "Mounting encrypted vaults [AES-256-GCM]",
  "Calibrating neural anomaly detector",
  "Establishing secure VPN tunnels [OK]",
  "Syncing firewall ruleset #1247 [58291 rules]",
  "Loading geographic threat map [216 nations]",
  "Starting deep packet inspection engine",
  "Initializing SIEM correlation engine",
  "Connecting to NEXUS command relay",
  "Verifying 64 endpoint nodes — all nominal",
  "ALL SYSTEMS OPERATIONAL — LAUNCHING OPS CENTER",
];

function BootScreen({ onDone }) {
  const [lines, setLines] = useState([]);
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    const next = () => {
      if (idx.current >= BOOT_LINES.length) {
        setTimeout(() => {
          setDone(true);
          setTimeout(onDone, 600);
        }, 350);
        return;
      }
      setLines((l) => [...l, BOOT_LINES[idx.current]]);
      setPct(Math.round(((idx.current + 1) / BOOT_LINES.length) * 100));
      idx.current++;
      setTimeout(next, 90 + Math.random() * 120);
    };

    const t = setTimeout(next, 350);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 font-mono-hack"
      style={{
        background: "#000",
        transition: "opacity .6s",
        opacity: done ? 0 : 1,
        pointerEvents: done ? "none" : "all",
      }}
    >
      <div
        className="font-orbitron font-black tracking-widest glitch"
        style={{
          fontSize: "clamp(2rem,5vw,3.4rem)",
          color: "#00ff41",
          textShadow: "0 0 30px #00ff41,0 0 60px #00ff41",
        }}
      >
        NEXUS<span style={{ color: "#00f5ff" }}>//</span>SEC
      </div>

      <div
        className="text-xs tracking-[.25em]"
        style={{ color: "rgba(0,255,65,.5)" }}
      >
        CYBER OPERATIONS CENTER v4.2.1
      </div>

      <div
        className="w-[min(560px,90vw)] h-44 overflow-hidden text-xs"
        style={{ color: "#00cc33" }}
      >
        {lines.map((l, i) => (
          <div key={i} className="py-[2px]">
            <span style={{ color: "#00f5ff" }}>&gt; </span>
            {l}
          </div>
        ))}
      </div>

      <div
        className="w-[min(560px,90vw)] h-[7px] rounded-sm overflow-hidden border"
        style={{ background: "rgba(0,255,65,.08)", borderColor: "#00cc33" }}
      >
        <div
          className="h-full transition-all duration-75"
          style={{
            width: pct + "%",
            background: "#00ff41",
            boxShadow: "0 0 12px #00ff41",
          }}
        />
      </div>

      <div className="text-xs" style={{ color: "#00f5ff" }}>
        {pct}%
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MATRIX BACKGROUND
───────────────────────────────────────────── */
function MatrixCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    const chars =
      "アイウエオカキクケコサシスセソ0123456789ABCDEF<>[]{}|/\\";

    let drops = [];

    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      drops = Array(Math.floor(c.width / 13)).fill(1);
    };

    resize();
    window.addEventListener("resize", resize);

    const id = setInterval(() => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = "11px Share Tech Mono";

      drops.forEach((y, i) => {
        ctx.fillText(
          chars[Math.floor(Math.random() * chars.length)],
          i * 13,
          y * 13
        );
        if (y * 13 > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }, 55);

    return () => {
      clearInterval(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.06 }}
    />
  );
}

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
const NAV_ITEMS = [
  "Dashboard",
  "Threats",
  "Network",
  "Endpoints",
  "Reports",
  "Settings",
];

function Navbar() {
  const [time, setTime] = useState("");
  const [active, setActive] = useState("Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(
      () => setTime(new Date().toTimeString().slice(0, 8)),
      1000
    );
    setTime(new Date().toTimeString().slice(0, 8));
    return () => clearInterval(id);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 font-mono-hack"
      style={{
        background: "rgba(0,8,0,.96)",
        borderBottom: "1px solid rgba(0,255,65,.2)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div className="flex items-center justify-between px-5 py-3 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div
            className="font-orbitron font-black tracking-widest text-lg glitch"
            style={{ color: "#00ff41", textShadow: "0 0 14px #00ff41" }}
          >
            NEXUS<span style={{ color: "#00f5ff" }}>//</span>SEC
          </div>

          <div
            className="hidden sm:block text-[.55rem] tracking-widest px-2 py-[2px] border"
            style={{
              color: "rgba(0,255,65,.5)",
              borderColor: "rgba(0,255,65,.2)",
            }}
          >
            OPS CENTER
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[.65rem] tracking-wide">
          {[
            { dot: "#00ff41", label: "FIREWALL ACTIVE" },
            { dot: "#ff003c", label: "3 THREATS DETECTED", delay: ".5s" },
            { dot: "#00f5ff", label: "IDS ONLINE", delay: "1s" },
          ].map(({ dot, label, delay = "0s" }) => (
            <span key={label} className="flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{
                  background: dot,
                  boxShadow: `0 0 6px ${dot}`,
                  animation: `pdot 1.5s ${delay} infinite`,
                }}
              />
              {label}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div
            className="hidden sm:block text-xs px-3 py-1 border"
            style={{
              color: "#ff003c",
              borderColor: "#ff003c",
              letterSpacing: ".18em",
            }}
          >
            ⚠ THREAT : ELEVATED
          </div>

          <div
            className="font-orbitron text-sm"
            style={{ color: "#00f5ff", textShadow: "0 0 8px #00f5ff" }}
          >
            {time}
          </div>

          <button
            className="md:hidden text-xs px-2 py-1 border"
            style={{ color: "#00ff41", borderColor: "rgba(0,255,65,.3)" }}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row md:items-center gap-0 md:gap-1 px-5 pb-2 md:pb-0`}
        style={{ borderTop: "1px solid rgba(0,255,65,.1)" }}
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            onClick={() => {
              setActive(item);
              setMenuOpen(false);
            }}
            className="px-4 py-2 text-xs tracking-widest transition-all relative"
            style={{
              color: active === item ? "#00ff41" : "rgba(0,255,65,.45)",
              background:
                active === item ? "rgba(0,255,65,.08)" : "transparent",
              borderBottom:
                active === item ? "2px solid #00ff41" : "2px solid transparent",
              fontFamily: "'Share Tech Mono', monospace",
            }}
          >
            {active === item && (
              <span style={{ color: "#00f5ff", marginRight: 4 }}>■</span>
            )}
            {item}
          </button>
        ))}

        <div
          className="ml-auto hidden md:flex items-center gap-2 pb-2 text-[.62rem]"
          style={{ color: "rgba(0,255,65,.4)" }}
        >
          <span>
            SESSION: <span style={{ color: "#00f5ff" }}>ADM-0x4F2A</span>
          </span>
          <span style={{ color: "rgba(0,255,65,.2)" }}>|</span>
          <span>
            UPTIME: <span style={{ color: "#00ff41" }}>14d 07:22:31</span>
          </span>
        </div>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   PANEL WRAPPER
───────────────────────────────────────────── */
function Panel({ title, children, className = "", style = {} }) {
  return (
    <div
      className={`relative overflow-hidden scanline panel-border ${className}`}
      style={{
        background:
          "linear-gradient(180deg, rgba(0,18,4,0.92), rgba(0,10,2,0.92))",
        border: "1px solid rgba(0,255,65,.22)",
        borderRadius: 2,
        ...style,
      }}
    >
      <div className="p-3 pb-0">
        <div
          className="font-orbitron text-[.62rem] tracking-[.24em] uppercase pb-2 mb-3"
          style={{
            color: "#00f5ff",
            borderBottom: "1px solid rgba(0,255,65,.18)",
            textShadow: "0 0 8px rgba(0,245,255,.35)",
          }}
        >
          <span style={{ color: "#00ff41" }}>■ </span>
          {title}
        </div>
      </div>
      <div className="px-3 pb-3 h-[calc(100%-52px)]">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STAT BOX
───────────────────────────────────────────── */
function StatBox({ value, label, color = "#00ff41", suffix = "" }) {
  return (
    <div
      className="text-center p-2"
      style={{
        background: "rgba(0,255,65,.03)",
        border: "1px solid rgba(0,255,65,.15)",
        minHeight: 64,
      }}
    >
      <div
        className="font-orbitron font-bold text-[2rem] leading-none"
        style={{ color, textShadow: `0 0 14px ${color}` }}
      >
        {value}
        {suffix && <span className="text-base">{suffix}</span>}
      </div>

      <div
        className="text-[.5rem] mt-1 tracking-[.22em]"
        style={{ color: "rgba(0,255,65,.45)" }}
      >
        {label}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROGRESS BAR
───────────────────────────────────────────── */
function ProgBar({ label, value, color }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-[.65rem] mb-1">
        <span style={{ color: "rgba(0,255,65,.75)" }}>{label}</span>
        <span style={{ color: "#00f5ff" }}>{value}%</span>
      </div>

      <div
        className="h-[6px] rounded-sm overflow-hidden"
        style={{
          background: "rgba(0,255,65,.07)",
          border: "1px solid rgba(0,255,65,.15)",
        }}
      >
        <div
          className="h-full rounded-sm shimmer relative overflow-hidden transition-all duration-700"
          style={{
            width: value + "%",
            background: color,
            boxShadow: `0 0 5px ${color}`,
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   WORLD MAP SVG
───────────────────────────────────────────── */
const ATTACK_COORDS = [
  [185, 95],
  [678, 100],
  [718, 148],
  [558, 158],
  [308, 178],
  [108, 163],
  [408, 125],
  [538, 245],
  [198, 258],
  [648, 78],
  [478, 185],
  [338, 145],
  [252, 285],
  [608, 125],
  [152, 125],
  [738, 195],
  [348, 295],
  [438, 255],
  [128, 225],
  [588, 235],
];

const LANDS = [
  "M25,72 Q80,52 135,67 Q175,49 225,62 Q245,92 235,122 Q215,152 195,149 Q155,162 125,147 Q70,142 38,122 Z",
  "M245,62 Q285,45 365,55 Q425,45 485,59 Q515,85 505,125 Q492,155 460,162 Q420,167 380,159 Q340,163 300,149 Q268,135 252,105 Z",
  "M525,55 Q582,40 652,49 Q705,45 745,65 Q762,89 752,125 Q742,149 712,159 Q682,165 652,155 Q612,159 582,145 Q548,129 532,100 Z",
  "M48,167 Q92,159 132,169 Q152,189 142,225 Q122,245 92,240 Q62,229 47,205 Z",
  "M262,169 Q312,159 372,169 Q412,179 432,209 Q422,255 392,275 Q362,289 332,279 Q296,269 272,245 Q252,215 257,190 Z",
  "M532,169 Q572,159 612,169 Q642,185 646,215 Q636,249 606,259 Q576,262 552,245 Q528,225 527,195 Z",
  "M622,252 Q660,244 690,259 Q706,279 696,304 Q681,319 661,314 Q641,309 631,289 Q621,275 623,262 Z",
  "M360,269 Q392,262 412,275 Q422,295 412,315 Q396,325 377,320 Q359,310 359,290 Z",
];

function WorldMap() {
  const [ox, oy] = [400, 182];

  return (
    <svg viewBox="0 0 800 365" className="w-full h-full">
      <rect width="800" height="365" fill="rgba(0,16,4,0.7)" rx="2" />

      {Array.from({ length: 11 }, (_, i) => (
        <line
          key={`v${i}`}
          x1={i * 80}
          y1="0"
          x2={i * 80}
          y2="365"
          stroke="rgba(0,255,65,0.04)"
          strokeWidth=".5"
        />
      ))}

      {Array.from({ length: 10 }, (_, i) => (
        <line
          key={`h${i}`}
          x1="0"
          y1={i * 37}
          x2="800"
          y2={i * 37}
          stroke="rgba(0,255,65,0.04)"
          strokeWidth=".5"
        />
      ))}

      {LANDS.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="rgba(0,65,18,0.55)"
          stroke="rgba(0,255,65,0.28)"
          strokeWidth=".8"
        />
      ))}

      {ATTACK_COORDS.map(([x, y], i) => {
        const isCrit = i % 3 === 0;
        const c = isCrit ? "255,0,60" : "0,245,255";
        const dur = (0.7 + (i % 4) * 0.3).toFixed(1);

        return (
          <g key={i}>
            <line
              x1={ox}
              y1={oy}
              x2={x}
              y2={y}
              stroke={`rgba(${c},.18)`}
              strokeWidth=".8"
              strokeDasharray="4,3"
            />
            <circle cx={x} cy={y} r="3" fill={`rgba(${c},.9)`} />
            <circle
              cx={x}
              cy={y}
              r="3"
              fill="none"
              stroke={`rgba(${c},.7)`}
              strokeWidth="1.2"
            >
              <animate
                attributeName="r"
                from="3"
                to="15"
                dur={`${dur}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from=".8"
                to="0"
                dur={`${dur}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}

      <circle
        cx={ox}
        cy={oy}
        r="8"
        fill="none"
        stroke="rgba(0,255,65,.9)"
        strokeWidth="1.5"
      >
        <animate
          attributeName="r"
          from="8"
          to="22"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          from=".9"
          to="0"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      <circle cx={ox} cy={oy} r="5" fill="rgba(0,255,65,.95)" />
      <text
        x={ox + 9}
        y={oy - 4}
        fill="rgba(0,255,65,.9)"
        fontSize="9"
        fontFamily="Share Tech Mono"
      >
        HQ
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   TRAFFIC CHART
───────────────────────────────────────────── */
function TrafficChart({ data1, data2 }) {
  const ref = useRef(null);

  const draw = useCallback(() => {
    const c = ref.current;
    if (!c) return;

    const W = c.offsetWidth;
    const H = 145;
    if (W <= 0) return;

    c.width = W;
    c.height = H;

    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < 6; i++) {
      const y = (H / 6) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.strokeStyle = "rgba(0,255,65,.06)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    const drawLine = (data, col, fill) => {
      const pts = data.map((v, i) => [
        (i / (data.length - 1 || 1)) * W,
        H - (v / 100) * H,
      ]);

      ctx.beginPath();
      pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.strokeStyle = col;
      ctx.lineWidth = 2;
      ctx.stroke();

      if (fill) {
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
      }
    };

    drawLine(data1, "rgba(0,245,255,.95)", "rgba(0,245,255,.06)");
    drawLine(data2, "rgba(0,255,65,.95)", "rgba(0,255,65,.05)");

    ctx.font = "10px Share Tech Mono";
    ctx.fillStyle = "rgba(0,245,255,.85)";
    ctx.fillText("▬ INBOUND", 10, 14);
    ctx.fillStyle = "rgba(0,255,65,.85)";
    ctx.fillText("▬ OUTBOUND", 95, 14);
  }, [data1, data2]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [draw]);

  return <canvas ref={ref} className="w-full block" style={{ height: 145 }} />;
}

/* ─────────────────────────────────────────────
   BAR CHART
───────────────────────────────────────────── */
const DEFAULT_BAR_DATA = [
  { l: "SQLi", v: 84, c: "#ff003c" },
  { l: "XSS", v: 61, c: "#ff8c00" },
  { l: "CSRF", v: 45, c: "#ffe600" },
  { l: "RCE", v: 38, c: "#cc00ff" },
  { l: "BF", v: 72, c: "#00f5ff" },
  { l: "MITM", v: 29, c: "#00ff41" },
  { l: "DDoS", v: 55, c: "#ff003c" },
];

function BarChart({ data = DEFAULT_BAR_DATA }) {
  const mx = Math.max(...data.map((b) => b.v), 1);

  return (
    <div className="flex items-end gap-[6px] pt-1" style={{ height: 140 }}>
      {data.map((b) => (
        <div key={b.l} className="flex-1 flex flex-col items-center gap-[4px]">
          <div className="text-[.56rem]" style={{ color: "#00f5ff" }}>
            {b.v}
          </div>

          <div
            className="w-full rounded-t-sm relative overflow-hidden"
            style={{
              height: (b.v / mx) * 115,
              background: b.c,
              boxShadow: `0 0 7px ${b.c}`,
              minHeight: 2,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg,rgba(255,255,255,.18) 0%,transparent 50%)",
              }}
            />
          </div>

          <div
            className="text-[.5rem] text-center"
            style={{ color: "rgba(0,255,65,.45)" }}
          >
            {b.l}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   DONUT CHART
───────────────────────────────────────────── */
const DEFAULT_DONUT_DATA = [
  { l: "Malware", v: 34, c: "#ff003c" },
  { l: "Intrusion", v: 28, c: "#ff8c00" },
  { l: "DDoS", v: 19, c: "#ffe600" },
  { l: "Phishing", v: 12, c: "#00f5ff" },
  { l: "Other", v: 7, c: "#00ff41" },
];

function DonutChart({ data = DEFAULT_DONUT_DATA }) {
  const total = data.reduce((a, b) => a + b.v, 0);
  let angle = -Math.PI / 2;

  const slices = data.map((d) => {
    const sweep = (d.v / total) * 2 * Math.PI;
    const x1 = 50 + 36 * Math.cos(angle);
    const y1 = 50 + 36 * Math.sin(angle);
    const x2 = 50 + 36 * Math.cos(angle + sweep);
    const y2 = 50 + 36 * Math.sin(angle + sweep);
    const large = sweep > Math.PI ? 1 : 0;
    const path = `M50,50 L${x1},${y1} A36,36 0 ${large},1 ${x2},${y2} Z`;
    angle += sweep;
    return { ...d, path };
  });

  return (
    <div className="flex items-center gap-4 mt-1 h-full">
      <svg
        viewBox="0 0 100 100"
        style={{ width: 120, height: 120, flexShrink: 0 }}
      >
        {slices.map((s) => (
          <path
            key={s.l}
            d={s.path}
            fill={s.c}
            opacity=".88"
            stroke="#000a00"
            strokeWidth="1.2"
          />
        ))}

        <circle cx="50" cy="50" r="21" fill="#000a00" />
        <text
          x="50"
          y="46"
          textAnchor="middle"
          fill="#00ff41"
          fontSize="6.5"
          fontFamily="Orbitron"
        >
          TOTAL
        </text>
        <text
          x="50"
          y="57"
          textAnchor="middle"
          fill="#00f5ff"
          fontSize="10"
          fontFamily="Orbitron"
          fontWeight="700"
        >
          {total}
        </text>
      </svg>

      <div className="text-[.65rem]">
        {data.map((d) => (
          <div key={d.l} className="flex items-center gap-2 mb-[7px]">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: d.c }}
            />
            <span style={{ color: "rgba(0,255,65,.7)" }}>{d.l}</span>
            <span style={{ color: d.c }}>{d.v}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   GAUGE
───────────────────────────────────────────── */
function Gauge({ value }) {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");

    const W = 220,
      H = 120,
      cx = W / 2,
      cy = H - 12,
      r = 84;

    ctx.clearRect(0, 0, W, H);

    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI, 0, false);
    ctx.strokeStyle = "rgba(0,255,65,.1)";
    ctx.lineWidth = 15;
    ctx.stroke();

    const p = value / 100;
    const g = ctx.createLinearGradient(cx - r, 0, cx + r, 0);
    g.addColorStop(0, "#00ff41");
    g.addColorStop(0.5, "#ffe600");
    g.addColorStop(1, "#ff003c");

    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI, Math.PI + Math.PI * p, false);
    ctx.strokeStyle = g;
    ctx.lineWidth = 15;
    ctx.lineCap = "round";
    ctx.stroke();

    const na = Math.PI + Math.PI * p;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + 70 * Math.cos(na), cy + 70 * Math.sin(na));
    ctx.strokeStyle = "rgba(255,255,255,.92)";
    ctx.lineWidth = 2.2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, 2 * Math.PI);
    ctx.fillStyle = "#00ff41";
    ctx.fill();

    for (let i = 0; i <= 10; i++) {
      const a = Math.PI + Math.PI * (i / 10);
      ctx.beginPath();
      ctx.moveTo(cx + (r - 18) * Math.cos(a), cy + (r - 18) * Math.sin(a));
      ctx.lineTo(cx + (r - 8) * Math.cos(a), cy + (r - 8) * Math.sin(a));
      ctx.strokeStyle = "rgba(0,255,65,.35)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }, [value]);

  return <canvas ref={ref} width="220" height="120" />;
}

/* ─────────────────────────────────────────────
   LIVE LOG
───────────────────────────────────────────── */
function LiveLog({ logs = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [logs]);

  const getColor = (type) => {
    if (type === "ALERT" || type === "BLOCK") return "text-red-400";
    if (type === "WARN") return "text-yellow-400";
    if (type === "OK") return "text-cyan-400";
    return "";
  };

  return (
    <div
      ref={ref}
      className="font-mono-hack text-[.63rem] overflow-y-auto"
      style={{
        height: 132,
        color: "rgba(0,255,65,.72)",
        lineHeight: 1.75,
      }}
    >
      {logs.map((l, i) => (
        <div
          key={i}
          className={`whitespace-nowrap overflow-hidden ${getColor(l.type)}`}
        >
          {l.time} [{l.type}] {l.message}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   HEX GRID
───────────────────────────────────────────── */
const HEX_STATES = [
  "safe",
  "safe",
  "safe",
  "safe",
  "safe",
  "warn",
  "warn",
  "danger",
  "idle",
  "idle",
];

function HexGrid() {
  const [hexes, setHexes] = useState([]);

  const gen = () =>
    Array.from({ length: 45 }, (_, i) => ({
      id: i,
      st: HEX_STATES[Math.floor(Math.random() * HEX_STATES.length)],
    }));

  useEffect(() => {
    setHexes(gen());
    const id = setInterval(() => setHexes(gen()), 4500);
    return () => clearInterval(id);
  }, []);

  const colors = {
    safe: ["rgba(0,255,65,.15)", "#00ff41"],
    warn: ["rgba(255,230,0,.15)", "#ffe600"],
    danger: ["rgba(255,0,60,.2)", "#ff003c"],
    idle: ["rgba(0,245,255,.08)", "#00f5ff"],
  };

  return (
    <div className="flex flex-wrap gap-1 justify-center mt-1">
      {hexes.map((h) => (
        <div
          key={h.id}
          className={`flex items-center justify-center text-[.45rem] transition-all duration-300 hover:scale-125 ${
            h.st === "danger" ? "hex-danger" : ""
          }`}
          style={{
            width: 25,
            height: 25,
            clipPath:
              "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
            background: colors[h.st][0],
            color: colors[h.st][1],
            fontFamily: "'Share Tech Mono', monospace",
          }}
        >
          {String(h.id + 1).padStart(2, "0")}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   TOP ATTACK SOURCES TABLE
───────────────────────────────────────────── */
function IPTable({ rows = [] }) {
  return (
    <table className="w-full font-mono-hack text-[.62rem] border-collapse">
      <tbody>
        {rows.map((r, idx) => (
          <tr
            key={idx}
            style={{ borderBottom: "1px solid rgba(0,255,65,.07)" }}
          >
            <td className="py-[5px] pr-1">
              <span
                className="inline-block w-[6px] h-[6px] rounded-full mr-1"
                style={{
                  background:
                    idx < 2 ? "#ff003c" : idx < 4 ? "#ff8c00" : "#00f5ff",
                }}
              />
              {r.ip}
            </td>
            <td className="py-[5px]" style={{ color: "rgba(0,255,65,.38)" }}>
              [{r.country || "SRC"}]
            </td>
            <td
              className="py-[5px] text-right"
              style={{
                color: idx < 2 ? "#ff003c" : idx < 4 ? "#ff8c00" : "#00f5ff",
              }}
            >
              {r.hits?.toLocaleString?.() ?? r.hits}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setUptime((u) => u + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = (s) =>
    `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(
      Math.floor((s % 3600) / 60)
    ).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <footer
      className="font-mono-hack text-[.6rem] mt-2"
      style={{
        background: "rgba(0,8,0,.96)",
        borderTop: "1px solid rgba(0,255,65,.18)",
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
        <div className="flex items-center gap-4 flex-wrap">
          <span
            className="font-orbitron font-bold text-xs"
            style={{ color: "#00ff41", textShadow: "0 0 8px #00ff41" }}
          >
            NEXUS//SEC
          </span>

          <span style={{ color: "rgba(0,255,65,.35)" }}>|</span>

          <span style={{ color: "rgba(0,255,65,.45)" }}>
            SESSION UPTIME: <span style={{ color: "#00f5ff" }}>{fmt(uptime)}</span>
          </span>

          <span style={{ color: "rgba(0,255,65,.35)" }}>|</span>

          <span style={{ color: "rgba(0,255,65,.45)" }}>
            BUILD: <span style={{ color: "#00ff41" }}>v4.2.1-stable</span>
          </span>
        </div>

        <div
          className="flex items-center gap-4"
          style={{ color: "rgba(0,255,65,.4)" }}
        >
          {["Docs", "API", "Alerts", "Support"].map((item) => (
            <button
              key={item}
              className="hover:text-green-400 transition-colors"
              style={{
                color: "rgba(0,255,65,.4)",
                fontFamily: "'Share Tech Mono',monospace",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div style={{ color: "rgba(0,255,65,.3)" }}>
          &copy; 2025 NEXUS SECURITY SYSTEMS —{" "}
          <span style={{ color: "#ff003c" }}>CLASSIFIED</span>
        </div>
      </div>

      <div
        className="px-5 pb-2 flex flex-wrap gap-6"
        style={{ borderTop: "1px solid rgba(0,255,65,.08)" }}
      >
        {[
          { l: "ENCRYPTION", v: "AES-256-GCM", c: "#00ff41" },
          { l: "CERT EXPIRY", v: "127 DAYS", c: "#00f5ff" },
          { l: "LAST SCAN", v: "00:04:17 AGO", c: "#00ff41" },
          { l: "COMPLIANCE", v: "SOC2 / ISO27001", c: "#ffe600" },
          { l: "DATA CENTER", v: "DC-EAST-03", c: "#00f5ff" },
        ].map(({ l, v, c }) => (
          <div key={l} className="pt-2">
            <div style={{ color: "rgba(0,255,65,.35)" }}>{l}</div>
            <div style={{ color: c }}>{v}</div>
          </div>
        ))}
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   FALLBACK MOCK DATA
───────────────────────────────────────────── */
const fallbackLogs = Array.from({ length: 8 }, (_, i) => {
  const types = ["WARN", "ALERT", "OK", "BLOCK"];
  const messages = [
    `Traffic spike: ${ri(220, 999)}Mbps on eth0`,
    `SQL injection from ${rip()} → /api/auth`,
    `Geo-block: ${rip()} [RU]`,
    `Sig DB updated: ${ri(10000, 99999)} rules loaded`,
    `Packets cleared: ${ri(200, 999)}/s`,
    `DNS anomaly: ${rip()} querying C2`,
  ];
  return {
    time: ts(),
    type: types[ri(0, types.length)],
    message: messages[ri(0, messages.length)],
  };
});

const fallbackIPs = [
  { ip: "185.220.101.47", country: "RU", hits: 2847 },
  { ip: "45.142.212.100", country: "CN", hits: 1923 },
  { ip: "91.108.4.30", country: "IR", hits: 1441 },
  { ip: "103.56.16.8", country: "KP", hits: 1209 },
  { ip: "194.165.16.5", country: "UA", hits: 887 },
  { ip: "5.188.206.126", country: "BR", hits: 654 },
  { ip: "167.94.145.58", country: "US", hits: 432 },
];

const fallbackPackets = Array.from({ length: 8 }, (_, i) => ({
  time: ts(),
  src_ip: rip(),
  dst_ip: rip(),
  protocol: ["TCP", "UDP", "ICMP"][ri(0, 3)],
  prediction: ["Normal", "DDoS", "Brute Force", "Uncertain"][ri(0, 4)],
  confidence: `${ri(72, 99)}%`,
}));

/* ─────────────────────────────────────────────
   MAIN DASHBOARD
───────────────────────────────────────────── */
function Dashboard() {
  const [stats, setStats] = useState({
    threats: 220,
    blocked: "97.3",
    alerts: 16,
    nodes: 64,
  });

  const [res, setRes] = useState({ cpu: 60, mem: 59, net: 87, disk: 47 });
  const [gaugeVal, setGaugeVal] = useState(85);

  const [tIn, setTIn] = useState(() =>
    Array.from({ length: 60 }, () => Math.random() * 65 + 20)
  );
  const [tOut, setTOut] = useState(() =>
    Array.from({ length: 60 }, () => Math.random() * 35 + 10)
  );

  const [logs, setLogs] = useState(fallbackLogs);
  const [topAttackIPs, setTopAttackIPs] = useState(fallbackIPs);
  const [attackData, setAttackData] = useState(DEFAULT_BAR_DATA);
  const [livePackets, setLivePackets] = useState(fallbackPackets);
  const [incidentBreakdown, setIncidentBreakdown] = useState(DEFAULT_DONUT_DATA);

  useEffect(() => {
    const anim1 = setInterval(() => {
      setTIn((d) => [...d.slice(1), Math.random() * 70 + 20]);
      setTOut((d) => [...d.slice(1), Math.random() * 40 + 10]);
    }, 700);

    return () => clearInterval(anim1);
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/dashboard");
        if (!response.ok) throw new Error("API not reachable");

        const data = await response.json();

        if (data?.stats) setStats(data.stats);
        if (data?.resource_usage) setRes(data.resource_usage);
        if (typeof data?.risk_score !== "undefined") setGaugeVal(data.risk_score);

        if (data?.traffic?.inbound?.length) setTIn(data.traffic.inbound);
        if (data?.traffic?.outbound?.length) setTOut(data.traffic.outbound);

        if (data?.event_logs?.length) setLogs(data.event_logs);
        if (data?.top_attack_sources?.length) setTopAttackIPs(data.top_attack_sources);
        if (data?.live_packets?.length) setLivePackets(data.live_packets);

        if (data?.attacks && typeof data.attacks === "object") {
          const mapped = Object.entries(data.attacks).map(([k, v], i) => ({
            l: k.toUpperCase().slice(0, 5),
            v: Number(v),
            c: ["#ff003c", "#ff8c00", "#ffe600", "#cc00ff", "#00f5ff", "#00ff41", "#ff003c"][i % 7],
          }));
          if (mapped.length) setAttackData(mapped);
        }

        if (data?.incident_breakdown && typeof data.incident_breakdown === "object") {
          const colors = ["#ff003c", "#ff8c00", "#ffe600", "#00f5ff", "#00ff41"];
          const mapped = Object.entries(data.incident_breakdown).map(([k, v], i) => ({
            l: k,
            v: Number(v),
            c: colors[i % colors.length],
          }));
          if (mapped.length) setIncidentBreakdown(mapped);
        }
      } catch (err) {
        console.warn("Using fallback dashboard data:", err.message);
      }
    };

    fetchDashboard();
    const interval = setInterval(fetchDashboard, 3000);
    return () => clearInterval(interval);
  }, []);

  const threatColor = (v) =>
    v > 85 ? "#ff003c" : v > 70 ? "#ffe600" : "#00ff41";

  return (
    <div
      className="p-3 font-mono-hack min-h-screen"
      style={{
        color: "#00ff41",
        maxWidth: "1720px",
        margin: "0 auto",
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.065) 2px,rgba(0,0,0,.065) 4px)",
        }}
      />

      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: "270px minmax(700px, 1fr) 290px",
          alignItems: "start",
        }}
      >
        {/* LEFT */}
        <div className="flex flex-col gap-3">
          <Panel title="System Vitals" className="h-[200px]">
            <div className="grid grid-cols-2 gap-2">
              <StatBox value={stats.threats} label="THREATS/HR" />
              <StatBox
                value={stats.blocked}
                suffix="%"
                label="BLOCKED"
                color="#00f5ff"
              />
              <StatBox value={stats.alerts} label="ALERTS" color="#ff003c" />
              <StatBox value={stats.nodes} label="NODES UP" />
            </div>
          </Panel>

          <Panel title="Active Threats" className="h-[260px]">
            {[
              ["SQL Injection", "CRITICAL", "bc"],
              ["Brute Force", "HIGH", "bh"],
              ["Port Scan", "HIGH", "bh"],
              ["XSS Attempt", "MEDIUM", "bm"],
              ["Phishing URL", "MEDIUM", "bm"],
              ["DNS Anomaly", "LOW", "bl"],
            ].map(([n, s, c]) => {
              const cols = {
                bc: ["rgba(255,0,60,.18)", "#ff003c"],
                bh: ["rgba(255,140,0,.15)", "#ff8c00"],
                bm: ["rgba(255,230,0,.12)", "#ffe600"],
                bl: ["rgba(0,255,65,.1)", "#00ff41"],
              };

              return (
                <div
                  key={n}
                  className="flex justify-between items-center py-[8px] text-[.68rem]"
                  style={{ borderBottom: "1px solid rgba(0,255,65,.07)" }}
                >
                  <span style={{ color: "rgba(0,255,65,.8)" }}>{n}</span>
                  <span
                    className="text-[.57rem] px-2 py-[2px] rounded-sm tracking-widest"
                    style={{
                      background: cols[c][0],
                      border: `1px solid ${cols[c][1]}`,
                      color: cols[c][1],
                    }}
                  >
                    {s}
                  </span>
                </div>
              );
            })}
          </Panel>

          <Panel title="Resource Usage" className="h-[200px]">
            <ProgBar label="CPU" value={res.cpu} color={threatColor(res.cpu)} />
            <ProgBar label="MEMORY" value={res.mem} color="#00f5ff" />
            <ProgBar
              label="NETWORK"
              value={res.net}
              color={res.net > 88 ? "#ff003c" : "#ffe600"}
            />
            <ProgBar label="DISK I/O" value={res.disk} color="#00ff41" />
          </Panel>
        </div>

        {/* CENTER */}
        <div className="flex flex-col gap-3">
          <Panel title="Global Threat Map — Live Attack Origins" className="h-[290px]">
            <div className="h-[220px]">
              <WorldMap />
            </div>
          </Panel>

          <div className="grid grid-cols-2 gap-3">
            <Panel title="Network Traffic (Live)" className="h-[210px]">
              <TrafficChart data1={tIn} data2={tOut} />
            </Panel>

            <Panel title="Attack Vectors (24h)" className="h-[210px]">
              <BarChart data={attackData} />
            </Panel>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Panel title="Incident Breakdown" className="h-[210px]">
              <DonutChart data={incidentBreakdown} />
            </Panel>

            <Panel title="Live Event Log" className="h-[210px]">
              <LiveLog logs={logs} />
            </Panel>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-3">
          <Panel title="Threat Score" className="h-[250px]">
            <div className="flex flex-col items-center gap-1">
              <Gauge value={Math.round(gaugeVal)} />
              <div
                className="font-orbitron font-bold text-3xl"
                style={{
                  color: threatColor(gaugeVal),
                  textShadow: `0 0 14px ${threatColor(gaugeVal)}`,
                }}
              >
                {Math.round(gaugeVal)}
              </div>
              <div
                className="text-[.57rem] tracking-[.15em]"
                style={{ color: "rgba(0,255,65,.45)" }}
              >
                RISK INDEX
              </div>
            </div>
          </Panel>

          <Panel title="Node Health Matrix" className="h-[260px]">
            <HexGrid />
            <div className="flex justify-center gap-3 mt-3 text-[.55rem]">
              {[
                ["#00ff41", "SAFE"],
                ["#ffe600", "WARN"],
                ["#ff003c", "CRIT"],
                ["#00f5ff", "IDLE"],
              ].map(([c, l]) => (
                <span key={l} className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ background: c }} />
                  <span style={{ color: "rgba(0,255,65,.5)" }}>{l}</span>
                </span>
              ))}
            </div>
          </Panel>

          <Panel title="Top Attack Sources" className="h-[230px]">
            <IPTable rows={topAttackIPs} />
          </Panel>

          <Panel title="Live Packet Predictions" className="h-[250px]">
            <div className="overflow-auto" style={{ maxHeight: 175 }}>
              <table className="w-full text-[.6rem] font-mono-hack">
                <thead>
                  <tr
                    style={{
                      color: "#00f5ff",
                      borderBottom: "1px solid rgba(0,255,65,.2)",
                    }}
                  >
                    <th className="text-left py-1">TIME</th>
                    <th className="text-left py-1">SRC</th>
                    <th className="text-left py-1">DST</th>
                    <th className="text-left py-1">PROTO</th>
                    <th className="text-left py-1">PRED</th>
                    <th className="text-left py-1">CONF</th>
                  </tr>
                </thead>
                <tbody>
                  {livePackets.map((pkt, i) => (
                    <tr
                      key={i}
                      style={{ borderBottom: "1px solid rgba(0,255,65,.06)" }}
                    >
                      <td className="py-1">{pkt.time}</td>
                      <td className="py-1">{pkt.src_ip}</td>
                      <td className="py-1">{pkt.dst_ip}</td>
                      <td className="py-1">{pkt.protocol}</td>
                      <td
                        className="py-1"
                        style={{
                          color:
                            pkt.prediction === "Uncertain"
                              ? "#ffe600"
                              : ["normal", "benign"].includes(
                                  String(pkt.prediction).toLowerCase()
                                )
                              ? "#00ff41"
                              : "#ff003c",
                        }}
                      >
                        {pkt.prediction}
                      </td>
                      <td className="py-1">{pkt.confidence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <FontLink />
      <MatrixCanvas />

      {!booted && <BootScreen onDone={() => setBooted(true)} />}

      {booted && (
        <div
          className="relative z-10 min-h-screen flex flex-col animate-fade-up"
          style={{ background: "rgba(0,8,0,0.58)" }}
        >
          <Navbar />
          <main className="flex-1 overflow-x-auto">
            <Dashboard />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}