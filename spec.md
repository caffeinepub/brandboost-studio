# Specification

## Summary
**Goal:** Unify the app’s look with a consistent medium blue‑green gradient background on every screen, and enforce very dark text and icon colors for clear contrast (no white text/icons and no purple-heavy gradients).

**Planned changes:**
- Apply one shared medium-intensity blue‑green gradient background across AppShell, LoginPage, AuthGate loading/redirect screens, and all routes so no page appears near-white by default.
- Update global typography styles so all user-visible text defaults to very dark colors (including headings, descriptions, placeholders, tabs, nav labels, and empty states) while staying readable on the new gradient.
- Update icon styling so sidebar/header/menu/loading/chat/gallery icons render in consistent dark tones (no white icons), with active/inactive states still clearly distinguishable.
- Remove remaining purple/blue gradient fragments and overly-dark/near-black UI surfaces (e.g., chat bubbles/avatars, gallery cards/panels) that conflict with the blue‑green theme, keeping cards/panels readable and visually separated from the background via non-invasive styling overrides.

**User-visible outcome:** Every page shows the same medium blue‑green gradient background, and all text and icons appear in dark, readable colors with a consistent theme across Chat, Maker, Analytics, Gallery, Shop, Login, and AuthGate screens.
