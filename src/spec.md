# Specification

## Summary
**Goal:** Build the core Busy AI app shell and key modules based on the uploaded sketches and BrandBoost UI references, with Internet Identity login, consistent navy/green/black gradient styling, and a lightweight butterfly background animation.

**Planned changes:**
- Create a responsive app shell with persistent left sidebar navigation (collapsible on small screens) and routes for: Chat, Photo/Video Maker, Business Analytics, Gallery, Shop Maker (placeholder).
- Apply a consistent professional theme across all pages (navy/green/black gradient direction, modern typography, subtle glow button hovers).
- Add a butterfly-flying background animation on every page that does not block interactions and respects `prefers-reduced-motion`.
- Implement Internet Identity authentication with a dedicated centered-card login screen, plus logged-in indicator (principal short form) and logout in the app shell.
- Build Chat page UI (message list + input + Send, New Chat, Clear) with simple canned/rule-based assistant replies and per-user persistence.
- Build Photo/Video Maker landing page with feature cards for “Photo for Post” and “Video for Reels/Shorts,” each navigating to its flow.
- Implement “Photo for Post” flow: business details form (incl. optional image upload) → theme/template selection → generated poster preview with PNG download.
- Implement “Video for Reels/Shorts” flow: details form → transitions/style selection → animated preview and an export action (MP4/GIF if feasible; otherwise clearly labeled placeholder export).
- Build Business Analytics module: financial inputs (investment, revenue, costs + breakdown) → computed metrics (profit, margin) + simple client-side charts.
- Build Gallery module with filter tabs (All, Photos, Videos, Analytics), item cards (title/type/date), and actions (View, Download), backed by per-user persistence.
- Add Shop Maker placeholder page with “Coming soon” and a simple info/contact card layout.
- Implement backend persistence (single Motoko actor) keyed by user principal for chat messages, gallery metadata, and saved analytics reports.

**User-visible outcome:** Users can sign in with Internet Identity, navigate via a BrandBoost-inspired sidebar, chat with simple local replies, generate/export basic poster and short-video template previews, compute and save analytics reports with charts, and browse/download saved outputs in a filtered gallery—all within a consistent themed UI with optional reduced-motion butterfly background animation.
