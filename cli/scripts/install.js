#!/usr/bin/env node
// Postinstall: download the correct binary if not present
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const https = require("https");

const binDir = path.join(__dirname, "..", "bin");

function getPlatformBinary() {
  const platform = process.platform;
  const arch = process.arch;

  if (platform === "linux" && arch === "x64") return "zryl-linux-amd64";
  if (platform === "linux" && arch === "arm64") return "zryl-linux-arm64";
  if (platform === "darwin" && arch === "x64") return "zryl-darwin-amd64";
  if (platform === "darwin" && arch === "arm64") return "zryl-darwin-arm64";
  if (platform === "win32" && arch === "x64") return "zryl-windows-amd64.exe";

  console.log("zryl: pre-built binary not available for this platform.");
  console.log("Build from source: https://github.com/HalxDocs/zryl");
  process.exit(0);
}

const binary = getPlatformBinary();
const binPath = path.join(binDir, binary);

// If binary already exists, skip
if (fs.existsSync(binPath)) {
  console.log(`zryl: ${binary} already installed`);
  process.exit(0);
}

// If binary was bundled with the npm package (local install), skip download
if (fs.existsSync(path.join(binDir, binary))) {
  process.exit(0);
}

console.log(`zryl: binary not found at ${binary}`);
console.log("If you installed from npm, build from source:");
console.log("  cd cli && npm run build");
