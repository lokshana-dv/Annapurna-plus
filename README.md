🌟 About
ANNAPURNA+ is a smart food rescue platform designed to connect food donors, volunteers, and beneficiaries with unprecedented efficiency. The platform uses a proprietary Smart Food Routing Engine that automates complex decision-making processes to ensure optimal food distribution.

"Not just donating food — intelligently saving it."

The Problem

Millions of kg of edible food is wasted daily
Millions of people suffer from hunger
No efficient system connects donors with recipients in real-time

Our Solution
ANNAPURNA+ uses AI-powered routing, real-time tracking, and role-based coordination to rescue food before it goes to waste.

✨ Features
FeatureDescription🧠 Smart Routing EngineAI-powered logistics that matches food to the best recipient⏱️ Expiry TimerReal-time countdown alerts for food safety🗺️ Live Map TrackingGPS-based monitoring of donations and volunteers📊 Impact AnalyticsComprehensive dashboards with heatmaps🔔 NotificationsPush, email, and in-app alerts🏆 GamificationLeaderboards, badges, and rewards for volunteers🛡️ Role-based AccessSecure login for Donors, Volunteers, NGOs, and Admins📱 Responsive DesignWorks on mobile, tablet, and desktop

🛠 Tech Stack

Frontend: React 18, Vite 5
Styling: Pure CSS with custom design system
Icons: Lucide React
Fonts: Sora + DM Sans (Google Fonts)
State Management: React Context API
Deployment: Netlify
Version Control: GitHub


📦 Modules
#ModuleDescription1🔐 User AuthenticationLogin, Register, Role-based access2👤 Profile ManagementEdit profile, security, impact stats3🍽️ Food DonationUpload food with photos, expiry, and location4🙏 Food RequestNGOs and individuals request food5🔍 Food TrackingReal-time lifecycle tracking with stepper6🚴 Volunteer ManagementAccept, track, and confirm deliveries7🗺️ Smart Routing EngineAI priority queue and route optimization8🗾 Live MapGeographic visualization of all activity9📈 Analytics & ImpactKPIs, bar charts, heatmaps, CO₂ tracking10🏆 LeaderboardVolunteer rankings, badges, achievements11🛡️ Admin DashboardUser management, system health, reports12⭐ Feedback & RatingStar ratings and reviews for all roles

🚀 Getting Started
Prerequisites

Node.js v18 or higher
npm v8 or higher

Installation
bash# Clone the repository
git clone https://github.com/lokshana-dv/Annapurna-plus.git

# Navigate to project folder
cd Annapurna-plus/annapurna

# Install dependencies
npm install

# Start development server
npm run dev
Open http://localhost:5173 in your browser.
Demo Login
Email:    demo@annapurna.org
Password: demo1234
Role:     Donor / Volunteer / NGO / Admin

🌐 Deployment
Netlify (Current)
The app is deployed on Netlify.
Live URL: https://annapurna-plus.netlify.app/


📁 Project Structure
Annapurna-plus/
└── annapurna/
    ├── src/
    │   ├── context/
    │   │   └── AppContext.jsx      # Global state management
    │   ├── components/
    │   │   └── UI.jsx              # Reusable UI components
    │   ├── pages/
    │   │   ├── LoginPage.jsx       # Login & Register
    │   │   ├── Dashboard.jsx       # Main dashboard
    │   │   ├── FoodPages.jsx       # Donate, Request, Tracking
    │   │   ├── VolunteerPages.jsx  # Volunteer, Routing, Leaderboard
    │   │   └── OtherPages.jsx      # Analytics, Map, Profile, Admin, Feedback
    │   ├── App.jsx                 # App shell (Topbar + Sidebar)
    │   ├── Root.jsx                # Root with Context Provider
    │   ├── index.css               # Global design system
    │   └── main.jsx                # Entry point
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── README.md



🤝 Contributing
Contributions are welcome!
bash# Fork the repo
# Create your branch
git checkout -b feature/AmazingFeature

# Commit your changes
git commit -m "Add AmazingFeature"

# Push to branch
git push origin feature/AmazingFeature

# Open a Pull Request
