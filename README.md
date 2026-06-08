# 🚖 Geofence Event Processing Service (Event in Range Detection)

## 📌 Project Overview
This is a full-stack **Location-Based Service** designed to track vehicles in real-time and detect when they cross geographic boundaries (Geofences).

Unlike simple "Radius" checks, this system implements the **Ray Casting Algorithm (Point-in-Polygon)** to accurately handle complex, irregular-shaped zones (e.g., city blocks, tech parks).

## 🚀 Key Features
* **Real-time Tracking:** Updates vehicle coordinates instantly via a React Dashboard.
* **Smart Geofencing:** Detects **ENTER** and **EXIT** events for polygon zones.
* **DSA Implementation:** Custom implementation of the Ray Casting algorithm (O(N) complexity).
* **Operational Awareness:** Detailed event logging and error handling for invalid GPS data.
* **State Management:** Persists vehicle state in MongoDB to track transitions effectively.

---

## 🛠️ Tech Stack
* **Frontend:** React.js, Vite, Axios, CSS3
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Atlas or Local)
* **Algorithm:** Ray Casting (Point-in-Polygon)

---

## 🏗️ Design Decisions
* **Architecture:** Used **MVC (Model-View-Controller)** to separate business logic from routing and data storage.
* **Database Choice:** Used **MongoDB** to persist vehicle state. This ensures we don't lose the "last known location" or "current zone" status if the server restarts.
* **Algorithm Choice:** Instead of using libraries like `geolib` for simple circles, I manually implemented the **Ray Casting Algorithm**. This demonstrates DSA skills and allows for precise detection in irregular polygon shapes (which are more realistic for city zones).

## 🧪 Assumptions
* **Zone Shapes:** Zones are defined as polygons (arrays of coordinates), not circles.
* **Data Flow:** GPS updates arrive in chronological order.
* **Zone Overlap:** Zones do not overlap (logic prioritizes the first zone found).

---

## ⚙️ Installation & Setup

### 1. Prerequisites
Ensure you have the following installed:
* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/) (or a Cloud Atlas URI)
* [Git](https://git-scm.com/)

### 2. Clone the Repository
```bash
git clone [https://github.com/Utkarsh80369/Geofence-Event-Processing-Service-main)
cd geofence-service
