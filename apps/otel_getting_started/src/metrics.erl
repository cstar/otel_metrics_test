-module(metrics).

-include_lib("opentelemetry_api/include/opentelemetry.hrl").
-include_lib("opentelemetry_api_experimental/include/otel_meter.hrl").
%-include_lib("otel_meter.hrl").
-export([start/0]).

start() ->
    application:ensure_all_started(opentelemetry),
    application:ensure_all_started(opentelemetry_exporter),
    application:ensure_all_started(opentelemetry_experimental),
    application:ensure_all_started(tls_certificate_check),
    application:ensure_all_started(ssl_verify_fun),
    CounterName = m_counter,
    CounterDesc = <<"macro made counter description">>,
    CounterUnit = kb,

    ?create_counter(CounterName, #{description => CounterDesc,
                                             unit => CounterUnit}),

    ?counter_add(CounterName, 5),
    ?counter_add(CounterName, 5),
    ?counter_add(CounterName, 5),
    ?counter_add(CounterName, 5),
    ?counter_add(CounterName, 5),
    ?counter_add(CounterName, 5),
    ?counter_add(CounterName, 5).
