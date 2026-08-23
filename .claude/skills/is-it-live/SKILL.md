---
name: is-it-live
description: Check whether the latest change to the Vantiq website has been published. Use when the user asks "is it live?", "did my change go up?", "why isn't the site showing my edit?", or wants the publish/deploy status.
---

# Check whether the latest change is live

You are likely talking to a **non-technical editor**. Answer in plain English and lead
with the verdict: live, still publishing, never sent, or failed.

The site publishes from the `main` branch on GitHub via the "Deploy to GitHub Pages"
workflow (`deploy.yml`). A change is live only when (a) it was pushed to `main` and
(b) that workflow run finished green. Check both, in this order:

1. **Was the change actually sent?** Run `git fetch`, then check for uncommitted edits
   (`git status`) and unpushed commits (`git log origin/main..main --oneline`). The most
   common confusion is an edit that was saved locally but never published. If that's the
   case, say so — "your change is still only on this computer" — and offer to publish it
   (follow the `update-content` skill from its verify step onward).
2. **Did the publish run finish?**
   ```bash
   gh run list --workflow deploy.yml --branch main --limit 3
   ```
   - `in_progress` / `queued` → "It's publishing right now — takes about 2–3 minutes."
   - `success` → confirm the run's commit matches the user's change, then: "It's live at
     https://vantiq.fictionally.org." If they say they can't see it, walk them through a
     hard refresh: Cmd+Shift+R on Mac, Ctrl+F5 on Windows.
   - `failure` → reassure first: the live site kept the previous version, nothing is
     broken publicly. Then read `gh run view <id> --log-failed`, explain the cause in one
     plain sentence, and offer to fix it.
