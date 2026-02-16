# Specification

## Summary
**Goal:** Refresh the app UI to a light, readable navy/green gradient theme with consistent tokens, glowing/animated CTA buttons, and a logo-focused login/loading experience while fixing any blank/invisible UI states.

**Planned changes:**
- Replace dark blue/purple-heavy global backgrounds with a light navy/green gradient across AppShell, Login, and AuthGate loading, ensuring strong text/surface contrast.
- Update theme color tokens/gradients to de-emphasize purple in favor of a navy + green palette and apply consistently to headings, cards, borders, and UI accents.
- Add animated/glowing styling for primary CTA buttons with accessible focus/hover states and respects prefers-reduced-motion.
- Increase logo/wordmark prominence on the Login screen and AuthGate loading screen (logo + loading indicator), keeping user-facing text in English.
- Keep the UI icon-forward and avoid adding new large decorative images; only adjust existing imagery/icons if needed for readability.
- Investigate and fix “blank/can’t see anything” by ensuring authenticated/unauthenticated routes always render visible content, including during initialization, and avoid low-contrast overlays.

**User-visible outcome:** Users see a clearly visible, light navy/green gradient UI (no blank screens), with readable content across all main pages, glowing primary buttons, and a branded login/loading flow featuring a prominent Busy AI logo/wordmark.
