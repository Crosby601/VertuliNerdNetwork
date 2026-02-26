# 💜 Vertuli Nerd Network

A minimal social-style web app built with **Nuxt 4 + TailwindCSS**, focused on clean UI, dark/light theming, and component-driven architecture.

> A small “science & nerd culture” themed feed app with user profiles, pseudo-authentication, and dynamic UI state — no backend, fully in-memory state.

---

## ✨ Features

- 🧠 Scientific-themed feed
- 👤 Multi-user mock authentication (hardcoded users)
- 📄 Dynamic user profiles (`/profile/[id]`)
- ❤️ Like system
- 🗑️ Post deletion (author-only)
- 🖼️ Profile avatar upload (local base64)
- 🌗 Dark / Light mode toggle
- 📊 Context-aware right sidebar (user stats update per profile)
- 📌 Pinned topic section
- 🔥 Trending tags
- ⚡ Quick post box
- 🎨 Glass UI (dark) + Crisp SaaS UI (light)

---

## 🧱 Tech Stack

- **Nuxt 4**
- **Vue 3 (Composition API)**
- **TypeScript**
- **TailwindCSS**
- SCSS (layer-based styling)
- No database (state stored in memory)

---

## 🖥️ UI Philosophy

The project intentionally implements:

- 🌑 Premium glass + glow styling in dark mode  
- 🌤️ Clean, high-contrast SaaS aesthetic in light mode  
- 📦 Reusable component structure (`card`, `panel`, `tag`, etc.)  
- 🎯 Context-driven UI (sidebars adapt to current profile route)  

---

## 📂 Project Structure (simplified)

```
app/
 ├── components/
 │    ├── Navbar.vue
 │    ├── LeftSidebar.vue
 │    ├── RightSidebar.vue
 │    └── PostCard.vue
 │
 ├── pages/
 │    ├── index.vue
 │    ├── login.vue
 │    └── profile/[id].vue
 │
 ├── composables/
 │    ├── useAuth.ts
 │    └── usePosts.ts
 │
assets/
 └── styles/main.scss
```

---

## 🚀 Getting Started

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run development server

```bash
npm run dev
```

App will be available at:

```
http://localhost:3000
```

---

## 🔐 Authentication Model

This project uses a **mock authentication system**:

- Users are hardcoded
- No backend
- No persistent storage
- Switching accounts simulates multi-user environment
- All state is reactive (Vue refs)

This is intentional — focus is on UI architecture and state logic.

---

## 🎨 Theming

Dark and light modes are implemented using:

- Tailwind’s `dark` class strategy
- Custom SCSS layers
- Component-based design tokens

Dark mode emphasizes:
- Glass panels
- Soft glow gradients
- Depth and blur

Light mode emphasizes:
- Clear borders
- Elevated surfaces
- Stronger contrast hierarchy

---

## 📌 What This Project Demonstrates

- Dynamic route handling in Nuxt (`[id].vue`)
- Context-aware computed state
- Composition API patterns
- Reusable design system components
- Theming without external UI libraries
- Layout with responsive sidebars

---

## ⚠️ Limitations

- No backend
- No real authentication
- State resets on refresh
- No persistence layer

This is a UI + architecture focused demo project.

---

## 💡 Possible Future Improvements

- Real API integration
- Database support
- Comment system
- Notifications
- Follow system
- Search & filtering
- Persisted theme & session handling

---

## 💜 Author

Built as an academic project demonstrating Nuxt 4 fundamentals and UI system design.

---

> Minimal. Nerdy. Violet.