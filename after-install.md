# Manbun for Hermes installed

Enable it if you did not install with `--enable`:

```bash
hermes plugins enable manbun
```

Restart Hermes or the gateway after enabling.

In shared gateways, restrict `/manbun` to trusted users with Hermes slash-command access controls; runtime mode is process-local.

Commands:

- `/manbun [lite|full|ultra|off]`
- `/manbun-review [target]`
- `/manbun-audit [target]`
- `/manbun-debt`
- `/manbun-gain`
- `/manbun-help`

Bundled skills are available as `manbun:manbun`, `manbun:manbun-review`, `manbun:manbun-audit`, `manbun:manbun-debt`, `manbun:manbun-gain`, and `manbun:manbun-help`.
