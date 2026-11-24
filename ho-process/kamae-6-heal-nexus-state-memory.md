# Heal Nexus — State Memory

_Updated 2026-11-23 after the clean multi-page site went to production._

**STATE-SUMMARY**
- **COMPLETED** — 2026-11-23 the clean multi-page site replaced the hexagon home page in production: Approach (home), About (hexagon window plus bio), Sessions, Relational Vitality (native page, same Jotform), Resources, and a contact form page, in one shell with fade transitions and a phone hamburger menu. The earlier site is kept unchanged under `/archive`, marked noindex; the pre-change state is tagged `v1-hexagon-site`.
- **NEXT** — Andrew and Nancy review the live site; then rework the parked lineage and teacher-photo content (`client/src/components/LineageSection.tsx`) for the About page.
- **ACTION ITEMS / BLOCKS** — The rebuilt Vitality interest form has not been submitted end to end (field names and endpoint are tested; no test entry was sent). Jotform notification delivery to Nancy's inbox remains unverified. Open copy question: whether removing Rosita Arvigo also covers the Maya healing line in the parked lineage text. Community dates, location, and pricing remain undecided. The archived Resources page still carries the password gate and `functions/api/auth.ts`. `client/src/lib/queryClient.ts` still fails `tsc` (pre-existing). Untracked `assets/card.ai`, `tools/`, `.impeccable/` are not part of the site. No README.
- **PROJECT LIFECYCLE** — production

## The clean site (2026-11-23)

