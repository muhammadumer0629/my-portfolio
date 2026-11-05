# Modern Dark-Mode SaaS Personal Portfolio & In-Page CMS

An ultra-clean, high-performance personal portfolio single-page web application inspired by dark-mode SaaS product design (deep navy/slate `#0B0F19` background, neon cyan/blue highlights, and glassmorphism cards).

## 🚀 Key Highlights & Architecture

- **Option B — 100% JSON Config Driven**:
  - **Zero hardcoding** in UI components.
  - All text, media URLs, skills, services, workflow roadmap, project case studies, certifications, pricing packages, timeline entries, testimonials, FAQs, and contact parameters are dynamically loaded from [`public/data.json`](./public/data.json).
  - Editing or replacing `public/data.json` immediately re-renders the entire portfolio.

---

## 🔒 In-Page Admin Mode / CMS Panel

The portfolio comes equipped with a live, in-page CMS:

1. **Admin Access & Security**:
   - Subtle floating button at the bottom-right corner.
   - Protected by PIN / Password modal (Default PIN: `admin123`).
   - One-click PIN autofill button and persistent session authentication.
2. **Wallpaper & Background Manager**:
   - Clickable pre-defined dark presets:
     * **Preset 1: Deep Navy Cyan Glow** (`#0B0F19` canvas with radial ambient spotlight)
     * **Preset 2: Midnight Cyber Neon** (`#030712` void with subtle neon glow)
     * **Preset 3: Modern Dark Grid** (Precision geometric engineering grid)
     * **Preset 4: Pure Minimal Slate** (`#0F172A` glassmorphic surface)
   - Support for custom image URLs or direct local file uploads (converted automatically to base64 Data URLs).
   - Overlay opacity slider (**0.30 to 0.95**) with live percentage display to ensure text remains crisp and readable over any wallpaper.
3. **Complete Content & Image Management**:
   - **Hero & Profile**: Name, handle, tagline, status, bio, headline parts, 4 stats counters.
   - **Projects Showcase**: Add, edit, reorder (Move Up / Down), and delete cards with local image upload / URL paste, tech tags, and case study links.
   - **Achievements & Certifications**: Add, edit, reorder, delete credentials and badge image previews.
   - **Skills, Services & Pricing**: Live editing for all categories, proficiency sliders (10-100%), deliverables, and pricing packages.
   - **Section Toggles**: Dedicated switches to show or hide any of the 11 sections on the page with automatic navigation synchronization.
4. **Real-time Live Preview & Export**:
   - Every keystroke or toggle instantly updates the portfolio in real time.
   - Edits are automatically saved to `localStorage`.
   - **"Download New data.json"** button exports the updated file to your computer so you can drop it directly into `public/data.json`.
   - Full null-safety guards prevent empty or missing fields from breaking the application.

---

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **Vite 6**
- **Tailwind CSS v4** + `@tailwindcss/vite`
- **Lucide React** with custom `DynamicIcon` resolver for any Lucide icon string or tech brand logo

---

## 💻 Getting Started

### Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```
