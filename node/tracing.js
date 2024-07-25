// tracing.js
const { MeterProvider } = require('@opentelemetry/sdk-metrics');
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-http');
const { Resource } = require('@opentelemetry/resources');
const {
  SEMRESATTRS_SERVICE_NAME,
} = require('@opentelemetry/semantic-conventions');
const { metrics } = require('@opentelemetry/api');
const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');

// Configure the OTLP exporter
const exporter = new OTLPMetricExporter({
  url: 'http://localhost:4318/v1/metrics',
});

// Create a metric reader
const metricReader = new PeriodicExportingMetricReader({
  exporter: exporter,
  exportIntervalMillis: 1000, // Export metrics every second
});

// Create a meter provider
const meterProvider = new MeterProvider({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: 'example-service',
  }),
});

// Add the metric reader to the meter provider
meterProvider.addMetricReader(metricReader);

// Register the meter provider globally
metrics.setGlobalMeterProvider(meterProvider);

module.exports = { meterProvider };