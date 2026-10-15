import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function MetricCard({
  title,
  value,
  unit = '',
  icon: Icon,
  trend,
  trendType = 'neutral', // 'good' | 'bad' | 'neutral'
  subtitle,
  badge = null
}) {
  return (
    <div className="metric-card">
      <div className="metric-card-top">
        <span className="metric-title">{title}</span>
        {Icon && (
          <div className="metric-icon-wrap">
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="metric-value-row">
        <span className="metric-value">{value}</span>
        {unit && <span className="metric-unit">{unit}</span>}
      </div>

      <div className="metric-footer">
        {trend && (
          <span
            className={`trend-badge ${
              trendType === 'good'
                ? 'trend-up-good'
                : trendType === 'bad'
                ? 'trend-up-bad'
                : ''
            }`}
          >
            {trend.startsWith('+') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {trend}
          </span>
        )}
        {subtitle && <span>{subtitle}</span>}
        {badge && <span className="ml-auto">{badge}</span>}
      </div>
    </div>
  );
}
