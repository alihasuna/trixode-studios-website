# OpenCode Permissions Design

**Goal:** Disable routine manual approval prompts in OpenCode by updating the global config with an allow-all permission rule.

## Context

The current global OpenCode config at `~/.config/opencode/opencode.json` only contains model and provider settings. It does not define any permission behavior.

The installed CLI on this machine does not advertise a `--yolo` flag in `opencode --help`, so the stable, directly verifiable approach is to use the persistent config file.

## Options Considered

1. Catch-all allow rule
2. Explicit allowlist for a few tools
3. Session-only auto-approval mode

## Decision

Use a catch-all allow rule in `~/.config/opencode/opencode.json`.

## Why

This is the smallest change that matches the requested behavior. It preserves the existing model configuration and makes the next OpenCode session start without routine approval prompts.

## Verification

After patching the config:

1. Re-read `~/.config/opencode/opencode.json`
2. Confirm the `permission` block exists
3. Restart OpenCode so the new config is loaded
