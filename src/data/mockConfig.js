/**
 * Function configuration and metadata for LambdaWatch.
 * Unverified configurations are explicitly labeled as proposed or unverified.
 */

export const FUNCTION_INFO = {
  functionName: 'hackathon-monitoring-func',
  awsRegion: 'ap-southeast-2',
  awsRegionName: 'Asia Pacific (Sydney)',
  cloudProvider: 'Amazon Web Services (AWS)',
  runtime: 'Python 3.12 (Proposed)',
  runtimeStatus: 'UNVERIFIED',
  handler: 'lambda_function.lambda_handler',
  handlerStatus: 'PROPOSED',
  architecture: 'x86_64',
  memory: '128 MB (Proposed)',
  timeout: '3.00 seconds (Proposed)',
  monitoringService: 'Amazon CloudWatch',
  monitoredAlarm: 'Hackathon-Error-Alert',
  apiIntegration: 'Not connected (Phase 2)',
  backendStatus: 'Not connected (Simulated Demo)',
  logGroup: '/aws/lambda/hackathon-monitoring-func',
  codeSize: '1.2 KB (Estimated)',
  lastModified: '2026-10-15 10:14:00 (Simulated)',
  roleArn: 'arn:aws:iam::123456789012:role/service-role/hackathon-monitoring-func-role (Proposed)'
};

export const ALARM_INFO = {
  alarmName: 'Hackathon-Error-Alert',
  monitoredFunction: 'hackathon-monitoring-func',
  metricName: 'AWS/Lambda — Errors',
  metricNamespace: 'AWS/Lambda',
  statistic: 'Sum',
  period: '1 minute (60 seconds)',
  threshold: 'Greater than 1 (Errors > 1)',
  thresholdValue: 1,
  comparisonOperator: 'GreaterThanThreshold',
  evaluationPeriods: '1 datapoint within 1 minute',
  treatMissingData: 'missing',
  initialState: 'ALARM',
  lastStateChange: '2026-10-15 11:27:19 (Simulated)',
  stateReason: 'Threshold Crossed: 1 datapoint [2.0 (15/10/26 11:27:00)] was greater than the threshold (1.0).',
  actions: 'SNS Topic: arn:aws:sns:ap-southeast-2:123456789012:hackathon-alert-topic (Simulated)'
};

export const ALARM_HISTORY = [
  {
    id: 'hist-01',
    timestamp: '2026-10-15 11:27:19',
    oldState: 'OK',
    newState: 'ALARM',
    reason: 'Threshold Crossed: 1 datapoint [2.0] was greater than threshold (1.0).',
    summary: 'Error spike detected: 2 errors in 60s'
  },
  {
    id: 'hist-02',
    timestamp: '2026-10-15 10:45:00',
    oldState: 'ALARM',
    newState: 'OK',
    reason: 'Threshold Crossed: 1 datapoint [0.0] was not greater than threshold (1.0).',
    summary: 'Errors returned below threshold'
  },
  {
    id: 'hist-03',
    timestamp: '2026-10-15 09:12:30',
    oldState: 'INSUFFICIENT_DATA',
    newState: 'OK',
    reason: 'Datapoints received: [0.0]. Alarm returned to healthy state.',
    summary: 'CloudWatch metrics resumed'
  },
  {
    id: 'hist-04',
    timestamp: '2026-10-15 08:30:00',
    oldState: 'OK',
    newState: 'INSUFFICIENT_DATA',
    reason: 'No datapoints received in evaluation period.',
    summary: 'Zero invocations in period'
  }
];
