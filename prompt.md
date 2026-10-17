# HUMBL Wallpapers — Master Build Prompt (Prototype V2 onward)

Build and iteratively improve **HUMBL Wallpapers**, a premium wallpaper platform connected to the HUMBLE brand. This is a working prototype, not the final production release. Preserve a versioned workflow: Prototype V1, V2, V3, etc.; only call a build final after the owner explicitly approves it.

## Brand assets
Use the supplied assets without recreating or distorting them:
- `assets/humbl-wallpapers-logo.png`: primary wordmark for intro/navigation/footer where it reads clearly.
- `assets/humbl-main-logo.png`: compact mark for favicon/app icon or appropriate brand placements.
- `assets/no-image-available.jpg`: fallback when a wallpaper asset cannot load.
Keep aspect ratios intact, use suitable sizing for each context, and provide accessible alt text.

## Art direction
Create a human-designed, editorial, cinematic interface—not a generic AI landing page. Use a restrained black/charcoal foundation, off-white typography, carefully limited violet accents, and iOS-inspired Liquid Glass surfaces. Glass should be selective: navigation, small controls, and detail panels, not every section. Avoid excessive glow, floating decorative cubes, random orbit graphics, repeated gradient cards, overblown marketing copy, and uniform card layouts everywhere. Give the wallpaper photography the visual priority. Use varied but coherent editorial composition, meaningful spacing, real content, and clear hierarchy.

## Motion
Use a cinematic title reveal with a skip option, then transition into the homepage. Add natural staggered image reveals, subtle parallax only where it remains smooth, and a spring/bouncy active indicator in the Liquid Glass navigation. Hover/tap effects should be quick and restrained, not perpetual. Respect `prefers-reduced-motion`, clean up observers/listeners, avoid layout shifts, and do not delay content for decorative animation. Skeleton loading must actually display while data is loading and disappear when content resolves.

## Responsive UX
One responsive site for desktop, tablet, and mobile. Test narrow mobile widths, landscape tablet, keyboard navigation, touch targets, safe-area insets, and overflow. On mobile use a compact glass navigation/bottom bar; desktop can use a floating capsule navbar. Support mouse, touch, and keyboard. Optimize images, lazy-load below-the-fold media, reserve image aspect ratios, and avoid unnecessary animation work.

## Core features
- Search by title/tags; filters for still/live, device, category, and sort order.
- Wallpaper cards, detail modal/page, metadata, resolution, format, file size, compatibility, and favorites.
- Still and live/video wallpaper collections with honest format/device-support labels.
- Admin interface for upload, preview, metadata, edit/delete, publish/unpublish, and analytics.
- Functional cookie preferences, footer links, contact/about pages, privacy policy, terms, copyright process, accessibility page, custom 404, `sitemap.xml`, `robots.txt`, and `llms.txt`.
- Professional `README.md` with real project screenshots, live preview link when deployed, installation instructions, environment variable documentation, architecture, testing report, and known limitations. Never invent live URLs or claim untested features work.

## Security and downloads
Do not rely on disabling right-click as security. Store original files privately, serve optimized public previews, validate uploads by file signature/type/size, generate safe filenames, enforce server-side admin authorization, apply rate limits, and use short-lived signed URLs for original downloads. Keep secrets server-side and never commit `.env` files. A client-only countdown is a demo only; real advertising verification and download authorization must be server-side and compliant with the ad provider's rules.

## Suggested architecture
Frontend: Next.js + TypeScript if building the production web app; use CSS/React animation patterns appropriate for the web rather than pasting native SwiftUI code. Hosting: Vercel. Backend options: existing Supabase project if safely available, or Cloudflare Workers + D1 + R2. Prefer reusing the user's existing services only after checking limits and avoiding impact on other projects. Keep backend/storage abstractions replaceable.

## Code quality and delivery
Before delivering each ZIP: inspect the whole project, verify asset paths and links, run syntax/build checks that the stack supports, test all interactions, verify responsive layouts and accessibility basics, search for console/build errors, and document what could not be tested. Fix discovered issues. Include source files and a professional README. Name the archive `Prototype V2.zip`, then increment version numbers for future iterations. Do not call it production-ready unless backend integration and production checks have actually passed.

## Skill repository guidance
Reference `https://github.com/dpearson2699/swift-ios-skills` for relevant design ideas such as Liquid Glass, animation, and performance, but recognize that the repository is primarily for native Swift/SwiftUI. Translate principles into web-native HTML/CSS/JavaScript/React; do not use SwiftUI code directly in the website.

## Working method
Make focused improvements based on the owner's feedback. Preserve existing working features, explain meaningful changes, keep a concise changelog, and deliver a new versioned ZIP for review. The owner supplies final logo/watermark assets and decides when the build is approved.

## Owner direction added after Prototype V2
- **V3 — iOS 26 style:** Make the website look like the iOS 26 UI, with Liquid Glass and bouncy (spring) motion. Follow Apple's two-layer model: glass only on the floating functional layer (tab bar/nav, filter bar, sheets, popovers, small controls over photos), never on content cards. Use spring physics for indicators, segmented controls, presses, and sheets. Keep Reduce Transparency, Increase Contrast, and Reduce Motion fallbacks.

- **V3.1 — motion libraries:** Use Motion (`motion`, `motion-dom` `animateView`) for filter/layout morphs with `{ type: spring, visualDuration: 0.4, bounce: 0.18 }`, enter `{opacity:[0,1], scale:[0.85,1]}` and exit `{opacity:0, scale:0.85}` with `stagger(0.03)`. Use anime.js `createTimeline` with grid `stagger` (`grid:[13,13], from:'center'`, scale `[1.1, .75]`, `inOutQuad`, 200ms per ring) for the intro dot ripple.

## Tooling
- Motion AI Kit: `npx motion-ai` (skill `motion`, `motion-reviewer` agent, `motion` + `motion-plus` MCP servers in `.mcp.json` / `opencode.jsonc`)
- shadcn MCP: `npx shadcn@latest mcp init --client claude` (in `.mcp.json`, mirrored in `opencode.jsonc`)

## Design skills available in this repo
Consult these (in `.agents/skills/`, mirrored in `.claude/skills/`) when designing or reviewing UI:
- `apple-design` (dickwu/apple-design-skill): Apple HIG reviewer, including the Liquid Glass guide
- `apple-like-ui` (Ethelye/apple-like-ui-skill): building and auditing Apple-style UI
- `emilkowalski/skills`: `emil-design-eng`, `emil-apple-design` (renamed from that pack's `apple-design` to avoid a name clash), `animate`, `improve-animations`, `review-animations`, `animation-performance`, `animation-vocabulary`, `find-animation-opportunities`, `break-ui`, `prototype`, `pick-ui-library`, `ask-sonner`, `mobile-native`, `animate-expo`, `write-swift`
- `ai-ui-design-skills` Claude plugin (dhananjaym182/ai-ui-design-skills, enabled in `.claude/settings.json`): `ui-ux-design-system`, `saas-product-ui-system`, `saas-ui-ux-designer-with-flex`, `saas-ui-ux-designer-skill-typography-flex`, `image-logo-icons`
