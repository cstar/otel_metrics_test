otel_getting_started
=====

An OTP application

Build
-----

    
    ```
    docker-compose up
    rebar3 get-deps
    rebar3 shell
    
    >metrics:start().
    ```