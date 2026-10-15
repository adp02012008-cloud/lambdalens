import React, { useState } from 'react';
import {
  Play,
  AlertTriangle,
  RotateCcw,
  Copy,
  Check,
  CheckCircle,
  XCircle,
  Clock,
  Cpu,
  Layers,
  Terminal,
  Code
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import DemoNotice from '../components/DemoNotice';
import { useDashboard } from '../context/DashboardContext';
import { validateJsonPayload, executeFunctionTest } from '../services/testFunctionService';

const DEFAULT_PAYLOAD = JSON.stringify({ a: 10, b: 20 }, null, 2);

export default function FunctionTesting() {
  const { addTestExecution } = useDashboard();
  const [jsonInput, setJsonInput] = useState(DEFAULT_PAYLOAD);
  const [validationError, setValidationError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [copied, setCopied] = useState(false);

  // Validate on change
  const handleInputChange = (e) => {
    const val = e.target.value;
    setJsonInput(val);
    const { error } = validateJsonPayload(val);
    setValidationError(error);
  };

  // Run normal simulated test
  const handleRun = async (forceError = false) => {
    const { isValid, parsed, error } = validateJsonPayload(jsonInput);
    if (!isValid && !forceError) {
      setValidationError(error);
      return;
    }

    setValidationError(null);
    setIsLoading(true);

    try {
      const payloadToTest = forceError ? (parsed || { a: 10 }) : parsed;
      const res = await executeFunctionTest(payloadToTest, forceError);
      setResponse(res);

      // Record to test history
      addTestExecution({
        testId: 'test-' + Math.random().toString(36).substring(2, 7),
        timestamp: res.timestamp,
        input: payloadToTest,
        output: res.data,
        status: res.status,
        duration: res.duration,
        statusCode: res.statusCode,
        requestId: res.requestId
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setJsonInput(DEFAULT_PAYLOAD);
    setValidationError(null);
  };

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
      setValidationError(null);
    } catch (e) {
      setValidationError(e.message);
    }
  };

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <DemoNotice message="SIMULATED FUNCTION RUNNER: Demonstrates invocation lifecycle with mock payloads. Actual AWS Lambda & API Gateway invocation will be wired in Phase 2." />

      <div className="page-header-banner">
        <div>
          <h2 className="page-intro-title">
            Function Testing
            <span className="badge-not-connected">AWS Not Connected</span>
          </h2>
          <p className="page-intro-subtitle">
            Execute test events against the serverless function handler, validate input schemas, and inspect runtime response payloads.
          </p>
        </div>
      </div>

      {/* Target Function Metadata Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          fontSize: '0.8rem'
        }}
      >
        <div>
          <span style={{ color: 'var(--text-muted)' }}>Target Function: </span>
          <span className="font-mono" style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
            hackathon-monitoring-func
          </span>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)' }}>Region: </span>
          <span className="font-mono">ap-southeast-2</span>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)' }}>Proposed Runtime: </span>
          <span className="font-mono">Python 3.12</span>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)' }}>Execution Mode: </span>
          <span className="badge-simulated">Mock Simulator</span>
        </div>
      </div>

      {/* Grid: Editor & Response */}
      <div className="testing-grid">
        {/* Left: JSON Input Editor */}
        <div className="editor-card">
          <div className="editor-header">
            <span className="editor-title">
              <Terminal size={16} style={{ color: 'var(--accent-cyan)' }} />
              Event JSON Payload
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleFormatJson}
                title="Format JSON"
              >
                <Code size={13} />
                <span>Format</span>
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleReset}
                title="Reset to default payload"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="editor-body">
            <textarea
              className={`json-textarea ${validationError ? 'invalid' : ''}`}
              value={jsonInput}
              onChange={handleInputChange}
              placeholder="Enter JSON payload..."
              spellCheck="false"
              rows={10}
            />

            {validationError && (
              <div className="validation-error">
                <AlertTriangle size={14} />
                <span>JSON Syntax Error: {validationError}</span>
              </div>
            )}

            {/* Quick Templates */}
            <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Presets:</span>
              <button
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.72rem', padding: '2px 8px' }}
                onClick={() => setJsonInput(JSON.stringify({ a: 10, b: 20 }, null, 2))}
              >
                Default (10, 20)
              </button>
              <button
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.72rem', padding: '2px 8px' }}
                onClick={() => setJsonInput(JSON.stringify({ a: 150, b: 350 }, null, 2))}
              >
                Large (150, 350)
              </button>
              <button
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.72rem', padding: '2px 8px' }}
                onClick={() => setJsonInput(JSON.stringify({ a: 10 }, null, 2))}
              >
                Missing 'b' (Trigger Error)
              </button>
            </div>

            {/* Action Buttons */}
            <div className="editor-actions">
              <button
                className="btn btn-primary"
                onClick={() => handleRun(false)}
                disabled={isLoading}
              >
                <Play size={15} />
                <span>{isLoading ? 'Executing...' : 'Run Function'}</span>
              </button>

              <button
                className="btn btn-danger"
                onClick={() => handleRun(true)}
                disabled={isLoading}
                title="Trigger a controlled demo error response"
              >
                <AlertTriangle size={15} />
                <span>Test Error</span>
              </button>

              <button
                className="btn btn-secondary"
                onClick={handleReset}
                disabled={isLoading}
              >
                <RotateCcw size={15} />
                <span>Reset Input</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Response Panel */}
        <div className="response-card">
          <div className="response-header">
            <span className="response-title">
              <Layers size={16} style={{ color: 'var(--accent-cyan)' }} />
              Response Payload
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {response && (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={handleCopy}
                  title="Copy response JSON"
                >
                  {copied ? <Check size={13} style={{ color: '#10B981' }} /> : <Copy size={13} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              )}
              <span className="badge-not-connected">AWS Not Connected</span>
            </div>
          </div>

          <div className="response-body">
            {response ? (
              <>
                {/* Meta details bar */}
                <div className="response-meta-bar">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>Status:</span>
                    <StatusBadge
                      status={response.status}
                      label={`${response.statusCode} ${response.status}`}
                      size="sm"
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} />
                      <strong className="font-mono">{response.duration} ms</strong>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Cpu size={12} />
                      <span className="font-mono">{response.memoryUsed}</span>
                    </span>
                  </div>
                </div>

                {/* Status Notice */}
                <div
                  style={{
                    padding: '0.45rem 0.75rem',
                    backgroundColor: 'rgba(56, 189, 248, 0.08)',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '0.75rem',
                    fontSize: '0.72rem',
                    color: 'var(--accent-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>SIMULATED RESPONSE — AWS NOT CONNECTED</span>
                  <span className="font-mono">{response.requestId}</span>
                </div>

                {/* Formatted Code Display */}
                <pre className="response-code-display">
                  {JSON.stringify(response.data, null, 2)}
                </pre>

                <div style={{ marginTop: '0.75rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Result recorded into local test execution history.
                </div>
              </>
            ) : (
              <div className="empty-state" style={{ padding: '3.5rem 1rem' }}>
                <Terminal className="empty-icon" />
                <div className="empty-title">Ready for execution</div>
                <div className="empty-desc">
                  Click <strong>Run Function</strong> or <strong>Test Error</strong> to send a test event payload and observe the execution result.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
