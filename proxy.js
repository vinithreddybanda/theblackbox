const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
app.use(express.text({ type: ['text/*', 'application/x-www-form-urlencoded'] }));

const BASE_URL = 'https://us-central1-blackbox-cosc.cloudfunctions.net';

// Log all requests and responses for reverse engineering
app.use((req, res, next) => {
  const start = Date.now();
  const { method, url, body, headers } = req;
  console.log(`\n[Request] ${method} ${url}`);
  if (Object.keys(body || {}).length) console.log('Body:', body);
  console.log('Headers:', headers);
  // Capture the original send method
  const originalJson = res.json;
  res.json = function (data) {
    const duration = Date.now() - start;
    console.log(`[Response] ${method} ${url} (${duration}ms)`);
    console.log('Status:', res.statusCode);
    console.log('Data:', data);
    return originalJson.call(this, data);
  };
  next();
});

function filterHeaders(headers) {
  // Remove 'host' and 'connection' headers for proxying
  const { host, connection, ...rest } = headers;
  // Add browser-like headers if not present
  return {
    ...rest,
    'origin': rest.origin || 'https://blackbox-interface.vercel.app',
    'referer': rest.referer || 'https://blackbox-interface.vercel.app/',
    'user-agent': rest['user-agent'] || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0'
  };
}

// Proxy POST /glitch
app.post('/glitch', async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/glitch`, req.body, { headers: filterHeaders(req.headers) });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: err.message });
  }
});

// Proxy GET /glitch
app.get('/glitch', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/glitch`, { headers: filterHeaders(req.headers) });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: err.message });
  }
});

// Proxy POST /alpha
app.post('/alpha', async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/alpha`, req.body, { headers: filterHeaders(req.headers) });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: err.message });
  }
});

// Proxy GET /alpha
app.get('/alpha', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/alpha`, { headers: filterHeaders(req.headers) });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: err.message });
  }
});

// Proxy POST /zap
app.post('/zap', async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/zap`, req.body, { headers: filterHeaders(req.headers) });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: err.message });
  }
});

// Proxy GET /zap
app.get('/zap', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/zap`, { headers: filterHeaders(req.headers) });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: err.message });
  }
});

// Proxy POST /data
app.post('/data', async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/data`, req.body, { headers: filterHeaders(req.headers) });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: err.message });
  }
});

// Proxy GET /data
app.get('/data', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/data`, { headers: filterHeaders(req.headers) });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: err.message });
  }
});

// Proxy POST /fizzbuzz
app.post('/fizzbuzz', async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/fizzbuzz`, req.body, { headers: filterHeaders(req.headers) });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: err.message });
  }
});

// Proxy GET /fizzbuzz
app.get('/fizzbuzz', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/fizzbuzz`, { headers: filterHeaders(req.headers) });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: err.message });
  }
});

// Proxy GET /time
app.get('/time', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/time`, { headers: filterHeaders(req.headers) });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
