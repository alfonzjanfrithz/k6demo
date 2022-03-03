# k6demo

This is to showcase how grafana and k6 works together. The cloud is much better, but grafana helps a little bit to visualize the test result.

## K6 Installation
https://k6.io/docs/getting-started/installation/

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

It would publish the report in grafana dashboard that we setup earlier

### Docker
The following will run the test
```
docker-compose run k6 run /scripts/01-simple/hello_world_test.js
docker-compose run k6 run /scripts/02-stages/stage_test.js
```

### Windows
If you have trouble running with docker because of firewall policy, we can do the following:
```
set K6_OUT=influxdb=http://localhost:8086/k6
k6 run tests/01-simple/hello_world_test.js
k6 run tests\02-stages\stage_test.js
```
