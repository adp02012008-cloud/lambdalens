import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Terminal,
  Download,
  AlertCircle
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import DemoNotice from '../components/DemoNotice';
import { MOCK_LOGS, MOCK_LOG_STREAMS } from '../data/mockLogs';

export default function Logs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'SUCCESS' | 'ERRORS'
  const [expandedLogId, setExpandedLogId] = useState(null);
  const [selectedStream, setSelectedStream] = useState(
    '2026/10/15/[$LATEST]48a9f8b72e11409ab44c21980a316bdf'
  );

  // Filtered logs
  const filteredLogs = useMemo(() => {
    return MOCK_LOGS.filter((log) => {
      // Level filter
      if (levelFilter !== 'ALL' && log.level !== levelFilter) {
        return false;
      }

      // Status filter
      if (statusFilter === 'ERRORS') {
        if (log.level !== 'ERROR' && log.level !== 'WARN') return false;
      } else if (statusFilter === 'SUCCESS') {
        if (log.level === 'ERROR') return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesMsg = log.message.toLowerCase().includes(query);
        const matchesReq = log.requestId.toLowerCase().includes(query);
        const matchesDetails = (log.details || '').toLowerCase().includes(query);
        if (!matchesMsg && !matchesReq && !matchesDetails) return false;
      }

      return true;
    });
  }, [searchTerm, levelFilter, statusFilter]);

  const toggleExpand = (id) => {
    setExpandedLogId(prev => (prev === id ? null : id));
  };

  const handleDownloadLogs = () => {
    const content = filteredLogs
      .map(l => `[${l.timestamp}] [${l.level}] [${l.requestId}] ${l.message}\n${l.details || ''}`)
      .join('\n---\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lambdawatch-logs-demo-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <DemoNotice message="SIMULATED LOGS: CloudWatch Logs stream output from test executions. In Phase 2, this will stream live logs via CloudWatch FilterLogEvents API." />

      <div className="page-header-banner">
        <div>
          <h2 className="page-intro-title">
            CloudWatch Logs Viewer
            <span className="badge-simulated">Simulated Logs</span>
          </h2>
          <p className="page-intro-subtitle">
            Search and inspect execution records, system prints, exception stack traces, and AWS Lambda REPORT lines.
          </p>
        </div>

        <button className="btn btn-secondary btn-sm" onClick={handleDownloadLogs} title="Export filtered logs">
          <Download size={14} />
          <span>Export Logs</span>
        </button>
      </div>

      {/* Stream Selector & Metadata */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '0.75rem',
          fontSize: '0.8rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Terminal size={15} style={{ color: 'var(--accent-cyan)' }} />
          <span style={{ color: 'var(--text-muted)' }}>Log Group:</span>
          <span className="font-mono" style={{ color: 'var(--text-primary)' }}>
            /aws/lambda/hackathon-monitoring-func
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Active Stream:</span>
          <span className="font-mono text-xs" style={{ color: 'var(--accent-cyan)' }}>
            {selectedStream.substring(0, 32)}...
          </span>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="filter-bar">
        <div className="search-input-wrap">
          <Search size={15} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search log messages, RequestIds, traces..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Severity Filter */}
        <div className="filter-group">
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Level:</span>
          {['ALL', 'INFO', 'WARN', 'ERROR'].map(lvl => (
            <button
              key={lvl}
              className={`filter-btn ${levelFilter === lvl ? 'active' : ''}`}
              onClick={() => setLevelFilter(lvl)}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="filter-group">
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Filter:</span>
          {[
            { id: 'ALL', label: 'All' },
            { id: 'SUCCESS', label: 'Success Only' },
            { id: 'ERRORS', label: 'Errors Only' },
          ].map(st => (
            <button
              key={st.id}
              className={`filter-btn ${statusFilter === st.id ? 'active' : ''}`}
              onClick={() => setStatusFilter(st.id)}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table / Stream Panel */}
      <div className="table-card">
        <div className="table-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Execution Events ({filteredLogs.length} entries)
            </span>
          </div>
          <span className="badge-demo">Demo CloudWatch Stream</span>
        </div>

        {filteredLogs.length > 0 ? (
          <div>
            {filteredLogs.map((log) => {
              const isExpanded = expandedLogId === log.id;
              return (
                <div key={log.id} className="log-row">
                  <div className="log-row-summary" onClick={() => toggleExpand(log.id)}>
                    <span className="log-time">{log.timestamp}</span>
                    <span className={`log-level-badge ${log.level}`}>
                      {log.level}
                    </span>
                    <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                      [{log.requestId.substring(0, 8)}...]
                    </span>
                    <span className="log-msg" title={log.message}>
                      {log.message}
                    </span>
                    <div className="log-expand-icon">
                      {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="log-row-details">
                      <div style={{ marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                        Request ID: <span className="font-mono">{log.requestId}</span> | Timestamp: {log.timestamp}
                      </div>
                      <div>{log.details || log.message}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <AlertCircle className="empty-icon" />
            <div className="empty-title">No matching log entries</div>
            <div className="empty-desc">
              Try adjusting your search terms or clearing the level and status filters.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
