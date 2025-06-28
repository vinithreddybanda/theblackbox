// Test script for Black Box Challenge API
const axios = require('axios');

const BASE = 'http://localhost:3000';

async function testAll() {
  await testPost('/data', { type: 'string', value: 'hello' });
  await testGet('/time');
  await testPost('/fizzbuzz', { value: 15 });
  await testPost('/zap', { value: 'test' });
  await testPost('/alpha', { value: 'abc123' });
  await testPost('/glitch', { value: 'glitchme' });
}

async function testPost(endpoint, data) {
  try {
    const res = await axios.post(BASE + endpoint, data);
    console.log(`POST ${endpoint}:`, res.data);
  } catch (e) {
    console.error(`POST ${endpoint} failed:`, e.response?.data || e.message);
  }
}

async function testGet(endpoint) {
  try {
    const res = await axios.get(BASE + endpoint);
    console.log(`GET ${endpoint}:`, res.data);
  } catch (e) {
    console.error(`GET ${endpoint} failed:`, e.response?.data || e.message);
  }
}

testAll();
