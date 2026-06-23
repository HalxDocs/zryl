#!/usr/bin/env node
// zryl CLI wrapper for Windows
const { execFileSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const dir = __dirname;
let bin = "zryl-windows-amd64.exe";

const binPath = path.join(dir, bin);
if (!fs.existsSync(binPath)) {
  console.error("zryl: binary not found. Run: npm install -g zryl");
  process.exit(1);
}

try {
  execFileSync(binPath, process.argv.slice(2), { stdio: "inherit" });
} catch (e) {
  process.exit(e.status || 1);
}
