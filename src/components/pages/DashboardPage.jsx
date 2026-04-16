import { Panel } from "../shared/Panel";
import { StatBox } from "../shared/StatBox";
import { ProgBar } from "../shared/ProgBar";
import { TrafficChart } from "../charts/TrafficChart";
import { BarChart } from "../charts/BarChart";
import { WorldMap } from "../charts/WorldMap";

export function DashboardPage() {
  const trafficData1 = [
    20, 35,  28, 42, 55, 48, 62, 71, 65, 52, 58, 75, 82, 68, 45,
    55, 72, 84, 76, 60, 68, 79, 88, 92, 78, 65,
  ];
  const trafficData2 = [
    25, 38, 32, 38, 52, 60, 75, 68, 55, 45, 63, 70, 79, 75, 58,
    48, 65, 78, 88, 72, 60, 74, 81, 86, 70, 62,
  ];

  return (
    <div
      style={{
        padding: "24px 20px",
        maxWidth: "1400px",
        margin: "0 auto",
        minHeight: "calc(100vh - 260px)",
      }}
    >
      {/* Top Stats Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <StatBox value="3" label="THREATS" color="#ff003c" />
        <StatBox value="847" label="EVENTS" color="#00f5ff" />
        <StatBox value="99.8" label="UPTIME" color="#00ff41" suffix="%" />
        <StatBox value="24" label="ALERTS" color="#ffe600" />
      </div>

      {/* Main Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        {/* Traffic Chart */}
        <Panel title="Network Traffic" className="animate-fade-up">
          <TrafficChart data1={trafficData1} data2={trafficData2} />
        </Panel>

        {/* Threats by Type */}
        <Panel title="Threats By Type" className="animate-fade-up">
          <BarChart />
        </Panel>
      </div>

      {/* World Map */}
      <Panel
        title="Global Attack Map"
        className="animate-fade-up"
        style={{ marginBottom: "20px" }}
      >
        <WorldMap />
      </Panel>

      {/* System Status Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {/* CPU Status */}
        <Panel title="Processor">
          <ProgBar label="CORE-1" value={68} color="#00f5ff" />
          <ProgBar label="CORE-2" value={52} color="#00f5ff" />
          <ProgBar label="CORE-3" value={76} color="#00f5ff" />
          <ProgBar label="CORE-4" value={45} color="#00f5ff" />
        </Panel>

        {/* Memory */}
        <Panel title="Memory">
          <ProgBar label="DDR4 #1" value={72} color="#00ff41" />
          <ProgBar label="DDR4 #2" value={58} color="#00ff41" />
          <ProgBar label="DDR4 #3" value={81} color="#00ff41" />
          <ProgBar label="STACK" value={38} color="#00ff41" />
        </Panel>

        {/* Network IO */}
        <Panel title="Network I/O">
          <ProgBar
            label="ETH0 RX"
            value={64}
            color="#ff8c00"
          />
          <ProgBar
            label="ETH0 TX"
            value={52}
            color="#ff8c00"
          />
          <ProgBar
            label="ETH1 RX"
            value={41}
            color="#ff8c00"
          />
          <ProgBar
            label="ETH1 TX"
            value={76}
            color="#ff8c00"
          />
        </Panel>
      </div>
    </div>
  );
}
