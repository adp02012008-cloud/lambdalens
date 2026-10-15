/**
 * Service for testing Lambda Function.
 * Currently returns controlled simulated responses (Frontend Demo Phase).
 * Designed for seamless transition to AWS API Gateway HTTP requests in Phase 2.
 */

export const IS_MOCK_MODE = true;
export const API_GATEWAY_URL = null; // Will be set in Phase 2: e.g., 'https://xyz.execute-api.ap-southeast-2.amazonaws.com/prod/calculate'

/**
 * Validates whether string is valid JSON
 * @param {string} jsonString 
 * @returns {{ isValid: boolean, parsed: any, error: string|null }}
 */
export function validateJsonPayload(jsonString) {
  if (!jsonString || !jsonString.trim()) {
    return { isValid: false, parsed: null, error: 'Payload cannot be empty' };
  }
  try {
    const parsed = JSON.parse(jsonString);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return { isValid: false, parsed: null, error: 'JSON payload must be an object (e.g. {"a": 10, "b": 20})' };
    }
    return { isValid: true, parsed, error: null };
  } catch (err) {
    return { isValid: false, parsed: null, error: err.message };
  }
}

/**
 * Executes function test (Simulated in Phase 1)
 * @param {object} payload - Parsed JSON payload
 * @param {boolean} forceError - When true, triggers controlled error simulation
 * @returns {Promise<{
 *   statusCode: number,
 *   data: any,
 *   duration: number,
 *   status: 'SUCCESS' | 'ERROR',
 *   requestId: string,
 *   memoryUsed: string,
 *   billedDuration: string,
 *   timestamp: string,
 *   isSimulated: boolean
 * }>}
 */
export async function executeFunctionTest(payload, forceError = false) {
  // Simulate network latency (200ms - 450ms)
  const simulatedDelay = 220 + Math.floor(Math.random() * 150);
  await new Promise(resolve => setTimeout(resolve, simulatedDelay));

  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const requestId = 'mock-' + Math.random().toString(36).substring(2, 10) + '-' + Math.random().toString(36).substring(2, 8);
  const simulatedDuration = parseFloat((9.5 + Math.random() * 5.5).toFixed(2));

  // If force error or invalid payload
  if (forceError) {
    return {
      statusCode: 400,
      data: {
        error: "Invalid input: required field is missing"
      },
      duration: simulatedDuration,
      status: 'ERROR',
      requestId,
      memoryUsed: '71 MB',
      billedDuration: Math.ceil(simulatedDuration) + ' ms',
      timestamp,
      isSimulated: true
    };
  }

  // Check required parameters 'a' and 'b' for standard arithmetic function demo
  if (payload.a === undefined || payload.b === undefined) {
    return {
      statusCode: 400,
      data: {
        error: "Invalid input: required field is missing"
      },
      duration: simulatedDuration,
      status: 'ERROR',
      requestId,
      memoryUsed: '70 MB',
      billedDuration: Math.ceil(simulatedDuration) + ' ms',
      timestamp,
      isSimulated: true
    };
  }

  // Type check: numeric validation
  if (typeof payload.a !== 'number' || typeof payload.b !== 'number') {
    return {
      statusCode: 400,
      data: {
        error: "TypeError: attributes 'a' and 'b' must be numbers"
      },
      duration: simulatedDuration,
      status: 'ERROR',
      requestId,
      memoryUsed: '69 MB',
      billedDuration: Math.ceil(simulatedDuration) + ' ms',
      timestamp,
      isSimulated: true
    };
  }

  // Normal successful execution
  const result = payload.a + payload.b;
  return {
    statusCode: 200,
    data: {
      result: result
    },
    duration: simulatedDuration,
    status: 'SUCCESS',
    requestId,
    memoryUsed: '68 MB',
    billedDuration: Math.ceil(simulatedDuration) + ' ms',
    timestamp,
    isSimulated: true
  };
}
