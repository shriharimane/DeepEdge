export function ProgBar({ label, value, color }) {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-[.65rem] mb-1">
        <span style={{ color: "rgba(0,255,65,.7)" }}>{label}</span>
        <span style={{ color: "#00f5ff" }}>{value}%</span>
      </div>
      <div
        className="h-[5px] rounded-sm overflow-hidden"
        style={{ background: "rgba(0,255,65,.07)", border: "1px solid rgba(0,255,65,.15)" }}
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
