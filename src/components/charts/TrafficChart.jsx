import { useEffect, useRef, useCallback } from "react";

export function TrafficChart({ data1, data2 }) {
  const ref = useRef(null);

  const draw = useCallback(() => {
    const c = ref.current;
    if (!c) return;

    const W = c.offsetWidth;
    const H = 115;
    if (W <= 0) return;

    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < 5; i++) {
      const y = (H / 5) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.strokeStyle = "rgba(0,255,65,.06)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    const drawLine = (data, col, fill) => {
      const pts = data.map((v, i) => [
        (i / (data.length - 1)) * W,
        H - (v / 100) * H,
      ]);
      ctx.beginPath();
      pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.strokeStyle = col;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      if (fill) {
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
      }
    };

    drawLine(data1, "rgba(0,245,255,.9)", "rgba(0,245,255,.06)");
    drawLine(data2, "rgba(0,255,65,.9)", "rgba(0,255,65,.06)");

    ctx.font = "9px Share Tech Mono";
    ctx.fillStyle = "rgba(0,245,255,.8)";
    ctx.fillText("▬ INBOUND", 8, 12);
    ctx.fillStyle = "rgba(0,255,65,.8)";
    ctx.fillText("▬ OUTBOUND", 90, 12);
  }, [data1, data2]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [draw]);

  return <canvas ref={ref} className="w-full block" style={{ height: 115 }} />;
}
