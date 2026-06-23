#!/usr/bin/env node
// Cross-compile CLI binaries for all platforms
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const targets = [
  { goos: "linux", goarch: "amd64", out: "zryl-linux-amd64" },
  { goos: "linux", goarch: "arm64", out: "zryl-linux-arm64" },
  { goos: "darwin", goarch: "amd64", out: "zryl-darwin-amd64" },
  { goos: "darwin", goarch: "arm64", out: "zryl-darwin-arm64" },
  { goos: "windows", goarch: "amd64", out: "zryl-windows-amd64.exe" },
];

const binDir = path.join(__dirname, "..", "bin");

console.log("Building zryl CLI binaries...\n");

for (const t of targets) {
  const outPath = path.join(binDir, t.out);
  console.log(`  ${t.goos}/${t.goarch} → ${t.out}`);

  execSync(
    `go build -o "${outPath}" ./cmd/zryl`,
    {
      cwd: path.join(__dirname, ".."),
      env: { ...process.env, GOOS: t.goos, GOARCH: t.goarch },
      stdio: "inherit",
    }
  );
}

// Make Unix binaries executable
for (const t of targets) {
  if (!t.out.endsWith(".exe")) {
    const p = path.join(binDir, t.out);
    fs.chmodSync(p, 0o755);
  }
}

console.log("\nDone! All binaries built in cli/bin/");
