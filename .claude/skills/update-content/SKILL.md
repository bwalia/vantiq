---
name: update-content
description: Change any text on the Vantiq website and publish it live — wording, prices, headings, bullet points, contact details. Use whenever the user asks in plain English to change, add, remove, or reword content on the site, e.g. "change the recommended ad spend", "update the phone number", "reword the hero". Handles the whole flow, edit → verify → commit → push to main → watch the deploy until the change is live.
---

# Update website content and publish it

You are likely talking to a **non-technical editor**. Speak plain English throughout: no
jargon, no command output dumps, no git terminology. Say "publishing" not "deploying",
"saved" not "committed". Explain what is happening at each step in one short sentence.

The site republishes itself automatically when a change lands on the `main` branch
(`.github/workflows/deploy.yml` → GitHub Pages). Your job is to make the edit safely,
verify it, push it, and watch until it is actually live.

## Where the words live

| Content | File |
| --- | --- |
| All page copy — headings, sentences, prices, bullets, button labels | `src/lib/content.ts` |
| Contact email, phone, company number, menu labels | `src/lib/site.ts` |

Find the text by searching for a phrase the user can see on the website. If more than one
place matches, quote the candidates and ask which one they mean.

## Hard rules

1. **Edit only the text between the quotation marks** (string values). Never restructure
   the objects, rename keys, or touch anything outside a string. If the request needs a
   structural or layout change (new section, reordering, styling), that is not a content
   update — follow `AGENTS.md` (read the relevant guide in `node_modules/next/dist/docs/`
   first) and tell the user this is a bigger change before proceeding.
2. **Never invent statistics, outcomes, client names or credentials.** The rule at the top
   of `content.ts` is binding: every claim must come from the source proposal PDF or from
   the user explicitly. The `founders.together.figure` placeholder `[00]` must never be
   replaced with an estimate — only a number the user supplies.
3. If the user gave exact wording, use it verbatim. If you composed the wording yourself,
   show the before → after and get their OK **before** publishing.

## Steps

1. Make the edit in the right file.
2. If `node_modules/` is missing, run `npm ci` first (tell the user: "setting up, takes a
   minute — one-time thing").
3. Verify the same way the publisher will: `npm run lint`, then `npm run build:static`.
   Both must pass. If one fails, fix your edit or restore the file — **never push a
   failing change**.
4. Show the user the change in plain English (old wording → new wording).
5. Commit just the edited file(s) with a short plain-English message, e.g.
   `Update recommended ad spend wording`, and push to `main`. If the push is rejected
   because the branch moved, `git pull --rebase` and push again.
6. Watch the publish run:
   ```bash
   gh run list --workflow deploy.yml --branch main --limit 1 --json databaseId --jq '.[0].databaseId'
   gh run watch <that-id> --exit-status
   ```
   Tell the user it takes about 2–3 minutes.
7. **On success**: tell them it is live at https://vantiq.fictionally.org and that if they
   don't see it, they should hard-refresh — Cmd+Shift+R on Mac, Ctrl+F5 on Windows.
8. **On failure**: first reassure them — a failed publish means the live site is
   *unchanged*, nothing is broken publicly. Then read `gh run view <id> --log-failed`,
   fix the cause, and push again. Never leave `main` in a state where the publish fails.
