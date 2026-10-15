import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, RotateCw, Globe, ChevronRight } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function Topbar({ onToggleMobileMenu }) {
  const location = useLocation();
  const { timeRange, setTimeRange, lastRefreshTime, isRefreshing, triggerRefresh } = useDashboard();
  const [showRefreshToast, setShowRefreshToast] = useState(false);

  // Map route to page title and breadcrumb
  const pageMetadata = {
    '/': { title: 'Serverless Overview', breadcrumb: 'Dashboard / Overview' },
    '/testing': { title: 'Function Testing', breadcrumb: 'DevOps / Function Testing' },
    '/metrics': { title: 'Monitoring & Metrics', breadcrumb: 'Observability / Metrics' },
    '/logs': { title: 'Logs Viewer', breadcrumb: 'Observability / Logs' },
    '/alerts': { title: 'CloudWatch Alerts', breadcrumb: 'Management / Alerts' },
    '/history': { title: 'Test Execution History', breadcrumb: 'DevOps / History' },
    '/info': { title: 'Function Information', breadcrumb: 'Configuration / Lambda' },
  };

  const currentMeta = pageMetadata[location.pathname] || {
    title: 'LambdaWatch',
    breadcrumb: 'Dashboard'
  };

  const handleRefreshClick = () => {
    triggerRefresh();
    setShowRefreshToast(true);
    setTimeout(() => setShowRefreshToast(false), 2400);
  };

  const formattedTime = lastRefreshTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="mobile-menu-btn"
          onClick={onToggleMobileMenu}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="page-title-group">
          <div className="page-breadcrumb">
            <span>LambdaWatch</span>
            <ChevronRight size={12} />
            <span>{currentMeta.breadcrumb}</span>
          </div>
          <h1 className="page-title">{currentMeta.title}</h1>
        </div>
      </div>

      <div className="topbar-right">
        {/* AWS Region Badge */}
        <div className="region-badge" title="Target AWS Region">
          <span className="region-dot"></span>
          <Globe size={13} style={{ color: 'var(--text-muted)' }} />
          <span>ap-southeast-2</span>
        </div>

        {/* Global Time Range Selector (enabled on overview & metrics) */}
        {(location.pathname === '/' || location.pathname === '/metrics') && (
          <select
            className="time-range-select"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            title="Select time window for demonstration charts"
            aria-label="Time range selector"
          >
            <option value="1h">Last 1 hour</option>
            <option value="3h">Last 3 hours</option>
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
          </select>
        )}

        {/* Refresh button with simulated feedback */}
        <div style={{ position: 'relative' }}>
          <button
            className={`btn-icon ${isRefreshing ? 'spinning' : ''}`}
            onClick={handleRefreshClick}
            title={`Last updated: ${formattedTime} (Simulated refresh)`}
            aria-label="Refresh dashboard data"
          >
            <RotateCw size={16} />
          </button>

          {showRefreshToast && (
            <div
              style={{
                position: 'absolute',
                top: '44px',
                right: '0',
                backgroundColor: 'var(--bg-card-inner)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                padding: '6px 12px',
                fontSize: '11px',
                color: 'var(--accent-cyan)',
                whiteSpace: 'nowrap',
                boxShadow: 'var(--shadow-md)',
                zIndex: 50,
                pointerEvents: 'none'
              }}
            >
              Simulated refresh updated at {formattedTime}
            </div>
          )}
        </div>

        {/* User avatar placeholder without fake identity */}
        <div className="user-avatar-placeholder" title="Authenticated DevOps Session (Demo)">
          <div className="avatar-circle">
            <span>DO</span>
          </div>
          <div className="avatar-meta">
            <span className="avatar-role">DevOps Operator</span>
            <span className="avatar-sub">Mock Session</span>
          </div>
        </div>
      </div>
    </header>
  );
}
