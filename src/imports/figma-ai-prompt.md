# Figma AI Prompt — Blockchain Identity, Access Control & Digital Asset (NFT) Platform

Design a modern, production-grade web dashboard for a **"Blockchain-Based Secure Platform for Identity, Access Control & Digital Asset Management."** The platform lets organizations manage Decentralized Identifiers (DIDs), issue and track NFT-based digital assets, enforce Role-Based Access Control (RBAC), and view an immutable audit trail — all through smart contracts.

## 1. Overall Vibe
- Should feel like a **trusted fintech/Web3 SaaS product** (think Stripe, Linear, Coinbase dashboard) — clean, calm, confident. It should NOT look like a generic AI-generated template — avoid clichéd centered hero + 3 icon cards layout, avoid overused gradients and glassmorphism clichés, avoid generic stock icons.
- Should feel **secure, trustworthy, and premium**, but approachable and easy to use — not intimidating or "hacker/cyberpunk" themed.
- Layout must be **self-explanatory at first glance** — a new user should understand what to click within 3 seconds, with clear labels, icons + text (never icon-only nav), and obvious primary actions.

## 2. Color Palette (mandatory — do not use brown/cream or bright neon/danger colors)
Use an **aesthetic greeny-cream palette**, soft and premium, high contrast for readability:

- Background (base): `#FAF9F1` (warm ivory/cream)
- Secondary background / cards: `#F1F4E8`
- Primary brand green (buttons, active states, links): `#3F6B4D` (deep sage green)
- Accent green (highlights, charts, hover states): `#7FAE83` (soft sage)
- Success/verified states: `#5C8A5C`
- Text primary: `#20291F` (near-black green-tinted, for contrast on cream)
- Text secondary/muted: `#6B7166`
- Borders/dividers: `#DCE2D2`
- Alerts should use a **muted amber** (`#C99A4A`) instead of harsh red for warnings; use a **muted terracotta** (`#B26B57`) only for critical/destructive actions — never bright red.

Keep contrast ratios accessible (WCAG AA). No pure black, no pure white, no neon.

## 3. Typography
- Headings: a modern geometric sans-serif (e.g., "Space Grotesk" or "General Sans") — confident, slightly technical feel.
- Body text: a clean humanist sans-serif (e.g., "Inter" or "Satoshi") for readability.
- Use generous line-height and whitespace; avoid dense, cramped blocks.

## 4. Key Screens to Design
1. **Landing / Login Page** — DID-based login (wallet connect + email/passwordless option), short explainer of what the platform does with 3 simple icon+text steps (Create Identity → Get Verified → Manage Assets), and one tasteful **3D illustration** (see Section 6).
2. **Dashboard (Home)** — overview cards: Total Identities, Active NFTs/Assets, Pending Access Requests, Recent Blockchain Transactions. Include a simple activity timeline/graph.
3. **Identity Management** — list/table of users with their DID, role badge (Admin/Manager/Auditor/User), verification status, and a detail drawer showing cryptographic proof info in plain, non-technical language.
4. **Digital Assets (NFTs)** — grid/gallery view of assets as cards with a 3D-rendered thumbnail, owner identity, mint date, and traceability/ownership-history timeline on click.
5. **Access Control (RBAC)** — a visual role matrix (roles as columns, permissions as rows) with toggle switches; admins can create/edit roles here.
6. **Audit Trail / Activity Log** — chronological, filterable, searchable table of every blockchain-recorded action (identity created, NFT minted, ownership transferred, permission changed) with a "view on chain" link-style detail.
7. **Settings/Profile** — manage own DID, connected wallet, notification preferences.

## 5. Navigation & Usability
- Persistent **left sidebar** with clear icon + label for each section (Dashboard, Identities, Assets, Access Control, Audit Trail, Settings). Highlight active state with the sage green accent.
- Top bar with search, notifications, and user's DID/avatar.
- Every table/list should have obvious filters, search, and clear empty states with friendly explanatory text (not just "No data").
- Use tooltips/info icons next to technical terms (DID, smart contract, RBAC) so non-technical users understand instantly.
- Primary actions (e.g., "Mint New Asset," "Assign Role") should be a solid sage-green button, always in the same top-right position per page.

## 6. Visual/3D Elements
- Add **tasteful, soft 3D isometric illustrations** (clay-render or soft-shadow 3D style, not glossy sci-fi) for:
  - Login/landing page hero (e.g., a 3D shield + key/lock motif symbolizing secure identity)
  - Empty states (e.g., a 3D floating card/token illustration for "no assets yet")
  - NFT asset cards (subtle 3D token/badge icon per asset)
- Keep 3D elements soft-lit, pastel-toned to match the green-cream palette (not saturated/glossy) — should feel premium and calm, not gamer/crypto-flashy.

## 7. Components to Include
- Role badges (pill-shaped, color-coded subtly within the green palette — e.g., darker sage for Admin, lighter for User)
- Status chips (Verified / Pending / Revoked)
- Data tables with sorting, pagination, and row-level actions
- Modal/drawer for "Mint NFT," "Assign Role," "Create Identity" flows — each a simple 2–3 step form
- Toast notifications for transaction confirmations ("Asset minted successfully — recorded on-chain")

## 8. Technical/Export Constraints (important)
- Design should translate cleanly into a **static/frontend-only React/Next.js app** with no dependency on a custom backend server — must be deployable on **Vercel** directly from the exported code (static hosting / serverless functions only, no persistent live server required).
- Keep components modular and consistently spaced (use an 8px spacing grid) so exported code maps to reusable React components.
- Avoid overly complex custom animations that are hard to reproduce in code — favor simple, elegant micro-interactions (hover states, smooth transitions).

## 9. What to Avoid
- No brown/cream theme.
- No bright, neon, or "danger" red/orange heavy color schemes.
- No generic AI-template look (no centered hero + 3 icon boxes + big rounded gradient blobs).
- No cluttered dashboards — keep information hierarchy clear and breathable.
