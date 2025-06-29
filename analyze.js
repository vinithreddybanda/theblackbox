const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

const tests = [
  // More string test cases for each endpoint
  // --- /alpha extensive patterns ---
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: '123abc' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc123def' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'ABC123def' } },
  { endpoint: '/alpha', method: 'post', payload: { data: '123ABC' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abcDEF123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: '1A2B3C' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'test' } },
  { endpoint: '/alpha', method: 'post', payload: { data: '' } },
  { endpoint: '/alpha', method: 'post', payload: { data: '123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'hello world' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'ALPHA' } },
  { endpoint: '/alpha', method: 'post', payload: { data: '!@#$%^&*()' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc 123 !@#' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abcdef' } },
  { endpoint: '/alpha', method: 'post', payload: { data: '987654' } },
  { endpoint: '/alpha', method: 'post', payload: { data: '   ' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc!@#' } },
  { endpoint: '/alpha', method: 'post', payload: { data: '!@#' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc 123' } },
  // More patterns
  { endpoint: '/alpha', method: 'post', payload: { data: 'A1B2C3' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'aBcDeF' } },
  { endpoint: '/alpha', method: 'post', payload: { data: '123abcDEF' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc_123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc-123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc.123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc,123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc@123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc#123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc$123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc%123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc^123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc&123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc*123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc(123)' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc[123]' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc{123}' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc|123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc:123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc;123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc"123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: "abc'123" } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc<123>' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc/123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc\\123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc`123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc~123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc=123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc+123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc?123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc!123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc  123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: '  abc123  ' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc\n123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc\t123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc\r123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc\f123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc\v123' } },
  { endpoint: '/alpha', method: 'post', payload: { data: 'abc\b123' } },

  { endpoint: '/glitch', method: 'post', payload: { data: 'glitch' } },
  { endpoint: '/glitch', method: 'post', payload: { data: '123glitch' } }, // numbers in front
  { endpoint: '/glitch', method: 'post', payload: { data: 'gl123itch' } }, // numbers in middle
  { endpoint: '/glitch', method: 'post', payload: { data: 'GLITCH123' } }, // caps and numbers at end
  { endpoint: '/glitch', method: 'post', payload: { data: '123GLITCH' } }, // numbers front, caps
  { endpoint: '/glitch', method: 'post', payload: { data: 'g1l2i3t4c5h6' } }, // alternating
  { endpoint: '/glitch', method: 'post', payload: { data: '' } },
  { endpoint: '/glitch', method: 'post', payload: { data: 'abcdef' } },
  { endpoint: '/glitch', method: 'post', payload: { data: '123456' } },
  { endpoint: '/glitch', method: 'post', payload: { data: 'GLITCH' } },
  { endpoint: '/glitch', method: 'post', payload: { data: 'gl!tch' } },
  { endpoint: '/glitch', method: 'post', payload: { data: 'abc 123 !@#' } }, // mixed
  { endpoint: '/glitch', method: 'post', payload: { data: 'abcdef' } }, // alpha only
  { endpoint: '/glitch', method: 'post', payload: { data: '987654' } }, // digits only
  { endpoint: '/glitch', method: 'post', payload: { data: '   ' } }, // spaces only
  { endpoint: '/glitch', method: 'post', payload: { data: 'abc!@#' } }, // alpha+symbols
  { endpoint: '/glitch', method: 'post', payload: { data: '!@#' } }, // symbols only
  { endpoint: '/glitch', method: 'post', payload: { data: 'abc 123' } }, // alpha+digits+space

  { endpoint: '/zap', method: 'post', payload: { data: 'zap' } },
  { endpoint: '/zap', method: 'post', payload: { data: '123zap' } }, // numbers in front
  { endpoint: '/zap', method: 'post', payload: { data: 'za123p' } }, // numbers in middle
  { endpoint: '/zap', method: 'post', payload: { data: 'ZAP123' } }, // caps and numbers at end
  { endpoint: '/zap', method: 'post', payload: { data: '123ZAP' } }, // numbers front, caps
  { endpoint: '/zap', method: 'post', payload: { data: 'z1a2p3' } }, // alternating
  { endpoint: '/zap', method: 'post', payload: { data: 'ZAP' } },
  { endpoint: '/zap', method: 'post', payload: { data: '123' } },
  { endpoint: '/zap', method: 'post', payload: { data: 'hello' } },
  { endpoint: '/zap', method: 'post', payload: { data: '!zap!' } },
  { endpoint: '/zap', method: 'post', payload: { data: 'abc 123 !@#' } }, // mixed
  { endpoint: '/zap', method: 'post', payload: { data: 'abcdef' } }, // alpha only
  { endpoint: '/zap', method: 'post', payload: { data: '987654' } }, // digits only
  { endpoint: '/zap', method: 'post', payload: { data: '   ' } }, // spaces only
  { endpoint: '/zap', method: 'post', payload: { data: 'abc!@#' } }, // alpha+symbols
  { endpoint: '/zap', method: 'post', payload: { data: '!@#' } }, // symbols only
  { endpoint: '/zap', method: 'post', payload: { data: 'abc 123' } }, // alpha+digits+space

  { endpoint: '/data', method: 'post', payload: { data: 'abc123' } },
  { endpoint: '/data', method: 'post', payload: { data: '123abc' } }, // numbers in front
  { endpoint: '/data', method: 'post', payload: { data: 'abc123def' } }, // numbers in middle
  { endpoint: '/data', method: 'post', payload: { data: 'ABC123def' } }, // caps and numbers
  { endpoint: '/data', method: 'post', payload: { data: '123ABC' } }, // numbers front, caps
  { endpoint: '/data', method: 'post', payload: { data: 'abcDEF123' } }, // numbers at end, caps
  { endpoint: '/data', method: 'post', payload: { data: '1A2B3C' } }, // alternating
  { endpoint: '/data', method: 'post', payload: { data: 'xyz' } },
  { endpoint: '/data', method: 'post', payload: { data: 'data' } },
  { endpoint: '/data', method: 'post', payload: { data: 'DATA' } },
  { endpoint: '/data', method: 'post', payload: { data: '123456' } },
  { endpoint: '/data', method: 'post', payload: { data: 'abc 123 !@#' } }, // mixed
  { endpoint: '/data', method: 'post', payload: { data: 'abcdef' } }, // alpha only
  { endpoint: '/data', method: 'post', payload: { data: '987654' } }, // digits only
  { endpoint: '/data', method: 'post', payload: { data: '   ' } }, // spaces only
  { endpoint: '/data', method: 'post', payload: { data: 'abc!@#' } }, // alpha+symbols
  { endpoint: '/data', method: 'post', payload: { data: '!@#' } }, // symbols only
  { endpoint: '/data', method: 'post', payload: { data: 'abc 123' } }, // alpha+digits+space

  // Minimal string-based fizzbuzz test (optional, can remove if you want zero)
  { endpoint: '/fizzbuzz', method: 'post', payload: { data: '15' } },

  // Array-based fizzbuzz tests
  { endpoint: '/fizzbuzz', method: 'post', payload: [3, 5, 15] },
  { endpoint: '/fizzbuzz', method: 'post', payload: [1, 2, 3, 4, 5] },
  { endpoint: '/fizzbuzz', method: 'post', payload: [15, 30, 45, 60] },
  { endpoint: '/fizzbuzz', method: 'post', payload: [0, -3, -5, -15] },
  { endpoint: '/fizzbuzz', method: 'post', payload: [100, 101, 102] },
  { endpoint: '/fizzbuzz', method: 'post', payload: [] },
  { endpoint: '/fizzbuzz', method: 'post', payload: ['fizz', 'buzz', 'fizzbuzz'] },
  { endpoint: '/fizzbuzz', method: 'post', payload: [null, 15, '15', true, false] },
  { endpoint: '/fizzbuzz', method: 'post', payload: [[3,5], [15,30]] },
  { endpoint: '/fizzbuzz', method: 'post', payload: [3.0, 5.0, 15.0] },
  { endpoint: '/fizzbuzz', method: 'post', payload: [NaN, Infinity, -Infinity] },

  // Only /time as GET
  { endpoint: '/time', method: 'get' }
];

async function runTests() {
  for (const test of tests) {
    try {
      let res;
      if (test.method === 'post') {
        res = await axios.post(BASE_URL + test.endpoint, test.payload);
      } else {
        res = await axios.get(BASE_URL + test.endpoint);
      }
      console.log(`\n[${test.method.toUpperCase()}] ${test.endpoint}`);
      if (test.payload !== undefined) console.log('Payload:', test.payload);
      console.log('Response:', res.data);
    } catch (err) {
      console.log(`\n[${test.method.toUpperCase()}] ${test.endpoint}`);
      if (test.payload !== undefined) console.log('Payload:', test.payload);
      if (err.response) {
        console.log('Error Response:', err.response.data);
      } else {
        console.log('Error:', err.message);
      }
    }
  }
}

runTests();
