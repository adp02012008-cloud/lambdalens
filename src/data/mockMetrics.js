/**
 * Mock metrics data for LambdaWatch Serverless Dashboard.
 * These are illustrative sample values, not verified live metrics from CloudWatch.
 */

export const OVERVIEW_SUMMARY = {
  totalInvocations: 22,
  invocationsTrend: '+14.2%',
  avgDuration: 12.29,
  avgDurationUnit: 'ms',
  durationTrend: '-1.8 ms',
  totalErrors: 5,
  errorRate: '22.7%',
  alarmStatus: 'ALARM',
  throttles: 0,
  concurrentExecutions: 2,
  unreservedConcurrency: 1000,
  successRate: '77.3%',
  coldStarts: 2,
  billedDurationAvg: '13 ms',
  memoryAllocated: '128 MB',
};

// Data sets keyed by timeRange: '1h', '3h', '24h', '7d'
export const TIME_RANGE_METRICS = {
  '1h': {
    invocations: [
      { time: '11:00', invocations: 1, errors: 0, duration: 10.4 },
      { time: '11:05', invocations: 3, errors: 1, duration: 14.8 },
      { time: '11:10', invocations: 2, errors: 0, duration: 11.2 },
      { time: '11:15', invocations: 4, errors: 1, duration: 13.5 },
      { time: '11:20', invocations: 2, errors: 0, duration: 9.8 },
      { time: '11:25', invocations: 5, errors: 2, duration: 16.4 },
      { time: '11:30', invocations: 1, errors: 0, duration: 12.0 },
      { time: '11:35', invocations: 2, errors: 1, duration: 12.9 },
      { time: '11:40', invocations: 2, errors: 0, duration: 11.5 },
    ],
    summary: {
      totalInvocations: 22,
      avgDuration: 12.29,
      totalErrors: 5,
      throttles: 0,
      concurrentExecutions: 2,
    }
  },
  '3h': {
    invocations: [
      { time: '09:00', invocations: 6, errors: 1, duration: 11.2 },
      { time: '09:30', invocations: 14, errors: 2, duration: 13.4 },
      { time: '10:00', invocations: 21, errors: 4, duration: 12.1 },
      { time: '10:30', invocations: 18, errors: 3, duration: 14.5 },
      { time: '11:00', invocations: 22, errors: 5, duration: 12.3 },
      { time: '11:30', invocations: 16, errors: 2, duration: 10.9 },
    ],
    summary: {
      totalInvocations: 97,
      avgDuration: 12.4,
      totalErrors: 17,
      throttles: 0,
      concurrentExecutions: 3,
    }
  },
  '24h': {
    invocations: [
      { time: '12:00', invocations: 45, errors: 6, duration: 12.1 },
      { time: '16:00', invocations: 82, errors: 12, duration: 13.5 },
      { time: '20:00', invocations: 64, errors: 7, duration: 11.8 },
      { time: '00:00', invocations: 18, errors: 1, duration: 9.9 },
      { time: '04:00', invocations: 12, errors: 0, duration: 9.4 },
      { time: '08:00', invocations: 55, errors: 8, duration: 14.0 },
      { time: '11:40', invocations: 97, errors: 17, duration: 12.3 },
    ],
    summary: {
      totalInvocations: 373,
      avgDuration: 12.2,
      totalErrors: 51,
      throttles: 1,
      concurrentExecutions: 4,
    }
  },
  '7d': {
    invocations: [
      { time: 'Oct 09', invocations: 320, errors: 28, duration: 11.8 },
      { time: 'Oct 10', invocations: 410, errors: 34, duration: 12.6 },
      { time: 'Oct 11', invocations: 380, errors: 42, duration: 13.1 },
      { time: 'Oct 12', invocations: 290, errors: 19, duration: 10.7 },
      { time: 'Oct 13', invocations: 450, errors: 51, duration: 12.9 },
      { time: 'Oct 14', invocations: 520, errors: 62, duration: 14.2 },
      { time: 'Oct 15', invocations: 373, errors: 51, duration: 12.2 },
    ],
    summary: {
      totalInvocations: 2743,
      avgDuration: 12.5,
      totalErrors: 287,
      throttles: 3,
      concurrentExecutions: 6,
    }
  }
};

export const RECENT_EXECUTIONS_DEMO = [
  {
    id: 'req-8f4b-01',
    timestamp: '2026-10-15 11:38:12',
    functionName: 'hackathon-monitoring-func',
    status: 'SUCCESS',
    duration: '11.4 ms',
    summary: 'Returned {"result": 30} for input {a: 10, b: 20}',
  },
  {
    id: 'req-8f4b-02',
    timestamp: '2026-10-15 11:35:48',
    functionName: 'hackathon-monitoring-func',
    status: 'ERROR',
    duration: '14.2 ms',
    summary: 'Invalid input: required field "b" is missing',
  },
  {
    id: 'req-8f4b-03',
    timestamp: '2026-10-15 11:32:05',
    functionName: 'hackathon-monitoring-func',
    status: 'SUCCESS',
    duration: '9.8 ms',
    summary: 'Returned {"result": 75} for input {a: 50, b: 25}',
  },
  {
    id: 'req-8f4b-04',
    timestamp: '2026-10-15 11:27:19',
    functionName: 'hackathon-monitoring-func',
    status: 'ERROR',
    duration: '18.1 ms',
    summary: 'KeyError: "b" missing from event payload',
  },
  {
    id: 'req-8f4b-05',
    timestamp: '2026-10-15 11:21:40',
    functionName: 'hackathon-monitoring-func',
    status: 'SUCCESS',
    duration: '13.0 ms',
    summary: 'Returned {"result": 100} for input {a: 40, b: 60}',
  },
  {
    id: 'req-8f4b-06',
    timestamp: '2026-10-15 11:18:22',
    functionName: 'hackathon-monitoring-func',
    status: 'SUCCESS',
    duration: '12.5 ms',
    summary: 'Returned {"result": 5} for input {a: 2, b: 3}',
  }
];
