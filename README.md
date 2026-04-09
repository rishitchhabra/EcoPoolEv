# EcoPool EV

EcoPool EV is a sustainable and accessible ride-sharing platform frontend designed to reduce traffic congestion and emissions while providing mobility options for everyone.

## Features

- **Sustainable Ride Sharing:** Connect with others to share EV rides and reduce carbon footprint.
- **Route Optimization:** Visualize AI-optimized routes that balance cost, time, and emissions.
- **Accessibility First:** Prioritize vehicles with ramps, lifts, and driver assistance.
- **Ride Visualization:** Interactive route map (simulated) showing pickup points and real-time status.

## Tech Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Routing:** React Router DOM

## getting Started

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:5173](http://localhost:5173) (or the port shown in terminal) to view the app.

## Project Structure

- `src/pages/Home.jsx`: Landing page with booking form.
- `src/pages/RideDetails.jsx`: Ride visualization and details page.
- `src/components/Navbar.jsx`: Navigation bar.

## Vercel Deployment

This project is now configured for Vercel with:

- A serverless API entry at `api/index.js`
- Shared Express app setup in `app.js`
- Routing rules in `vercel.json`

### Required Environment Variables (Vercel Project Settings)

- `MONGODB_URI`: MongoDB Atlas connection string
- `SESSION_SECRET`: Long random secret for session signing
- `NODE_ENV`: `production`

### Deploy

1. Push this repository to GitHub.
2. Import the repo in Vercel.
3. Add the environment variables above in Vercel.
4. Deploy.

After deployment:

- Static pages are served from the project root.
- API routes are served from `/api/*` by the Express serverless function.
