import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  History,
  Search,
  Trash2,
  Play,
  Copy,
  Check,
  AlertCircle,
  Clock,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import DemoNotice from '../components/DemoNotice';
import { useDashboard } from '../context/DashboardContext';

export default function TestHistory() {
  const navigate = useNavigate();
  const { testHistory, clearTestHistory } = useDashboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'SUCCESS' | 'ERROR'
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Filter history
  const filteredHistory = useMemo(() => {
    return testHistory.filter((item) => {
      // Status filter
      if (statusFilter !== 'ALL' && item.status !== statusFilter) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesId = item.testId.toLowerCase().includes(query);
        const matchesInput = JSON.stringify(item.input).toLowerCase().includes(query);
        const matchesOutput = JSON.stringify(item.output).toLowerCase().includes(query);
        if (!matchesId && !matchesInput && !matchesOutput) return false;
      }

      return true;
    });
  }, [testHistory, statusFilter, searchTerm]);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(typeof text === 'string' ? text : JSON.stringify(text, null, 2));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    clearTestHistory();
    setShowClearConfirm(false);
  };

  return (
    <div>
      <DemoNotice message="LOCAL DEMO HISTORY: Test records stored in browser session storage. These do not represent genuine AWS CloudWatch Logs or execution trails." />

      <div className="page-header-banner">
        <div>
          <h2 className="page-intro-title">
            Test Execution History
            <span className="badge-demo">Demo Records</span>
          </h2>
          <p className="page-intro-subtitle">
            Historical trace of test invocations triggered from the Function Testing console.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {testHistory.length > 0 && (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => setShowClearConfirm(true)}
              title="Clear all test history"
            >
              <Trash2 size={14} />
              <span>Clear History</span>
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showClearConfirm && (
        <div
          style={{
            padding: '1rem',
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F87171', fontSize: '0.85rem' }}>
            <AlertCircle size={18} />
            <span>Are you sure you want to clear all {testHistory.length} local demo execution records?</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setShowClearConfirm(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={handleClear}
            >
              Confirm Clear
            </button>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="search-input-wrap">
          <Search size={15} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search test ID, input params, results..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Status:</span>
          {['ALL', 'SUCCESS', 'ERROR'].map((st) => (
            <button
              key={st}
              className={`filter-btn ${statusFilter === st ? 'active' : ''}`}
              onClick={() => setStatusFilter(st)}
            >
              {st === 'ALL' ? 'All Executions' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Table Card */}
      <div className="table-card">
        <div className="table-header">
          <div>
            <h3 className="table-title">Execution Records ({filteredHistory.length})</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Click any execution record to inspect raw JSON input and response
            </span>
          </div>
          <span className="badge-demo">Local Demo Storage</span>
        </div>

        {filteredHistory.length > 0 ? (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Test ID</th>
                  <th>Timestamp</th>
                  <th>Input Payload</th>
                  <th>Status</th>
                  <th>Duration</th>
                  <th>Output / Error Result</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((item) => (
                  <tr key={item.testId}>
                    <td className="font-mono" style={{ color: 'var(--accent-cyan)', whiteSpace: 'nowrap' }}>
                      {item.testId}
                    </td>
                    <td className="font-mono" style={{ whiteSpace: 'nowrap' }}>
                      {item.timestamp}
                    </td>
                    <td className="font-mono" style={{ maxWidth: '180px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          maxWidth: '180px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                        title={JSON.stringify(item.input)}
                      >
                        {JSON.stringify(item.input)}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={item.status} size="sm" />
                    </td>
                    <td className="font-mono" style={{ whiteSpace: 'nowrap' }}>
                      {item.duration} ms
                    </td>
                    <td className="font-mono" style={{ maxWidth: '240px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          maxWidth: '240px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          color: item.status === 'ERROR' ? '#F87171' : 'var(--text-secondary)'
                        }}
                        title={JSON.stringify(item.output)}
                      >
                        {JSON.stringify(item.output)}
                      </span>
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '2px 6px' }}
                          onClick={() => setSelectedRecord(item)}
                          title="View payload details"
                        >
                          Details
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '2px 6px' }}
                          onClick={() => handleCopy(item.output, item.testId)}
                          title="Copy result"
                        >
                          {copiedId === item.testId ? (
                            <Check size={12} style={{ color: '#10B981' }} />
                          ) : (
                            <Copy size={12} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <History className="empty-icon" />
            <div className="empty-title">No test history found</div>
            <div className="empty-desc">
              {testHistory.length === 0
                ? 'No tests have been recorded yet. Navigate to Function Testing to execute your first mock event!'
                : 'No execution records matched your filter criteria.'}
            </div>
            {testHistory.length === 0 && (
              <button
                className="btn btn-primary btn-sm"
                style={{ marginTop: '1rem' }}
                onClick={() => navigate('/testing')}
              >
                <Play size={13} />
                <span>Go to Function Testing</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal / Detailed Drawer for Selected Record */}
      {selectedRecord && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 60,
            padding: '1rem'
          }}
          onClick={() => setSelectedRecord(null)}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '650px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-lg)',
              padding: '1.5rem'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Execution Details: <span className="font-mono" style={{ color: 'var(--accent-cyan)' }}>{selectedRecord.testId}</span>
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Recorded at {selectedRecord.timestamp} (Simulated)
                </span>
              </div>
              <StatusBadge status={selectedRecord.status} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ backgroundColor: 'var(--bg-card-inner)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>DURATION</div>
                <div className="font-mono" style={{ fontWeight: 600 }}>{selectedRecord.duration} ms</div>
              </div>
              <div style={{ backgroundColor: 'var(--bg-card-inner)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>STATUS CODE</div>
                <div className="font-mono" style={{ fontWeight: 600 }}>{selectedRecord.statusCode || (selectedRecord.status === 'SUCCESS' ? 200 : 400)}</div>
              </div>
              <div style={{ backgroundColor: 'var(--bg-card-inner)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>REQUEST ID</div>
                <div className="font-mono text-xs" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {selectedRecord.requestId ? selectedRecord.requestId.substring(0, 10) + '...' : 'mock-req-01'}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                INPUT PAYLOAD
              </div>
              <pre className="response-code-display" style={{ minHeight: '80px', maxHeight: '160px' }}>
                {JSON.stringify(selectedRecord.input, null, 2)}
              </pre>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                OUTPUT PAYLOAD
              </div>
              <pre className="response-code-display" style={{ minHeight: '80px', maxHeight: '180px' }}>
                {JSON.stringify(selectedRecord.output, null, 2)}
              </pre>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedRecord(null)}>
                Close
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setSelectedRecord(null);
                  navigate('/testing');
                }}
              >
                <Play size={13} />
                <span>Test Again</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
