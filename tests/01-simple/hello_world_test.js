import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from "k6/metrics";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

let ErrorCount = new Counter("errors");

export const options = {
    vus: 10,
    duration: "15s",
    thresholds: {
        errors: ["count<10"]
    }
};

export default function () {
    const res = http.get('https://httpbin.org/');
    let success = check(res, { 'status was 200': (r) => r.status === 200 });

    if (!success) {
        ErrorCount.add(1);
    }
    sleep(1);
}

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}