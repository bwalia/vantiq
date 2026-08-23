---
name: undo-last-change
description: Undo a recent Vantiq website content change and republish the previous wording. Use when the user says "undo that", "revert", "put it back how it was", "that change was wrong", or wants an earlier version of the text back.
---

# Undo a website change and republish

You are likely talking to a **non-technical editor**. Plain English, lead with what you
are about to put back.

## Steps

1. Find what to undo. Look at the recent history:
   ```bash
   git log --oneline -10 -- src/lib/content.ts src/lib/site.ts
   ```
   Show the user the recent changes as plain descriptions ("Yesterday: pricing wording
   changed", not commit hashes) and confirm which one they want undone — unless they just
   made a single change in this conversation, in which case it's obvious.
2. Show them exactly what will be restored: the old wording → back to → the wording before
   it. Get a clear yes before republishing.
3. Undo it **without rewriting history**:
   - Change not yet pushed → restore the file (`git checkout` / edit it back) or
     `git reset --soft` the local commit.
   - Change already published → `git revert <sha> --no-edit`. **Never** use
     `git reset --hard` on pushed commits and never force-push.
4. Verify before publishing, same as any content change: `npm ci` if `node_modules/` is
   missing, then `npm run lint` and `npm run build:static` must both pass.
5. Push to `main`, then watch the publish run (`gh run list --workflow deploy.yml
   --branch main --limit 1`, then `gh run watch <id> --exit-status`) — about 2–3 minutes.
6. Confirm the old wording is back at https://vantiq.fictionally.org and remind them to
   hard-refresh: Cmd+Shift+R on Mac, Ctrl+F5 on Windows.
