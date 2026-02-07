# Mini E-Commerce Module

A full-stack e-commerce application built with React, Node.js/Express, and Docker.

## Tech Stack

- **Frontend:** React 18, React Router, Context API, Vite
- **Backend:** Node.js, Express.js
- **Styling:** Plain CSS (no UI libraries)
- **Containerization:** Docker, Docker Compose

## Project Structure

```
├── frontend/                # React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React Context (Cart)
│   │   ├── pages/          # Page components
│   │   └── styles/         # CSS styles
│   ├── Dockerfile
│   └── package.json
├── backend/                 # Express API
│   ├── src/
│   │   ├── data/           # In-memory data
│   │   ├── middleware/     # Validation & error handling
│   │   └── routes/         # API routes
│   ├── Dockerfile
│   ├── .env
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Quick Start (Manual Run)

Since Docker might not be installed, the easiest way to run the app is manually:

1. **Open Terminal 1 (Backend):**
   ```bash
   cd backend
   npm install
   npm start
   ```
   Server runs at http://localhost:5000

2. **Open Terminal 2 (Frontend):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   App runs at http://localhost:3000

## Run with Docker (Optional)

If you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed:

```bash
# Build and run with Docker Compose
docker-compose up --build
```
*Note: If you get a "command not found" error, ensure Docker Desktop is installed and running.*

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get single product |
| POST | `/cart` | Add item to cart |
| GET | `/cart` | Get cart contents |
| DELETE | `/cart/:productId` | Remove from cart |
| GET | `/health` | Health check |

### Example Requests

**Get Products:**
```bash
curl http://localhost:5000/products
```

**Add to Cart:**
```bash
curl -X POST http://localhost:5000/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'
```

## Features

- ✅ Product listing page (`/products`)
- ✅ Shopping cart page (`/cart`)
- ✅ Add/remove items from cart
- ✅ Increase/decrease item quantity
- ✅ Persistent cart (localStorage)
- ✅ Total price calculation
- ✅ Responsive design
- ✅ Input validation middleware
- ✅ Error handling middleware

## Environment Variables

### Backend (`.env`)
```
PORT=5000
NODE_ENV=development
```

### Frontend
```
VITE_API_URL=http://localhost:5000
```

## Troubleshooting

**"Error response from daemon: Docker Desktop is unable to start"**
- Docker Desktop is installed but not running.
- **Solution:** Open "Docker Desktop" from your Start Menu and wait for the engine to start (status bar in bottom left should turn green).
- Once running, retry `docker compose up --build`.

**"docker: The term is not recognized..."**
- This means Docker is not installed.
- [Download and install Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Restart your computer after installation.

**"npm: The term is not recognized..."**
- Ensure [Node.js](https://nodejs.org/) is installed.

**Backend "EADDRINUSE" Error**
- Port 5000 is busy. Kill the process or change `PORT` in `backend/.env`.
