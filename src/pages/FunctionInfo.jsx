import React from 'react';
import {
  Server,
  Cloud,
  Globe,
  Code2,
  Bell,
  Cpu,
  Clock,
  HardDrive,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Layers
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import DemoNotice from '../components/DemoNotice';
import { FUNCTION_INFO, ALARM_INFO } from '../data/mockConfig';

export default function FunctionInfo() {
  const integrationChecklist = [
    {
      title: 'Phase 1: Dashboard UI & Mock Simulation',
      status: 'COMPLETED',
      desc: 'Modern dark theme, responsive layouts, Recharts analytics, mock testing console, and demo alarm states.'
    },
    {
      title: 'Phase 2: Deploy AWS API Gateway Endpoint',
      status: 'PENDING',
      desc: 'Create an HTTP or REST API Gateway proxy in ap-southeast-2 forwarding JSON requests to hackathon-monitoring-func.'
    },
    {
      title: 'Phase 2: Connect Live Execution Service',
      status: 'PENDING',
      desc: 'Replace mock runner in testFunctionService.js with fetch() calling the real API Gateway HTTPS URL.'
    },
    {
      title: 'Phase 2: CloudWatch GetMetricData Integration',
      status: 'PENDING',
      desc: 'Stream live Invocations, Duration, and Errors metrics from CloudWatch namespace AWS/Lambda.'
    },
    {
      title: 'Phase 2: CloudWatch Alarm Sync & SNS Webhook',
      status: 'PENDING',
      desc: 'Read real Hackathon-Error-Alert state from AWS CloudWatch DescribeAlarms API or SNS webhook.'
    }
  ];

  return (
    <div>
      <DemoNotice message="CONFIGURATION NOTICE: Showing proposed configuration parameters for the target AWS Lambda function. Live synchronization will be established in Phase 2." />

      <div className="page-header-banner">
        <div>
          <h2 className="page-intro-title">
            Function Information
            <span className="badge-proposed">Configuration</span>
          </h2>
          <p className="page-intro-subtitle">
            Deployment metadata, target runtime environments, and observability specifications for the serverless workload.
          </p>
        </div>
      </div>

      {/* Main Metadata Overview Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginBottom: '1.5rem'
        }}
      >
        {/* Core Identity */}
        <div className="alarm-panel" style={{ margin: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
            <Server size={18} style={{ color: 'var(--accent-cyan)' }} />
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Identity & Deployment</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <div className="alarm-field-label">Function Name</div>
              <div className="alarm-field-value mono" style={{ color: 'var(--accent-cyan)' }}>
                {FUNCTION_INFO.functionName}
              </div>
            </div>

            <div>
              <div className="alarm-field-label">Cloud Provider</div>
              <div className="alarm-field-value" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Cloud size={14} style={{ color: '#F59E0B' }} />
                <span>{FUNCTION_INFO.cloudProvider}</span>
              </div>
            </div>

            <div>
              <div className="alarm-field-label">AWS Region</div>
              <div className="alarm-field-value" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Globe size={14} style={{ color: '#38BDF8' }} />
                <span className="font-mono">{FUNCTION_INFO.awsRegion}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>({FUNCTION_INFO.awsRegionName})</span>
              </div>
            </div>

            <div>
              <div className="alarm-field-label">Backend Status</div>
              <div style={{ marginTop: '3px' }}>
                <span className="badge-not-connected">Not Connected (Phase 2)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Runtime Environment */}
        <div className="alarm-panel" style={{ margin: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
            <Code2 size={18} style={{ color: '#818CF8' }} />
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Runtime Environment</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <div className="alarm-field-label">Proposed Runtime</div>
              <div className="alarm-field-value" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="font-mono">{FUNCTION_INFO.runtime}</span>
                <span className="badge-demo">Proposed</span>
              </div>
            </div>

            <div>
              <div className="alarm-field-label">Handler Signature</div>
              <div className="alarm-field-value mono">
                {FUNCTION_INFO.handler}
              </div>
            </div>

            <div>
              <div className="alarm-field-label">Architecture</div>
              <div className="alarm-field-value mono">
                {FUNCTION_INFO.architecture}
              </div>
            </div>

            <div>
              <div className="alarm-field-label">Allocated Memory & Timeout</div>
              <div className="alarm-field-value" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="font-mono">{FUNCTION_INFO.memory}</span>
                <span style={{ color: 'var(--text-muted)' }}>•</span>
                <span className="font-mono">{FUNCTION_INFO.timeout}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Observability & Alarm Target */}
        <div className="alarm-panel" style={{ margin: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
            <Bell size={18} style={{ color: '#FBBF24' }} />
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Observability Configuration</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <div className="alarm-field-label">Telemetry Service</div>
              <div className="alarm-field-value">
                {FUNCTION_INFO.monitoringService}
              </div>
            </div>

            <div>
              <div className="alarm-field-label">Monitored Alarm</div>
              <div className="alarm-field-value mono" style={{ color: '#F87171' }}>
                {ALARM_INFO.alarmName}
              </div>
            </div>

            <div>
              <div className="alarm-field-label">Log Group Destination</div>
              <div className="alarm-field-value mono text-xs" style={{ wordBreak: 'break-all' }}>
                {FUNCTION_INFO.logGroup}
              </div>
            </div>

            <div>
              <div className="alarm-field-label">API Gateway Integration</div>
              <div style={{ marginTop: '3px' }}>
                <span className="badge-proposed">Pending Phase 2 Hook</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Serverless Architecture Flow */}
      <div className="alarm-panel" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Layers size={18} style={{ color: 'var(--accent-cyan)' }} />
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>System Architecture Overview</h3>
        </div>

        <div
          style={{
            backgroundColor: 'var(--bg-card-inner)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ textAlign: 'center', minWidth: '130px' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>FRONTEND CLIENT</div>
            <div style={{ padding: '0.6rem 0.85rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', fontWeight: 600 }}>
              LambdaWatch UI
            </div>
            <span className="badge-demo" style={{ marginTop: '4px' }}>Active Phase 1</span>
          </div>

          <ArrowRight size={18} style={{ color: 'var(--text-muted)' }} />

          <div style={{ textAlign: 'center', minWidth: '140px' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>ROUTING & INGRESS</div>
            <div style={{ padding: '0.6rem 0.85rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', fontWeight: 600 }}>
              AWS API Gateway
            </div>
            <span className="badge-not-connected" style={{ marginTop: '4px' }}>Phase 2 Target</span>
          </div>

          <ArrowRight size={18} style={{ color: 'var(--text-muted)' }} />

          <div style={{ textAlign: 'center', minWidth: '150px' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>SERVERLESS WORKLOAD</div>
            <div style={{ padding: '0.6rem 0.85rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', fontWeight: 600, color: 'var(--accent-cyan)' }}>
              hackathon-func
            </div>
            <span className="badge-proposed" style={{ marginTop: '4px' }}>Target Function</span>
          </div>

          <ArrowRight size={18} style={{ color: 'var(--text-muted)' }} />

          <div style={{ textAlign: 'center', minWidth: '150px' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>OBSERVABILITY</div>
            <div style={{ padding: '0.6rem 0.85rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', fontWeight: 600 }}>
              CloudWatch Logs & Metrics
            </div>
            <span className="badge-not-connected" style={{ marginTop: '4px' }}>Phase 2 Telemetry</span>
          </div>
        </div>
      </div>

      {/* Integration Roadmap Checklist */}
      <div className="table-card">
        <div className="table-header">
          <div>
            <h3 className="table-title">DevOps Integration Roadmap</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Steps required to transition from Phase 1 frontend preview to live AWS infrastructure
            </span>
          </div>
          <span className="badge-demo">Integration Plan</span>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>Status</th>
                <th>Phase & Objective</th>
                <th>Implementation Details</th>
              </tr>
            </thead>
            <tbody>
              {integrationChecklist.map((step, idx) => (
                <tr key={idx}>
                  <td>
                    {step.status === 'COMPLETED' ? (
                      <CheckCircle2 size={18} style={{ color: '#10B981' }} />
                    ) : (
                      <Clock size={18} style={{ color: '#F59E0B' }} />
                    )}
                  </td>
                  <td style={{ fontWeight: 600, color: step.status === 'COMPLETED' ? '#34D399' : 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                    {step.title}
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    {step.desc}
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
