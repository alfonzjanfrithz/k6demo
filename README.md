# k6demo

This is to showcase how grafana and k6 works together. The cloud is much better, but grafana helps a little bit to visualize the test result.

## Prepare the test
The following command will spin up influxdb and grafana. Grafana will be available in localhost:3000
```
docker-compose up -d grafana influxdb
```
## Create grafana dashboard
* Go to grafana in localhost:3000
* Create a dashboard from the json
  * Use the json in the repository `k6-load-testing-results_rev3.json` 

## Running the Test

The following will run the test
```
docker-compose run k6 run /scripts/01-simple/hello_world_test.js
docker-compose run k6 run /scripts/02-stages/stage_test.js
```
