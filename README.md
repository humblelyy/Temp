# HUMBL Wallpapers — Prototype V3

A premium still and live wallpaper platform for the HUMBLE brand. Next.js 15 + TypeScript. **Prototype — not production-ready.**

## Run
```bash
npm install && npm run dev        # http://localhost:3000
# or with Docker (Alloy):
docker compose -f docker-compose.alloy.yaml up -d
```

## Features in this prototype
- Cinematic intro with skip (once per session, disabled with reduced motion)
- Floating Liquid Glass capsule nav with spring indicator (bottom bar on mobile)
- Search (title/tags), filters (still/live, device, category), sort, favorites (localStorage)
- Skeleton loading while `/api/wallpapers` resolves, staggered reveals, hero parallax
- Detail modal with resolution, format, size, devices, compatibility
- Admin demo: stats, upload with type/size/file-signature checks, publish toggle, delete (session-only)
- Cookie preferences, About, Contact, Privacy, Terms, Copyright, Accessibility, Cookie policy, 404, sitemap.xml, robots.txt, llms.txt

## Environment variables
| Name | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Absolute base URL used in `sitemap.xml` (optional) |

## Known limitations
- Brand assets (`humbl-wallpapers-logo.png`, `humbl-main-logo.png`, `no-image-available.jpg`) were not supplied; SVG placeholders are in `public/assets/`.
- Wallpaper imagery is placeholder photography from picsum.photos.
- No backend: no private storage, signed downloads, admin auth, rate limiting or ad verification. Download is disabled.
- Contact form does not send messages.

## Changelog
- **V3** — iOS 26 Liquid Glass pass (guided by the `apple-design` skill): glass limited to the floating layer (tab bar, filter capsule, sheet, cookie popover, clear-glass favorite buttons over photos); specular rims, scroll-edge blur; spring physics via CSS `linear()` on the tab indicator (with jelly squash), segmented control, buttons, cards and sheet; tab bar hides on scroll down; bottom sheet with grabber on mobile; Reduce Transparency / Increase Contrast / Reduce Motion fallbacks.
- **V2** — Initial prototype.
