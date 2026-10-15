import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  PlayCircle,
  Activity,
  ScrollText,
  Bell,
  History,
  Server,
  Zap,
  X
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function Sidebar({ isOpen, onClose }) {
  const { alarmState } = useDashboard();

  const navItems = [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { to: '/testing', label: 'Function Testing', icon: PlayCircle },
    { to: '/metrics', label: 'Monitoring & Metrics', icon: Activity },
    { to: '/logs', label: 'Logs Viewer', icon: ScrollText },
    { to: '/alerts', label: 'Alerts', icon: Bell, badge: alarmState },
    { to: '/history', label: 'Test History', icon: History },
    { to: '/info', label: 'Function Information', icon: Server },
  ];

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} aria-label="Close menu" />
      )}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <NavLink to="/" className="brand-link" onClick={onClose}>
            <div className="brand-icon">
              <Zap size={20} />
            </div>
            <div className="brand-text">
              <span className="brand-title">Lambda<span>Watch</span></span>
              <span className="brand-subtitle">Serverless Observability</span>
            </div>
          </NavLink>
          {isOpen && (
            <button
              onClick={onClose}
              className="btn-icon"
              style={{ display: 'none' }}
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">Observability Menu</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <Icon className="nav-item-icon" />
                <span>{item.label}</span>
                {item.badge && item.badge === 'ALARM' && (
                  <span className="badge-status alarm" style={{ marginLeft: 'auto', padding: '1px 6px', fontSize: '10px' }}>
                    ALARM
                  </span>
                )}
                {item.badge && item.badge === 'OK' && (
                  <span className="badge-status ok" style={{ marginLeft: 'auto', padding: '1px 6px', fontSize: '10px' }}>
                    OK
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="preview-badge-card">
            <div className="preview-badge-header">
              <span className="preview-badge-title">Dashboard Mode</span>
              <span className="preview-badge-version">v1.0.0-preview</span>
            </div>
            <div className="preview-badge-status">
              <span className={`status-dot ${alarmState === 'ALARM' ? 'alarm' : alarmState === 'OK' ? 'healthy' : ''}`}></span>
              <span>Frontend Demo • Simulated</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
