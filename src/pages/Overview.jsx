import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Clock,
  AlertOctagon,
  Bell,
  PlayCircle,
  ExternalLink,
  ShieldAlert
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
  ResponsiveContainer
} from 'recharts';
import MetricCard from '../components/MetricCard';
import ChartCard from '../components/ChartCard';
import StatusBadge from '../components/StatusBadge';
import DemoNotice from '../components/DemoNotice';
import { useDashboard } from '../context/DashboardContext';
import { TIME_RANGE_METRICS, RECENT_EXECUTIONS_DEMO } from '../data/mockMetrics';
import { ALARM_INFO } from '../data/mockConfig';

// Custom tooltip for charts
function CustomTooltip({ active, payload, label, unit = '' }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-recharts-tooltip">
        <div className="tooltip-time">Time: {label}</div>
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

export default function Overview() {
  const { alarmState, timeRange } = useDashboard();
  const currentData = TIME_RANGE_METRICS[timeRange] || TIME_RANGE_METRICS['1h'];
  const chartData = currentData.invocations;
  const summary = currentData.summary;

  return (
    <div>
      {/* Demo Notice Banner */}
      <DemoNotice message="DEMO ENVIRONMENT: Displaying simulated metrics for hackathon presentation. AWS Lambda and CloudWatch connections are planned for Phase 2." />

      {/* Page Header */}
      <div className="page-header-banner">
        <div>
          <h2 className="page-intro-title">
            Serverless Overview
            <span className="badge-demo">Demo Data</span>
          </h2>
          <p className="page-intro-subtitle">
            Monitor function execution, performance, errors, and alert health from one place.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link to="/testing" className="btn btn-primary btn-sm">
            <PlayCircle size={15} />
            <span>Test Function</span>
          </Link>
          <Link to="/alerts" className="btn btn-secondary btn-sm">
            <Bell size={15} />
            <span>Manage Alarm</span>
          </Link>
        </div>
      </div>

      {/* 4 Primary Metric Cards */}
      <div className="metrics-grid">
        <MetricCard
          title="Total Invocations"
          value={summary.totalInvocations}
          icon={Activity}
          trend="+14.2%"
          trendType="good"
          subtitle="vs previous period"
          badge={<span className="badge-simulated">Simulated</span>}
        />
        <MetricCard
          title="Average Duration"
          value={summary.avgDuration}
          unit="ms"
          icon={Clock}
          trend="-1.8 ms"
          trendType="good"
          subtitle="Avg execution time"
          badge={<span className="badge-simulated">Simulated</span>}
        />
        <MetricCard
          title="Total Errors"
          value={summary.totalErrors}
          icon={AlertOctagon}
          trend={summary.totalErrors > 0 ? '+2' : '0'}
          trendType={summary.totalErrors > 0 ? 'bad' : 'good'}
          subtitle="Handled & unhandled"
          badge={<span className="badge-demo">Demo</span>}
        />
        <MetricCard
          title="Alarm Status"
          value={alarmState}
          icon={ShieldAlert}
          subtitle="Hackathon-Error-Alert"
          badge={<StatusBadge status={alarmState} size="sm" />}
        />
      </div>

      {/* Charts Section: Invocation History & Execution Duration */}
      <div className="charts-grid">
        <ChartCard
          title="Invocation History"
          subtitle={`Total executions recorded over ${timeRange}`}
          badge="SIMULATED"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="invocationsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="time" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="invocations"
                name="Invocations"
                stroke="#38BDF8"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#invocationsGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Execution Duration"
          subtitle="Average latency per invocation window"
          badge="SIMULATED"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="time" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} unit=" ms" />
              <Tooltip content={<CustomTooltip unit="ms" />} />
              <Line
                type="monotone"
                dataKey="duration"
                name="Duration"
                stroke="#818CF8"
                strokeWidth={2}
                dot={{ r: 3, fill: '#818CF8' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Error History Chart */}
      <div className="charts-grid single-col">
        <ChartCard
          title="Error History"
          subtitle="Failed executions and error status responses over time"
          badge="SIMULATED"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="time" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="errors"
                name="Errors"
                fill="#EF4444"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* D. Alarm Status Panel */}
      <div className="alarm-panel">
        <div className="alarm-panel-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <ShieldAlert size={20} style={{ color: alarmState === 'ALARM' ? '#EF4444' : '#10B981' }} />
            <div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                CloudWatch Alarm Status
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Demonstration alarm status. Not currently pulling live state from AWS CloudWatch.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <StatusBadge status={alarmState} />
            <Link to="/alerts" className="btn btn-secondary btn-sm">
              <span>View in Alerts</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </div>

        <div className="alarm-panel-grid">
          <div className="alarm-field">
            <span className="alarm-field-label">Alarm Name</span>
            <span className="alarm-field-value mono">{ALARM_INFO.alarmName}</span>
          </div>
          <div className="alarm-field">
            <span className="alarm-field-label">Monitored Function</span>
            <span className="alarm-field-value mono">{ALARM_INFO.monitoredFunction}</span>
          </div>
          <div className="alarm-field">
            <span className="alarm-field-label">CloudWatch Metric</span>
            <span className="alarm-field-value mono">{ALARM_INFO.metricName}</span>
          </div>
          <div className="alarm-field">
            <span className="alarm-field-label">Threshold Rule</span>
            <span className="alarm-field-value">{ALARM_INFO.threshold}</span>
          </div>
          <div className="alarm-field">
            <span className="alarm-field-label">Current State</span>
            <span className="alarm-field-value" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <StatusBadge status={alarmState} size="sm" />
              <span className="badge-demo">Demo</span>
            </span>
          </div>
        </div>
      </div>

      {/* E. Recent Executions Table */}
      <div className="table-card">
        <div className="table-header">
          <div>
            <h3 className="table-title">Recent Executions</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Illustrative execution history records (Sample data for hackathon demo)
            </span>
          </div>
          <span className="badge-demo">Demo Records</span>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Function Name</th>
                <th>Execution Status</th>
                <th>Duration</th>
                <th>Result / Summary</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_EXECUTIONS_DEMO.map((row) => (
                <tr key={row.id}>
                  <td className="font-mono" style={{ whiteSpace: 'nowrap' }}>
                    {row.timestamp}
                  </td>
                  <td className="font-mono" style={{ color: 'var(--accent-cyan)' }}>
                    {row.functionName}
                  </td>
                  <td>
                    <StatusBadge status={row.status} size="sm" />
                  </td>
                  <td className="font-mono">{row.duration}</td>
                  <td>
                    <span style={{ color: row.status === 'ERROR' ? '#F87171' : 'var(--text-secondary)' }}>
                      {row.summary}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
