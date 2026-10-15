import React, { useState } from 'react';
import {
  Bell,
  ShieldAlert,
  Sliders,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Clock,
  ArrowRight,
  Info
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import DemoNotice from '../components/DemoNotice';
import { useDashboard } from '../context/DashboardContext';
import { ALARM_INFO, ALARM_HISTORY } from '../data/mockConfig';

export default function Alerts() {
  const { alarmState, setAlarmState } = useDashboard();
  const [historyList, setHistoryList] = useState(ALARM_HISTORY);
  const [stateChangeNotification, setStateChangeNotification] = useState(null);

  // Switch demo alarm state
  const handleSimulateState = (newState) => {
    if (newState === alarmState) return;

    const oldState = alarmState;
    setAlarmState(newState);

    // Record new simulated state change in history
    const now = new Date();
    const formattedTimestamp = now.toISOString().replace('T', ' ').substring(0, 19);

    const newRecord = {
      id: 'hist-' + Date.now(),
      timestamp: formattedTimestamp,
      oldState,
      newState,
      reason: `Manual simulation triggered in dashboard presentation mode (${oldState} -> ${newState}).`,
      summary: `State changed to ${newState}`
    };

    setHistoryList(prev => [newRecord, ...prev]);

    setStateChangeNotification(
      `Simulated alarm state switched to ${newState}. Updated on Overview and Navigation.`
    );
    setTimeout(() => setStateChangeNotification(null), 3000);
  };

  return (
    <div>
      <DemoNotice message="DEMO ALARM CONTROLLER: This alarm view simulates CloudWatch metric alarms for the hackathon. Changing states does not modify real AWS resources." />

      <div className="page-header-banner">
        <div>
          <h2 className="page-intro-title">
            CloudWatch Alarms
            <span className="badge-demo">Demo Controller</span>
          </h2>
          <p className="page-intro-subtitle">
            Inspect alarm configuration, evaluation periods, and trigger threshold rules for <code>hackathon-monitoring-func</code>.
          </p>
        </div>
      </div>

      {stateChangeNotification && (
        <div
          style={{
            padding: '0.65rem 1rem',
            backgroundColor: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1rem',
            fontSize: '0.8rem',
            color: 'var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Info size={16} />
          <span>{stateChangeNotification}</span>
        </div>
      )}

      {/* Main Alarm Card & Interactive Simulation Controller */}
      <div className="alarm-panel" style={{ border: `1px solid ${alarmState === 'ALARM' ? 'var(--status-error-border)' : 'var(--border-subtle)'}` }}>
        <div className="alarm-panel-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: alarmState === 'ALARM' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: alarmState === 'ALARM' ? '#EF4444' : '#10B981'
              }}
            >
              <Bell size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {ALARM_INFO.alarmName}
                </h3>
                <StatusBadge status={alarmState} />
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Monitored Function: <span className="font-mono" style={{ color: 'var(--text-secondary)' }}>{ALARM_INFO.monitoredFunction}</span>
              </p>
            </div>
          </div>

          {/* Interactive State Simulator Controller */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              backgroundColor: 'var(--bg-card-inner)',
              border: '1px solid var(--border-medium)',
              padding: '0.5rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              flexWrap: 'wrap'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sliders size={13} />
              Simulate State:
            </span>
            <button
              className={`filter-btn ${alarmState === 'OK' ? 'active' : ''}`}
              style={{ fontSize: '0.75rem', padding: '3px 9px' }}
              onClick={() => handleSimulateState('OK')}
            >
              OK (Healthy)
            </button>
            <button
              className={`filter-btn ${alarmState === 'ALARM' ? 'active' : ''}`}
              style={{ fontSize: '0.75rem', padding: '3px 9px' }}
              onClick={() => handleSimulateState('ALARM')}
            >
              ALARM (Triggered)
            </button>
            <button
              className={`filter-btn ${alarmState === 'INSUFFICIENT_DATA' ? 'active' : ''}`}
              style={{ fontSize: '0.75rem', padding: '3px 9px' }}
              onClick={() => handleSimulateState('INSUFFICIENT_DATA')}
            >
              INSUFFICIENT_DATA
            </button>
          </div>
        </div>

        {/* Alarm Details Grid */}
        <div className="alarm-panel-grid" style={{ marginTop: '1rem' }}>
          <div className="alarm-field">
            <span className="alarm-field-label">CloudWatch Metric</span>
            <span className="alarm-field-value mono">{ALARM_INFO.metricName}</span>
          </div>

          <div className="alarm-field">
            <span className="alarm-field-label">Statistic & Period</span>
            <span className="alarm-field-value">{ALARM_INFO.statistic} over {ALARM_INFO.period}</span>
          </div>

          <div className="alarm-field">
            <span className="alarm-field-label">Threshold Rule</span>
            <span className="alarm-field-value" style={{ color: '#F87171' }}>
              {ALARM_INFO.threshold}
            </span>
          </div>

          <div className="alarm-field">
            <span className="alarm-field-label">Datapoints to Alarm</span>
            <span className="alarm-field-value">{ALARM_INFO.evaluationPeriods}</span>
          </div>

          <div className="alarm-field">
            <span className="alarm-field-label">Missing Data Treatment</span>
            <span className="alarm-field-value mono">Treat as {ALARM_INFO.treatMissingData}</span>
          </div>

          <div className="alarm-field">
            <span className="alarm-field-label">Last State Change</span>
            <span className="alarm-field-value font-mono text-xs">{ALARM_INFO.lastStateChange}</span>
          </div>
        </div>

        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: 'var(--bg-card-inner)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)'
          }}
        >
          <strong style={{ color: 'var(--text-primary)' }}>State Reason: </strong>
          {alarmState === 'ALARM'
            ? ALARM_INFO.stateReason
            : alarmState === 'OK'
            ? 'Threshold Not Crossed: Datapoint [0.0] was not greater than threshold (1.0).'
            : 'Unchecked: Insufficient metrics collected during the latest evaluation interval.'}
        </div>
      </div>

      {/* CloudWatch State Definition Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}
      >
        <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <CheckCircle size={16} style={{ color: '#10B981' }} />
            <span style={{ fontWeight: 600, color: '#34D399', fontSize: '0.85rem' }}>OK State</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            The metric is within defined limits (Errors &le; 1). Indicates the serverless function is executing normally without breaching the error budget.
          </p>
        </div>

        <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <AlertTriangle size={16} style={{ color: '#EF4444' }} />
            <span style={{ fontWeight: 600, color: '#F87171', fontSize: '0.85rem' }}>ALARM State</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            The metric has crossed the configured threshold (Errors &gt; 1 in 1 minute). In production, this would trigger an Amazon SNS alert.
          </p>
        </div>

        <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <HelpCircle size={16} style={{ color: '#F59E0B' }} />
            <span style={{ fontWeight: 600, color: '#FBBF24', fontSize: '0.85rem' }}>INSUFFICIENT_DATA State</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            The alarm has just started, the metric is not available, or not enough datapoints are available to determine whether the alarm condition is satisfied.
          </p>
        </div>
      </div>

      {/* Alarm State History Table */}
      <div className="table-card">
        <div className="table-header">
          <div>
            <h3 className="table-title">Alarm State History</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Chronological log of alarm condition transitions
            </span>
          </div>
          <span className="badge-demo">Demo Log</span>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Transition</th>
                <th>New State</th>
                <th>Summary Reason</th>
              </tr>
            </thead>
            <tbody>
              {historyList.map((h) => (
                <tr key={h.id}>
                  <td className="font-mono" style={{ whiteSpace: 'nowrap' }}>
                    {h.timestamp}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="font-mono text-xs">{h.oldState}</span>
                      <ArrowRight size={12} style={{ color: 'var(--text-muted)' }} />
                      <span className="font-mono text-xs" style={{ fontWeight: 600 }}>{h.newState}</span>
                    </div>
                  </td>
                  <td>
                    <StatusBadge status={h.newState} size="sm" />
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                    {h.reason}
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
