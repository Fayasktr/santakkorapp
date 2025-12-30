# 🎅 zigSanta - Kerala's Own Sarcastic Gift-Giver

**zigSanta** (Santakku Oru App) is a fun, interactive web application built for the **"Santa-ക്ക് ഒരു App" Online Hackathon**. It's not just another Santa app—it's customized for the Kerala vibe, allowing users to chat with a sarcastic Santa in Malayalam/Manglish and share their most heartfelt (or hilarious) wishes.

---

## 🌟 Features

- **📍 Santa-GPS (Real-time Watch):** Santa "monitors" your behavior across Kerala using location-based simulation.
- **💬 Naadan Chat:** A real-time chat interface powered by Socket.io where you can talk to Santa in Malayalam. Be careful, he might give you a sarcastic nickname!
- **🎁 Wish Management:** Users can submit their wishes directly to Santa. 
- **🧠 Santa's Memory:** A persistent system that remembers your interactions and nicknames.
- **🛡️ Santa Dashboard:** A dedicated admin panel for Santa to view all wishes and chat with users in real-time.
- **🔥 Modern UI/UX:** A glassmorphic design built with premium aesthetics, smooth transitions, and a festive color palette.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Real-time Engine:** Socket.io
- **Frontend Template Engine:** Handlebars (HBS)
- **Authentication:** Bcryptjs & Express-Session
- **Styling:** CSS3 (Custom Glassmorphism)
- **Maps:** Leaflet Geosearch

---

## 🚀 Setup Instructions

Follow these steps to get the project running locally:

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB installation

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/santakkoruapp.git
   cd santakkoruapp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_random_secret_here
   ```

4. **Run the application:**
   - For production: `npm start`
   - For development (auto-reload): `npm run dev` (if nodemon is configured)

5. **Access the App:**
   Open your browser and go to `http://localhost:3000`

---

## 📸 Screenshots

| Landing Page | Chat Interface | Santa Dashboard |
| :---: | :---: | :---: |
| ![Home](https://via.placeholder.com/300x200?text=Home+Page) | ![Chat](https://via.placeholder.com/300x200?text=Chat+Interface) | ![Dashboard](https://via.placeholder.com/300x200?text=Santa+Dashboard) |

*(Note: Replace with actual screenshots before submission)*

---

## 🏆 Hackathon Guidelines Adherence

This project was built following the **"Santa-ക്ക് ഒരു App" Online Hackathon** guidelines by the **Brototype Student Excellence Team**:

- **[x] Originality:** Built from scratch for this hackathon.
- **[x] Public Repo:** Repository is public and documented.
- **[x] Individual Submission:** Developed individually.
- **[x] Proper README:** Comprehensive documentation included.
- **[x] AI Usage:** Utilized AI tools for development enhancement.

---

## 🤝 Acknowledgments

- **Brototype Student Excellence Team** for organizing this hackathon.
- Inspired by the sarcastic humor of Kerala's local culture.

---

Made with ❤️ by Fayas
