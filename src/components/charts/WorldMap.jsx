import { useEffect, useState } from "react";

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

export function WorldMap() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  const [ox, oy] = [400, 182];

  return (
    <svg viewBox="0 0 800 365" className="w-full" style={{ height: 185 }}>
      <rect
        width="800"
        height="365"
        fill="rgba(0,16,4,0.7)"
        rx="2"
      />

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
        const dur = (0.7 + ((i % 4) * 0.3)).toFixed(1);

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

      <circle cx={ox} cy={oy} r="8" fill="none" stroke="rgba(0,255,65,.9)" strokeWidth="1.5">
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
