import React from 'react';
import { AlertTriangle, CheckCircle, HelpCircle, XCircle, Info } from 'lucide-react';

export default function StatusBadge({ status, size = 'md', showIcon = true, label = null }) {
  const normalized = (status || '').toUpperCase();
  const displayLabel = label || status;

  let className = 'badge-status';
  let Icon = null;

  switch (normalized) {
    case 'ALARM':
    case 'ERROR':
    case 'FAILED':
      className += ' alarm';
      Icon = XCircle;
      break;
    case 'OK':
    case 'HEALTHY':
    case 'SUCCESS':
      className += ' ok';
      Icon = CheckCircle;
      break;
    case 'INSUFFICIENT_DATA':
    case 'WARNING':
    case 'WARN':
      className += ' insufficient_data';
      Icon = HelpCircle;
      break;
    default:
      className += ' info';
      Icon = Info;
      break;
  }

  return (
    <span className={`${className} ${size === 'sm' ? 'text-xs' : ''}`}>
      {showIcon && Icon && <Icon size={size === 'sm' ? 12 : 14} />}
      <span>{displayLabel}</span>
    </span>
  );
}
