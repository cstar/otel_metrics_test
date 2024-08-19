-module(metrics).

-include_lib("opentelemetry_api/include/opentelemetry.hrl").
-include_lib("opentelemetry_api_experimental/include/otel_meter.hrl").
%-include_lib("otel_meter.hrl").
-export([start/0, increase_counter/0]).

start() ->
    CounterName = m_counter,
    CounterDesc = <<"macro made counter description">>,
    CounterUnit = kb,

    ?create_counter(CounterName, #{description => CounterDesc,
                                             unit => CounterUnit}),

    ?counter_add(CounterName, 5).

increase_counter() ->
    CounterName = m_counter,
    ?counter_add(CounterName, 1).