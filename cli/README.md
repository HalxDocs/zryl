# @halxdocs/zryl

Run commands and share the output. An open-source CLI that captures what happened when a command ran — the output, the result, and the context — and gives you a link to share it.

## Install

```bash
npm install -g @halxdocs/zryl
```

Or via shell (macOS/Linux):

```bash
curl -fsSL https://zryl.vercel.app/install.sh | sh
```

## Usage

```bash
zryl run <command>
```

That's it. zryl runs your command, captures everything, and prints a shareable link.

```bash
$ zryl run npm test

 PASS  src/utils.test.ts
 PASS  src/api.test.ts
 ✓ 12 tests passed

[zryl] link: https://zryl.vercel.app/run/ca312ad3-...
```

## Flags

| Flag | Description |
|------|-------------|
| `--public` | Mark run as public (default) |
| `--private` | Mark run as private |
| `--no-upload` | Skip uploading, just run locally |
| `--json` | Output the run as JSON |

## Examples

```bash
# Share test output with your team
zryl run npm test

# Capture a build with full context
zryl run --json go build ./...

# Run locally without uploading
zryl run --no-upload echo "hello"

# Keep it private
zryl run --private deploy.sh
```

## What gets captured

- **stdout & stderr** — full output, line by line
- **exit code** — did it succeed or fail
- **environment** — OS, architecture, working directory
- **timing** — start time, end time, duration
- **link** — one URL to share the complete run

## How it works

```bash
zryl run <command>
```

1. zryl executes your command in a shell
2. Captures stdout, stderr, exit code, and metadata
3. Uploads the run to [zryl.vercel.app](https://zryl.vercel.app)
4. Prints a shareable link

## Links

- **Dashboard:** [zryl.vercel.app](https://zryl.vercel.app)
- **GitHub:** [github.com/HalxDocs/zryl](https://github.com/HalxDocs/zryl)
- **Issues:** [github.com/HalxDocs/zryl/issues](https://github.com/HalxDocs/zryl/issues)

## License

MIT
