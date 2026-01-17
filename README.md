# zryl

**No screenshots. Just the real run.**

zryl is an open-source CLI that captures what *actually* happened when a command ran —  
the output, exit status, and environment — and turns it into a single, shareable link.

**One command. One run. One link.**

---

## Why zryl?

If you’ve ever:
- copied terminal output into Slack
- taken screenshots of errors
- pasted logs that lost context
- rerun commands just to “prove” something failed

…you already know the problem.

zryl preserves the **exact execution** so others can see *what really happened*.

---

## Install

### macOS (Apple Silicon)
```bash
curl -L https://github.com/HalxDocs/zryl/releases/latest/download/zryl-darwin-arm64 \
  -o /usr/local/bin/zryl && chmod +x /usr/local/bin/zryl
macOS (Intel)
bash
Copy code
curl -L https://github.com/HalxDocs/zryl/releases/latest/download/zryl-darwin-amd64 \
  -o /usr/local/bin/zryl && chmod +x /usr/local/bin/zryl
Linux
bash
Copy code
curl -L https://github.com/HalxDocs/zryl/releases/latest/download/zryl-linux-amd64 \
  -o /usr/local/bin/zryl && chmod +x /usr/local/bin/zryl
Windows
Download zryl-windows-amd64.exe from Releases

Rename it to zryl.exe

*Add it to your PATH*

---

## Usage
bash
Copy code
zryl run npm test
zryl run go version
zryl run "echo hello && echo world"
After the command finishes, zryl prints a link you can share:

text
Copy code
[zryl] link: https://zryl.vercel.app/run/ca312ad3...
Anyone with the link can view:

stdout & stderr

exit code

runtime metadata (OS, arch, cwd, duration)

How it works
zryl sits between you and your shell.

When you run a command, zryl:

lua
Copy code
┌──────────────┐
│   Your CLI   │
└──────┬───────┘
       │  zryl run <command>
       ▼
┌──────────────┐
│   zryl CLI   │
│──────────────│
│ • executes   │
│   the command│
│ • captures   │
│   stdout     │
│ • captures   │
│   stderr     │
│ • records    │
│   exit code  │
│ • records    │
│   environment│
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Artifact   │
│──────────────│
│ • exact output│
│ • metadata    │
│ • timestamps  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Shareable URL│
└──────────────┘
The result is a single execution artifact that shows:

what command ran

what it printed

how it exited

where and how it ran

No screenshots. No copy-paste. No missing context.

Just the truth of the run.

Flags
bash
Copy code
zryl run --no-upload <command>
Run locally without uploading.

bash
Copy code
zryl run --json <command>
Print the captured run as JSON.

What gets captured
Full stdout

Full stderr

Exit code

Start & finish timestamps

Duration

OS & architecture

Working directory

Nothing is hidden. Nothing is inferred.

Status
zryl is early-stage and evolving quickly.

This first release focuses on:

correctness

cross-platform support

simple sharing

Expect breaking changes while things solidify.

Roadmap (rough)
Public vs private runs

Replay command button

Expiring / pinned runs

GitHub authentication

Team & organization runs

Contributing
Issues, feedback, and ideas are welcome.
PRs are appreciated, especially around DX and Windows support.
