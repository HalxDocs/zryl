# zryl

**No screenshots. Just the real run.**

zryl is an open-source CLI that captures what actually happened when a command ran  
— the output, exit status, and environment — and turns it into a shareable link.

It gives you a single source of truth for:
- what was run
- what it printed
- how it exited
- where it ran

One command. One run. One link.

---

## Example

```bash
zryl run npm test
zryl executes the command, captures the full result, and prints a link you can share:

text
Copy code
[zryl] link: https://zryl.vercel.app/run/ca312ad3...
Why
Terminal output is still shared through screenshots, copy-paste, or CI logs.
zryl preserves the exact execution so there’s no missing context and no ambiguity.

Status
zryl is early-stage and evolving quickly.
Feedback and ideas are welcome.
