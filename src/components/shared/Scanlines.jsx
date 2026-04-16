export function Scanlines() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 5,
        pointerEvents: "none",
        background:
          "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.065) 2px,rgba(0,0,0,.065) 4px)",
      }}
    />
  );
}
