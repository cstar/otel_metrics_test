// app.js
const express = require('express');
const { meterProvider } = require('./tracing');

const app = express();
const port = 3000;

// Get the global meter
const meter = meterProvider.getMeter('example-meter');

// Create a counter metric
const requestCount = meter.createCounter('requests', {
  description: 'Count all incoming requests',
});

// Middleware to count incoming requests
app.use((req, res, next) => {
  requestCount.add(1, { route: req.path });
  next();
});

// Example route
app.get('/', (req, res) => {
  res.send('Hello, OpenTelemetry Metrics!');
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
