---
name: manbun-help
description: >
  Quick-reference card for all manbun modes, skills, and commands.
  One-shot display, not a persistent mode. Trigger: /manbun-help,
  "manbun help", "what manbun commands", "how do I use manbun".
---

# Manbun Help

Display this reference card when invoked. One-shot, do NOT change mode,
write flag files, or persist anything.

## Levels

| Level | Trigger | What change |
|-------|---------|-------------|
| **Lite** | `/manbun lite` | Build what's asked, name the lazier alternative in one line. |
| **Full** | `/manbun` | The ladder enforced: YAGNI → stdlib → native → one line → minimum. Default. |
| **Ultra** | `/manbun ultra` | YAGNI extremist. Deletion before addition. Challenges requirements before building. |

Level sticks until changed or session end.

## Skills

| Skill | Trigger | What it does |
|-------|---------|--------------|
| **manbun** | `/manbun` | Lazy mode itself. Simplest solution that works. |
| **manbun-review** | `/manbun-review` | Over-engineering review: `L42: yagni: factory, one product. Inline.` |
| **manbun-audit** | `/manbun-audit` | Whole-repo over-engineering audit: ranked list of what to delete. |
| **manbun-debt** | `/manbun-debt` | Harvest `manbun:` shortcut comments into a tracked ledger. |
| **manbun-gain** | `/manbun-gain` | Measured-impact scoreboard: less code, less cost, more speed. |
| **manbun-help** | `/manbun-help` | This card. |

Codex uses `@manbun`, `@manbun-review`, and `@manbun-help`; Claude Code
and OpenCode use the slash-command forms above (OpenCode ships all six as
slash commands).

## Deactivate

Say "stop manbun" or "normal mode". Resume anytime with `/manbun`.
`/manbun off` also works.

## Configure Default Mode

Default mode = `full`, auto-active every session. Change it:

**Environment variable** (highest priority):
```bash
export MANBUN_DEFAULT_MODE=ultra
```

**Config file** (`~/.config/manbun/config.json`, Windows: `%APPDATA%\manbun\config.json`):
```json
{ "defaultMode": "lite" }
```

Set `"off"` to disable auto-activation on session start, activate manually
with `/manbun` when wanted.

Resolution: env var > config file > `full`.

## Update

Enable auto-update once: open `/plugin`, go to Marketplaces, pick manbun, Enable auto-update. Claude Code then pulls new versions at startup (run `/reload-plugins` when it prompts). Manual refresh: `/plugin marketplace update manbun` then `/reload-plugins`.

If `/plugin` is not recognized, your Claude Code is out of date. Update it (`npm install -g @anthropic-ai/claude-code@latest`, or `brew upgrade claude-code`) and restart. Other hosts use their own update flow.

## More

Full docs + examples: https://github.com/yyg27/ponytail
