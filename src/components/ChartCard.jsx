import React from 'react';

export default function ChartCard({
  title,
  subtitle,
  children,
  badge = 'SIMULATED',
  rightAction = null
}) {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title-wrap">
          <div className="chart-title">{title}</div>
          {subtitle && <div className="chart-subtitle">{subtitle}</div>}
        </div>
        <div className="chart-meta">
          {badge && <span className="badge-demo">{badge}</span>}
          {rightAction}
        </div>
      </div>
      <div className="chart-body">
        {children}
      </div>
    </div>
  );
}
