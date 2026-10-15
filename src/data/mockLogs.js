/**
 * Mock CloudWatch log entries for hackathon-monitoring-func.
 * Contains INFO, WARN, ERROR, and AWS Lambda lifecycle lines (START, END, REPORT).
 * No real credentials or secrets are included.
 */

export const MOCK_LOG_STREAMS = [
  '2026/10/15/[$LATEST]48a9f8b72e11409ab44c21980a316bdf',
  '2026/10/15/[$LATEST]79c1e0f31a29487bc55d31298b449cef',
  '2026/10/14/[$LATEST]12b8d99c4e51410fa88e40112c993eda'
];

export const MOCK_LOGS = [
  {
    id: 'log-101',
    timestamp: '2026-10-15 11:40:12.812',
    level: 'START',
    requestId: '9e1f409a-281b-4d7a-b9c2-1e9a4401bb22',
    functionName: 'hackathon-monitoring-func',
    message: 'START RequestId: 9e1f409a-281b-4d7a-b9c2-1e9a4401bb22 Version: $LATEST',
    details: 'AWS Lambda execution initialized. Runtime: Python 3.12 (Proposed). Memory: 128 MB.'
  },
  {
    id: 'log-102',
    timestamp: '2026-10-15 11:40:12.815',
    level: 'INFO',
    requestId: '9e1f409a-281b-4d7a-b9c2-1e9a4401bb22',
    functionName: 'hackathon-monitoring-func',
    message: 'Received event payload for calculation: {"a": 10, "b": 20}',
    details: '{\n  "source": "aws.apigateway",\n  "httpMethod": "POST",\n  "path": "/calculate",\n  "body": "{\\"a\\": 10, \\"b\\": 20}",\n  "headers": {\n    "Content-Type": "application/json"\n  }\n}'
  },
  {
    id: 'log-103',
    timestamp: '2026-10-15 11:40:12.822',
    level: 'INFO',
    requestId: '9e1f409a-281b-4d7a-b9c2-1e9a4401bb22',
    functionName: 'hackathon-monitoring-func',
    message: 'Processing calculation: a + b = 30. Operation successful.',
    details: 'Validated parameters a=10 (type=int) and b=20 (type=int). Result calculated in 0.8ms.'
  },
  {
    id: 'log-104',
    timestamp: '2026-10-15 11:40:12.824',
    level: 'END',
    requestId: '9e1f409a-281b-4d7a-b9c2-1e9a4401bb22',
    functionName: 'hackathon-monitoring-func',
    message: 'END RequestId: 9e1f409a-281b-4d7a-b9c2-1e9a4401bb22',
    details: 'Execution handler completed with status code 200.'
  },
  {
    id: 'log-105',
    timestamp: '2026-10-15 11:40:12.825',
    level: 'REPORT',
    requestId: '9e1f409a-281b-4d7a-b9c2-1e9a4401bb22',
    functionName: 'hackathon-monitoring-func',
    message: 'REPORT RequestId: 9e1f409a-281b-4d7a-b9c2-1e9a4401bb22 Duration: 12.29 ms Billed Duration: 13 ms Memory Size: 128 MB Max Memory Used: 68 MB',
    details: 'Init Duration: 0.00 ms (Warm Container)\nDuration: 12.29 ms\nBilled Duration: 13 ms\nMemory Size: 128 MB\nMax Memory Used: 68 MB'
  },
  {
    id: 'log-106',
    timestamp: '2026-10-15 11:35:48.104',
    level: 'START',
    requestId: '4a2d810f-117c-489e-8c31-9a741002ee81',
    functionName: 'hackathon-monitoring-func',
    message: 'START RequestId: 4a2d810f-117c-489e-8c31-9a741002ee81 Version: $LATEST',
    details: 'AWS Lambda execution initialized.'
  },
  {
    id: 'log-107',
    timestamp: '2026-10-15 11:35:48.109',
    level: 'WARN',
    requestId: '4a2d810f-117c-489e-8c31-9a741002ee81',
    functionName: 'hackathon-monitoring-func',
    message: 'Input schema warning: key "b" not found in incoming event body.',
    details: 'Input event keys: ["a"]. Expected keys: ["a", "b"]. Invoking fallback validator.'
  },
  {
    id: 'log-108',
    timestamp: '2026-10-15 11:35:48.114',
    level: 'ERROR',
    requestId: '4a2d810f-117c-489e-8c31-9a741002ee81',
    functionName: 'hackathon-monitoring-func',
    message: 'Invalid input: required field "b" is missing. Raising 400 Bad Request.',
    details: 'Traceback (most recent call last):\n  File "/var/task/lambda_function.py", line 18, in lambda_handler\n    raise ValueError("Invalid input: required field is missing")\nValueError: Invalid input: required field is missing'
  },
  {
    id: 'log-109',
    timestamp: '2026-10-15 11:35:48.118',
    level: 'REPORT',
    requestId: '4a2d810f-117c-489e-8c31-9a741002ee81',
    functionName: 'hackathon-monitoring-func',
    message: 'REPORT RequestId: 4a2d810f-117c-489e-8c31-9a741002ee81 Duration: 14.20 ms Billed Duration: 15 ms Memory Size: 128 MB Max Memory Used: 71 MB',
    details: 'Execution resulted in handled error response. Metric AWS/Lambda Errors incremented.'
  },
  {
    id: 'log-110',
    timestamp: '2026-10-15 11:27:19.450',
    level: 'ERROR',
    requestId: '7c3e190b-558a-442b-9d41-3b841908cc34',
    functionName: 'hackathon-monitoring-func',
    message: 'KeyError: "b" missing from event payload. CloudWatch alarm Hackathon-Error-Alert triggered.',
    details: 'State transition logged: CloudWatch alarm Hackathon-Error-Alert state evaluated to ALARM (Errors > 1).'
  },
  {
    id: 'log-111',
    timestamp: '2026-10-15 11:20:05.120',
    level: 'INFO',
    requestId: '3b1a994c-882e-411a-8e20-7f551829bb01',
    functionName: 'hackathon-monitoring-func',
    message: 'Calculation succeeded: 50 + 25 = 75. Latency: 9.8 ms.',
    details: 'Response dispatched via API Gateway proxy format. HTTP 200 OK.'
  }
];
