# k6demo

## Running the test
```
docker-compose up -d grafana influxdb
docker-compose run k6 run /scripts/01-simple/hello_world_test.js
docker-compose run k6 run /scripts/02-stages/stage_test.js
```
