const { sum_to_n_a, sum_to_n_b, sum_to_n_c } = require("./problem1");

const fs = require("fs");
const path = require("path")

const n = 10;
const expected = 55;

const results = [
  { method: "Loop", result: sum_to_n_a(n), expected },
  { method: "Recursion", result: sum_to_n_b(n), expected },
  { method: "Formula", result: sum_to_n_c(n), expected },
];

// Save test results to a JSON file
const output = JSON.stringify(results, null, 2);
fs.writeFileSync(path.join(__dirname, "test-results.json"), output);

console.log("Test results saved to test-results.json");