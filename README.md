# FixEasy – Connect with Nearby Technicians Easily

## Problem Statement
In today’s fast-paced world, finding a reliable, skilled, and available technician for household or office repairs is a significant challenge. Users often struggle with:
- **Lack of Trust:** identifying verified and trustworthy professionals.
- **Inconvenience:** Endless phone calls and scheduling conflicts.
- **Opacity:** Unclear pricing and lack of service status tracking.
- **Fragmentation:** No single platform aggregates diverse technical services (plumbers, electricians, IT support, etc.).

## Solution Overview
**FixEasy** is a centralized web platform designed to bridge the gap between people needing repairs and skilled technicians. 
- **For Users:** A simple interface to find, book, and track services from verified local experts.
- **For Technicians:** A dedicated dashboard to manage bookings, showcase expertise, and grow their business.
- **For Everyone:** A seamless, transparent, and efficient service experience.

## Tech Stack
**Frontend:**
- **React.js:** Dynamic description and interactive UI.
- **Tailwind CSS:** Modern, responsive styling.
- **Axios:** efficient HTTP requests.

**Backend:**
- **Node.js & Express.js:** Robust and scalable server-side logic.
- **JWT (JSON Web Tokens):** Secure, stateless authentication.
- **Bcrypt:** Password hashing for security.

**Database:**
- **MongoDB:** Flexible NoSQL database for managing users and service requests.

## User Roles
1.  **User:**
    - Browse services.
    - Book technicians.
    - Track service status.
    - View booking history.
2.  **Technician:**
    - Manage profile and availability.
    - View and accept/reject new service requests.
    - Update status of ongoing jobs (e.g., "In Progress", "Completed").
3.  **Admin:**
    - Oversee all users and technicians.
    - Manage platform content and categories.
    - Monitor overall system health and activity.

## Features
- **User Authentication:** Secure registration and login for all roles using JWT.
- **Technician Discovery:** Filter technicians by service type (e.g., "Plumber", "Electrician") and location.
- **Service Booking:** Easy request forms to book specific services.
- **Live Status Tracking:** Real-time updates on tracking request status (Pending, Accepted, In Progress, Completed).
- **Technician Dashboard:** Tools for technicians to manage their incoming workload.
- **Admin Dashboard:** Centralized control panel for platform administration.

## Setup Instructions

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (Local or Atlas connection string)
- Git

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/FixEasy.git
    cd FixEasy
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    ```
    - Create a `.env` file in the `backend` folder:
      ```env
      PORT=5000
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret_key
      ```
    - Start the server:
      ```bash
      npm run dev
      ```

3.  **Frontend Setup**
    ```bash
    cd ../frontend
    npm install
    ```
    - Start the client:
      ```bash
      npm run dev
      ```

4.  **Access the App**
    - Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

## Future Enhancements
- **Ratings & Reviews:** Allow users to rate technicians to build trust.
- **Notifications:** Email or SMS alerts for booking updates.
- **Payment Integration:** Secure in-app payments (Stripe/PayPal).
- **Map Integration:** Visual map tracking for technician arrival.

## Contact
Interested in collaborating or have questions?
- **Email:** ritiknyadavofficial614@gmail.com
- **LinkedIn:** [linkedin.com/in/retik-yadav]