- Routes: `/` (Approach), `/about`, `/sessions`, `/vitality`, `/resources`, `/contact` — all in `client/src/pages/CleanSite.tsx`, inside `client/src/components/SiteShell.tsx`, styled by `client/src/styles/site.css` (tokens and measurements taken from the first Vitality page). `App.tsx` mounts them through one regex route so the shell stays mounted between pages.
- Menu order, decided by Andrew: Approach | About | Sessions | Relational Vitality | Resources. Alone Together (https://alonetogethercommunity.org/) is a footer link, not a menu item. The tagline "human.being." is the home headline and sits in every footer.
- About: `client/src/components/HexWindow.tsx` holds the original water, tint, hexagon, and panel in an inset window. The background values listed under "Preserve these site decisions" still apply there.
- Decided against: section scroll-snapping (tried, felt wrong, removed); embedding the long contact Jotform on the home page (it lives on `/contact`).
- Archive: `/archive`, `/archive/offerings`, `/archive/about`, `/archive/sessions`, `/archive/resources`, `/archive/vitality/` (the static exported page, moved to `client/public/archive/vitality/index.html`). `Layout2.tsx` links stay inside the archive. `client/public/_headers` marks `/archive*` noindex; `/offerings` redirects to the archive; `/relational` still redirects to `/vitality`.
- Deployment: the Cloudflare Pages project `nancyturnquist` (account "Sageframe") builds from GitHub. A push to `main` is production; any other branch gets a preview URL. `wrangler` needs `CLOUDFLARE_ACCOUNT_ID` set to that account because the login sees several.
- Tests: `npx playwright test` builds and runs `tests/home-layout.spec.ts` (hexagon home, now at `/archive`) and `tests/clean-site.spec.ts` (new pages, menu, phone menu, form wiring).

## Resume here

- Repo: `/Users/atmarcus/Vaults/sageframe-dharma/heal-nexus` (GitHub `sageframe-dharma/heal-nexus`). Branch `main`; inspected HEAD `5a33098` on 2026-11-23. Later work includes October 26 phone-panel sizing (`458b0e7`) and November keisaku metadata. Do not roll back to the October 10 commits.
- Engagement K6: `/Users/atmarcus/Vaults/blueprint/nancy/vault/ho-process/kamae-6-nancy-state-memory.md`. It holds community scope and copy-draft pointers; this file owns site implementation state.
- Live: https://nancyturnquist.com/ and https://www.nancyturnquist.com/. Vitality: https://nancyturnquist.com/vitality/; `/relational`, `/relational/`, and `/relational/index.html` redirect to it. November 23 HTTP checks returned 200 for both main hosts and Vitality, and followed the old route to Vitality.
- Stack: Vite/React, with `functions/api/auth.ts` for resource password checking. `npm run build` writes `dist/public`; Cloudflare Pages project is `nancyturnquist`. Use the existing project and deployment pattern, not a new hosting project. No deployment was made during this handoff.

## Vitality page and form (the archived static page; the live page is the native one above)

- Source: `/Users/atmarcus/Vaults/sageframe-dharma/heal-nexus/client/public/vitality/index.html`; routes in `/Users/atmarcus/Vaults/sageframe-dharma/heal-nexus/client/public/_redirects`.
- The static page is an exported visualization with HTML encoded inside an iframe’s `data-srcdoc`. Changes to inner content must preserve escaping, CSP, and sandbox permissions. The outer frame resizes to the page’s height.
- Upper-left mandala uses the existing favicon asset embedded as data; the home link navigates the top window. Section links use the visualization’s `scroll-to` message channel to scroll the parent window. Do not restore the removed inner `scrollIntoView` handler: it intercepted the links without moving the browser window. Desktop navigation, mobile interest link, and hero CTA were browser-tested on October 10.
- Footer: “human.being.” is inline, 14px, weight 500, purple accent; the following sentence is italic. Keep it subtle and on the same line where width permits, wrapping naturally on phones. Andrew rejected the earlier 28px display treatment and separate line.
- Form ID `262824796754170`; normal POST endpoint `https://submit.jotform.com/submit/262824796754170`, target `_top`. Required email maps to `q2_email`; optional 2,000-character comment maps to `q3_comments`. Hidden form ID, spam field, and `simple_spc` follow Jotform’s source-code form pattern. Sandbox allows forms and user-initiated top navigation; both CSP layers allow this form action.
- Account `nancyturnquist`; notifications to `nancyturnquist@gmail.com`, reply-to the submitted email. No visitor autoresponder. Normal form submission triggers notification; API-created submission records do not. Keep the form ID public, never an API key.
- Form: https://form.jotform.com/262824796754170. Edit: https://www.jotform.com/build/262824796754170. Private list/export: https://www.jotform.com/tables/262824796754170.
- Durable notes: `/Users/atmarcus/Vaults/sageframe-dharma/heal-nexus/docs/vitality-form.md`.
- October 10 verification: live form reached Jotform’s confirmation page; API readback confirmed email and comment; the clearly labeled test record was deleted and an uncached read confirmed no remaining test entries. Nancy’s inbox was not inspected, so delivery is not confirmed. Do not submit more test entries without a reason.
- Jotform MCP was not available in the creating session; direct API was used. Temporary credential file was removed. Check current connections if further account work is requested; no credential is stored in these documents.

## Preserve these site decisions

- Main-page background tint `rgba(45, 138, 185, 0.67)`, video visibility 41%. Existing video and playback rate `0.25` must not be changed without a new instruction.
- Social preview title “Nancy Turnquist”; description “human.being. Being human can be hard, being together doesn't have to be.”
- Deeper pages remain `/offerings`, `/about`, `/sessions`, `/resources`. The homepage’s Approach/About/Sessions/Resources navigation switches panels. Do not remove the second layer.
- Community audience is broad, including current students. Proposed monthly rhythm: one remote community gathering plus one in-person skills/practice gathering. Dates, location, and pricing are undecided.

## Unrelated / historical items

- `/Users/atmarcus/Vaults/sageframe-dharma/heal-nexus/tools/tint-preview/` is a local color/video experiment, not a production feature; `assets/card.ai` is also untracked. Review only when asked.
- Earlier sessions saw a pre-existing TypeScript error in `client/src/lib/queryClient.ts` concerning `T | null`; it was not rechecked on November 23. Do not describe current checks as green based on the old successful production builds.
- Reference commits from this conversation: `ffcb871` (Jotform integration; initial large footer treatment), `7c3c910` (working navigation and final subtle inline footer). Those are historical implementation pointers, not the current HEAD.
