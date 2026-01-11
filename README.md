# zryl

Preserve command executions as shareable artifacts.

zryl is an open-source CLI that captures exactly what happened when you ran a command — the output, the result, and the context it ran in — and turns it into a single, shareable execution artifact.

No screenshots. No copy-paste. No guessing.

---

## Why zryl?

If you’ve ever:
- pasted terminal output into Slack
- sent a screenshot of a failed command
- rerun something just to prove an error
- set up CI just to show a result

…you already know the problem.

zryl gives you a reliable source of truth for command execution.

---

## Usage

```bash
zryl python app.py
zryl npm test
zryl go test ./...

start the repo - Thanks
