# 🎓 UniStay — Student Accommodation Platform (YMCA Faridabad)

UniStay is a modern, full-stack student housing portal specifically engineered for students of **J.C. Bose University of Science and Technology, YMCA, Faridabad**. It enables students to discover, filter, and contact verified PGs, shared flats, and private rooms near the YMCA campus with **zero brokerage**.

---

## 🚀 Key Features

* **YMCA Campus Proximity**:
  * Real walking distances (0.3 km to 2.5 km) and estimated walk times to YMCA Gate 1 & 2.
  * Nearest Metro Station indicators (*Escorts Mujesar*, *Bata Chowk*, *Neelam Chowk* on Violet Line).
  * Sector-wise filtering (*Sector 6, Sector 7, Sector 8, Sector 11, NIT*).
* **Student-Centric Accommodation Types**:
  * **Boys PG** & **Girls PG** (with warden and curfew details).
  * **Co-ed PG** & **Shared Rooms** (double/triple sharing).
  * **1/2 BHK Student Flats** for groups of college friends.
  * **Private Single Rooms** for focused exam and placement preparation.
* **Monthly Rent & Transparent Charges**:
  * Clear monthly rent display (₹/month) replacing vacation per-night pricing.
  * Security deposit & maintenance breakdowns.
  * Food/Mess inclusion badges (*Breakfast, Lunch, Dinner*).
* **Multi-Parameter Search & Filter Engine**:
  * Keyword search across titles, sector numbers, and landmarks.
  * Budget filters (Up to ₹5k, ₹7.5k, ₹10k, ₹15k, ₹20k).
  * Distance filter (Under 500m, 1km, 2km, 3km).
  * Gender preference & occupancy selectors.
  * Amenities checklist (*Wi-Fi, Food Included, AC, Power Backup, RO Water, Geyser, Study Desk, CCTV*).
* **Direct Landlord Contact (Zero Brokerage)**:
  * Direct 1-click **Phone Call** CTA.
  * Direct pre-filled **WhatsApp Inquiry** CTA.
* **Student Ratings & Peer Reviews**:
  * Overall rating + sub-ratings for *Cleanliness*, *Mess Quality*, and *Wi-Fi Speed*.
  * Reviews tied to verified YMCA student accounts.
* **Interactive Map**:
  * MapLibre GL map pinpointing both the stay location and YMCA campus.

---

## 🛠 Tech Stack

* **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Axios, React Router Dom v6, MapLibre GL.
* **Backend**: Node.js, Express.js REST API, JSON Web Tokens (JWT), Bcrypt.js password hashing, Multer & Cloudinary image pipeline.
* **Database**: MongoDB Atlas (with local MongoDB fallback), Mongoose ODM.

---

## 👥 Demo Accounts

Use these pre-configured accounts or register your own:

| Role | Email | Password | Details |
| :--- | :--- | :--- | :--- |
| **YMCA Student** | `student@unistay.com` | `password123` | CSE 3rd Year, can review stays and post flatmate requests |
| **PG Owner** | `owner@unistay.com` | `password123` | Landlord with verified listings in Sector 6 & 7 |

---

## 🏃‍♂️ How to Run

### 1. Start the Backend API (Port 5000)
```bash
cd backend
npm install
npm run seed     # (Optional) Re-seeds YMCA sample listings & users
npm start        # Starts server on http://localhost:5000
```

### 2. Start the Frontend App (Port 5173)
```bash
cd frontend
npm install
npm run dev      # Starts Vite dev server on http://localhost:5173
```

Open `http://localhost:5173` in your browser.
