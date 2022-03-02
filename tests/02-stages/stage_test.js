import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Rate } from "k6/metrics";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

let ErrorCount = new Counter("errors");
let ErrorRate = new Rate("error_rate");

export let options = {
    stages: [
        // Ramp-up from 1 to 5 VUs in 10s
        { duration: "15s", target: 50 },

        // Stay at rest on 5 VUs for 5s
        { duration: "30s", target: 50 },

        // Ramp-down from 5 to 0 VUs for 5s
        { duration: "15s", target: 0 }
    ],
    thresholds: {
        error_rate: ["rate<0.1"]
    }
};
export default function () {
    const status = Math.random() < 0.95 ? "200" : "500";

    const res = http.get(`https://httpbin.org/status/${status}`);

    let success = check(res, {
        "status is 200": r => r.status === 200
    });

    if (!success) {
        ErrorCount.add(1);
        ErrorRate.add(true);
    } else {
        ErrorRate.add(false);
    }
    sleep(0.5);
}


export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}