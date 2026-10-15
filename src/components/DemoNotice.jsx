import React, { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';

export default function DemoNotice({
  message = "SIMULATED ENVIRONMENT: Displaying demonstration data. AWS Lambda, API Gateway, and CloudWatch metrics are not yet connected (Phase 2).",
  dismissible = true
}) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="demo-banner">
      <div className="demo-banner-content">
        <AlertCircle size={16} />
        <span>{message}</span>
      </div>
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          className="demo-banner-dismiss"
          title="Dismiss notification"
          aria-label="Dismiss banner"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
