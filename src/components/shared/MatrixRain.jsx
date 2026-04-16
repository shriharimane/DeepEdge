import { useEffect, useRef } from "react";

export function MatrixRain({ opacity = 0.06 }) {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;

    const ctx = c.getContext("2d");
    const chars =
      "アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF<>[]{}|/\\!@#$%^&*";
    let drops = [];

    const resize = () => {
      c.width = innerWidth;
      c.height = innerHeight;
      drops = Array(Math.floor(c.width / 14)).fill(1);
    };

    resize();
    window.addEventListener("resize", resize);

    const id = setInterval(() => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = "12px Share Tech Mono";

      drops.forEach((y, i) => {
        ctx.fillText(
          chars[Math.floor(Math.random() * chars.length)],
          i * 14,
          y * 14
        );
        if (y * 14 > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }, 60);

    return () => {
      clearInterval(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        opacity,
        pointerEvents: "none",
      }}
    />
  );
}
