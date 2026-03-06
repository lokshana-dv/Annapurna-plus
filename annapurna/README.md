# ANNAPURNA+ 🌿
**Smart Food Rescue Network**

A full-stack React application for intelligent food waste reduction.

---

## 🚀 How to Run in VS Code

### Step 1 — Open the project
Open VS Code → File → Open Folder → select the `annapurna` folder

### Step 2 — Open Terminal in VS Code
Press `` Ctrl + ` `` (backtick) to open the integrated terminal

### Step 3 — Install dependencies
```bash
npm install
```

### Step 4 — Start the development server
```bash
npm run dev
```

### Step 5 — Open in browser
Go to: **http://localhost:5173**

---

## 🔐 Demo Login
- **Email:** demo@annapurna.org
- **Password:** demo1234
- Choose any role: Donor / Volunteer / NGO / Admin

---

## 📦 All 12 Modules Included

| Module | Page |
|--------|------|
| 🔐 User Authentication | Login / Register |
| 👤 Profile Management | `/profile` |
| 🍽️ Food Donation | `/donate` |
| 🙏 Food Request | `/request` |
| 🔍 Food Tracking | `/tracking` |
| 🚴 Volunteer Management | `/volunteer` |
| 🗺️ Smart Routing Engine | `/routing` |
| 🗾 Live Map | `/map` |
| 📈 Analytics & Impact | `/analytics` |
| 🏆 Leaderboard | `/leaderboard` |
| 🛡️ Admin Dashboard | `/admin` |
| ⭐ Feedback & Rating | `/feedback` |
| 🔔 Notifications | `/notifications` |

---

## 🔌 To Add Real Backend

### Firebase Authentication
```bash
npm install firebase
```
Replace `login()` in `src/context/AppContext.jsx` with:
```js
import { signInWithEmailAndPassword } from 'firebase/auth'
await signInWithEmailAndPassword(auth, email, password)
```

### Google Maps
Replace `<MapPlaceholder />` in `src/components/UI.jsx` with a real Maps embed using your API key.

### API Integration
Add `fetch()` calls in `submitDonation()` in `src/pages/FoodPages.jsx` to POST data to your backend.

---

## 🛠 Tech Stack
- **React 18** (Vite)
- **Lucide React** icons
- **Google Fonts** (Sora + DM Sans)
- Pure CSS design system (no Tailwind / Bootstrap)
