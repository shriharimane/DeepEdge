export function StatBox({ value, label, color = "#00ff41", suffix = "" }) {
  return (
    <div
      className="text-center p-2"
      style={{ background: "rgba(0,255,65,.03)", border: "1px solid rgba(0,255,65,.15)" }}
    >
      <div
        className="font-orb font-bold text-2xl leading-none"
        style={{ color, textShadow: `0 0 10px ${color}` }}
      >
        {value}
        {suffix && <span className="text-base">{suffix}</span>}
      </div>
      <div
        className="text-[.55rem] mt-1 tracking-widest"
        style={{ color: "rgba(0,255,65,.45)" }}
      >
        {label}
      </div>
    </div>
  );
}
