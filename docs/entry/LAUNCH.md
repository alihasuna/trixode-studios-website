# Launching the Two Paths entry page

The public site currently serves `/under-construction` on every route (`proxy.ts`).
Everything below is already built and verified locally; launch is configuration.

1. **Pick the hosts.** Lab stays on this deployment (`www.trixode-studios.com/lab`).
   Creative needs its own host (default assumed: `creative.trixode-studios.com`).
   Point DNS for that host at the `trixode-agency` deployment.
2. **Set environment variables.**
   - This repo (Vercel project for `www`): `NEXT_PUBLIC_CREATIVE_URL=https://<creative host>`.
   - `trixode-agency`: `NEXT_PUBLIC_SITE_URL=https://<creative host>`,
     `NEXT_PUBLIC_STUDIO_URL=https://www.trixode-studios.com` (see its `.env.example`).
3. **Swap the scene image** if a text-free export of the concept exists:
   replace `public/images/entry/two-paths.jpg` (3:2, at least 1536px wide, same
   filename). The current file is the concept render with its baked-in labels
   inpainted out. A wider export (2400px+) helps 4K displays.
4. **Open the gate.** Set `PUBLIC_SITE_OPEN=1` on the `www` deployment and redeploy.
   (Or delete `proxy.ts`, which also removes the `/preview` password gate.)
5. **Verify after deploy.**
   - `/` renders the entry page; hover/keyboard focus dims the other path;
     clicking Lab lands on `/lab` with the short intro; clicking Creative lands on
     the Creative host, which shows "Creative | Lab" in its nav.
   - `/sitemap.xml` lists `/`, `/lab`, `/lab/workflow`, `/lab/contact`;
     `/robots.txt` allows `/`.
   - OG preview for `/` shows the two-paths scene.
   - Lighthouse on `/`: LCP is the scene image (priority + blur placeholder).

## Local end-to-end run

```bash
# terminal 1: Creative
cd trixode-agency && npm run dev -- -p 3400
# terminal 2: entry + Lab, gate bypassed, Creative door pointed at localhost
cd WEBSITE-TRIXODE/main && PREVIEW_BYPASS=1 NEXT_PUBLIC_CREATIVE_URL=http://localhost:3400 npm run dev -- -p 3005
```
