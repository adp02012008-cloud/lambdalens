import React from 'react';
import {
  Activity,
  Clock,
  AlertTriangle,
  ZapOff,
  Users,
  CheckCircle2,
  Cpu,
  BarChart2
} from 'lucide-react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import MetricCard from '../components/MetricCard';
import ChartCard from '../components/ChartCard';
import DemoNotice from '../components/DemoNotice';
import { useDashboard } from '../context/DashboardContext';
import { TIME_RANGE_METRICS } from '../data/mockMetrics';

function MonitoringTooltip({ active, payload, label, unit = '' }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-recharts-tooltip">
        <div className="tooltip-time">Window: {label}</div>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="tooltip-item">
            <span className="tooltip-label">
              <span className="tooltip-color-dot" style={{ backgroundColor: entry.color }} />
              {entry.name}:
            </span>
            <span className="tooltip-val">
              {entry.value} {unit}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function Monitoring() {
  const { timeRange, setTimeRange } = useDashboard();
  const currentDataset = TIME_RANGE_METRICS[timeRange] || TIME_RANGE_METRICS['1h'];
  const chartData = currentDataset.invocations;
  const summary = currentDataset.summary;

  const timeRangeLabels = {
    '1h': 'Last 1 Hour (5-min intervals)',
    '3h': 'Last 3 Hours (30-min intervals)',
    '24h': 'Last 24 Hours (4-hour intervals)',
    '7d': 'Last 7 Days (Daily aggregation)',
  };

  return (
    <div>
      <DemoNotice message="CLOUDWATCH METRICS SIMULATION: Visualizing telemetry aggregated across specified time windows. AWS CloudWatch GetMetricData integration target for Phase 2." />

      <div className="page-header-banner">
        <div>
          <h2 className="page-intro-title">
            Monitoring & Metrics
            <span className="badge-demo">Demo Data</span>
          </h2>
          <p className="page-intro-subtitle">
            Fine-grained CloudWatch performance telemetry for <code>hackathon-monitoring-func</code>.
          </p>
        </div>

        {/* Local Time Range Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Range:</span>
          <div className="filter-group">
            {[
              { id: '1h', label: '1 Hour' },
              { id: '3h', label: '3 Hours' },
              { id: '24h', label: '24 Hours' },
              { id: '7d', label: '7 Days' },
            ].map(btn => (
              <button
                key={btn.id}
                className={`filter-btn ${timeRange === btn.id ? 'active' : ''}`}
                onClick={() => setTimeRange(btn.id)}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="metrics-grid">
        <MetricCard
          title="Invocations"
          value={summary.totalInvocations}
          icon={Activity}
          subtitle={timeRangeLabels[timeRange]}
          badge={<span className="badge-simulated">Demo</span>}
        />
        <MetricCard
          title="Avg Latency"
          value={summary.avgDuration}
          unit="ms"
          icon={Clock}
          subtitle="P50 latency average"
          badge={<span className="badge-simulated">Demo</span>}
        />
        <MetricCard
          title="Throttling"
          value={summary.throttles}
          icon={ZapOff}
          trend="0%"
          trendType="good"
          subtitle="Zero dropped requests"
          badge={<span className="badge-simulated">Safe</span>}
        />
        <MetricCard
          title="Concurrent Executions"
          value={summary.concurrentExecutions}
          icon={Users}
          subtitle="Max unreserved: 1,000"
          badge={<span className="badge-simulated">Low Load</span>}
        />
      </div>

      {/* Chart 1: Invocation count chart */}
      <div className="charts-grid">
        <ChartCard
          title="Invocation Count"
          subtitle={`Aggregated function invocations (${timeRangeLabels[timeRange]})`}
          badge="SIMULATED"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="monInvocations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="time" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} allowDecimals={false} />
              <Tooltip content={<MonitoringTooltip />} />
              <Area
                type="monotone"
                dataKey="invocations"
                name="Invocations"
                stroke="#0EA5E9"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#monInvocations)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 2: Execution duration chart */}
        <ChartCard
          title="Execution Duration (Latency)"
          subtitle="Duration in milliseconds over evaluation windows"
          badge="SIMULATED"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="time" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} unit=" ms" />
              <Tooltip content={<MonitoringTooltip unit="ms" />} />
              <Line
                type="monotone"
                dataKey="duration"
                name="Duration (ms)"
                stroke="#A855F7"
                strokeWidth={2}
                dot={{ r: 3, fill: '#A855F7' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Chart 3: Error history chart */}
      <div className="charts-grid single-col">
        <ChartCard
          title="Error Count History"
          subtitle="Errors detected across time intervals"
          badge="SIMULATED"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="time" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} allowDecimals={false} />
              <Tooltip content={<MonitoringTooltip />} />
              <Bar
                dataKey="errors"
                name="Errors"
                fill="#EF4444"
                radius={[4, 4, 0, 0]}
                maxBarSize={36}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Performance Summary Banner */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          padding: '1.25rem',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          marginTop: '0.5rem'
        }}
      >
        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Cold Start Estimate
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            2 Instances (~185 ms init)
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Average Memory Utilization
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            68 MB / 128 MB (53%)
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Success Rate
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10B981', marginTop: '0.2rem' }}>
            {((1 - (summary.totalErrors / (summary.totalInvocations || 1))) * 100).toFixed(1)}%
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Billed Duration Avg
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            13 ms (Tier: Free/Standard)
          </div>
        </div>
      </div>
    </div>
  );
}
