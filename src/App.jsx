import { useState, useEffect, useRef } from "react";

// Shared Components
import GlobalStyles from "./components/shared/GlobalStyles";
import { MatrixRain } from "./components/shared/MatrixRain";
import { Scanlines } from "./components/shared/Scanlines";

// Layout Components
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

// Page Components
import { LoginPage } from "./components/pages/LoginPage";
import { RegisterPage } from "./components/pages/RegisterPage";
import { DashboardPage } from "./components/pages/DashboardPage";

/* ══════════════════════════════════════════════
   BOOT SCREEN
═══════════════════════════════════════════════ */
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
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 font-mono"
      style={{
        background: "#000",
        transition: "opacity .6s",
        opacity: done ? 0 : 1,
        pointerEvents: done ? "none" : "all",
      }}
    >
      <div
        className="font-orb font-black tracking-widest glitch"
        style={{
          fontSize: "clamp(2rem,5vw,3.4rem)",
          color: "#00ff41",
          textShadow: "0 0 30px #00ff41,0 0 60px #00ff41",
        }}
      >
        NEXUS
        <span style={{ color: "#00f5ff" }}>//</span>
        SEC
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
            boxShadow: "0 0 10px #00ff41",
          }}
        />
      </div>

      <div className="text-xs" style={{ color: "#00f5ff" }}>
        {pct}%
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════ */
function App() {
  const [booting, setBooting] = useState(true);
  const [page, setPage] = useState("dashboard");
  const [authed, setAuthed] = useState(false);

  const handleBootDone = () => {
    setBooting(false);
    setPage("login");
    setAuthed(false);
  };

  return (
    <>
      <GlobalStyles />
      <MatrixRain opacity={0.06} />
      <Scanlines />

      {booting ? (
        <BootScreen onDone={handleBootDone} />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            background:
              "radial-gradient(circle at top, rgba(0,255,65,.04), transparent 30%), linear-gradient(180deg, rgba(0,20,5,.95), rgba(0,5,0,1))",
          }}
        >
          <Navbar page={page} setPage={setPage} authed={authed} setAuthed={setAuthed} />

          <main style={{ flex: 1, position: "relative", zIndex: 10 }}>
            {!authed && page === "login" && (
              <LoginPage setPage={setPage} setAuthed={setAuthed} />
            )}
            {!authed && page === "register" && (
              <RegisterPage setPage={setPage} />
            )}
            {authed && <DashboardPage />}
          </main>

          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
