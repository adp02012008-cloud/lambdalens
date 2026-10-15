/**
 * Initial mock test history records.
 * Stored in browser localStorage under 'lambdawatch_test_history'.
 */

export const INITIAL_TEST_HISTORY = [
  {
    testId: 'test-91a4b',
    timestamp: '2026-10-15 11:38:12',
    input: { a: 10, b: 20 },
    output: { result: 30 },
    status: 'SUCCESS',
    duration: 11.4,
    statusCode: 200,
    requestId: '9e1f409a-281b-4d7a-b9c2-1e9a4401bb22'
  },
  {
    testId: 'test-83f1c',
    timestamp: '2026-10-15 11:35:48',
    input: { a: 15 },
    output: { error: 'Invalid input: required field is missing' },
    status: 'ERROR',
    duration: 14.2,
    statusCode: 400,
    requestId: '4a2d810f-117c-489e-8c31-9a741002ee81'
  },
  {
    testId: 'test-75e2d',
    timestamp: '2026-10-15 11:32:05',
    input: { a: 50, b: 25 },
    output: { result: 75 },
    status: 'SUCCESS',
    duration: 9.8,
    statusCode: 200,
    requestId: '3b1a994c-882e-411a-8e20-7f551829bb01'
  },
  {
    testId: 'test-62c9a',
    timestamp: '2026-10-15 11:27:19',
    input: { a: 'invalid', b: 40 },
    output: { error: 'TypeError: parameters a and b must be integers or floats' },
    status: 'ERROR',
    duration: 18.1,
    statusCode: 400,
    requestId: '7c3e190b-558a-442b-9d41-3b841908cc34'
  },
  {
    testId: 'test-51b8f',
    timestamp: '2026-10-15 11:21:40',
    input: { a: 40, b: 60 },
    output: { result: 100 },
    status: 'SUCCESS',
    duration: 13.0,
    statusCode: 200,
    requestId: '1f8d447a-921c-4b55-89c0-5a339912aa11'
  }
];
