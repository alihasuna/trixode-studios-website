# OpenCode Permissions Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update the global OpenCode config so new sessions default to allow-all permissions without changing model/provider settings.

**Architecture:** Make one minimal edit to the existing JSON config, adding a top-level `permission` block while leaving the current OpenAI model configuration intact. Verify by reading the file back after the edit.

**Tech Stack:** OpenCode global config JSON.

---

### Task 1: Update global config

**Files:**
- Modify: `~/.config/opencode/opencode.json`

**Step 1: Add the permission block**

Add a top-level JSON property:

```json
"permission": {
  "*": "allow"
}
```

**Step 2: Preserve the existing model settings**

Do not change:

```json
"model": "openai/gpt-5.4"
```

or the existing provider options.

**Step 3: Verify the config**

Read `~/.config/opencode/opencode.json` and confirm it contains both the original model/provider settings and the new permission block.
