const BAR_DATA = [
  { l: "SQLi", v: 84, c: "#ff003c" },
  { l: "XSS", v: 61, c: "#ff8c00" },
  { l: "CSRF", v: 45, c: "#ffe600" },
  { l: "RCE", v: 38, c: "#cc00ff" },
  { l: "BF", v: 72, c: "#00f5ff" },
  { l: "MITM", v: 29, c: "#00ff41" },
  { l: "DDoS", v: 55, c: "#ff003c" },
];

export function BarChart() {
  const mx = Math.max(...BAR_DATA.map((b) => b.v));

  return (
    <div className="flex items-end gap-[5px]" style={{ height: 105 }}>
      {BAR_DATA.map((b) => (
        <div
          key={b.l}
          className="flex-1 flex flex-col items-center gap-[3px]"
        >
          <div className="text-[.56rem]" style={{ color: "#00f5ff" }}>
            {b.v}
          </div>
          <div
            className="w-full rounded-sm transition-all duration-500 hover:opacity-80"
            style={{
              height: (b.v / mx) * 70 + "px",
              background: b.c,
              boxShadow: `0 0 8px ${b.c}`,
            }}
          />
          <div
            className="text-[.5rem] tracking-widest mt-1"
            style={{ color: "rgba(0,255,65,.6)" }}
          >
            {b.l}
          </div>
        </div>
      ))}
    </div>
  );
}
