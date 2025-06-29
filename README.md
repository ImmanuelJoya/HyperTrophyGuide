# HyperTrophyGuide  

HyperTrophyGuide is a web-based workout planner built with a React + Vite frontend and a FastAPI backend. It allows users to generate random exercise routines based on popular workout splits (PushPullLegs, BroSplit, UpperBody-LowerBody). The app features user authentication (login/register) with JWT, a guest mode for quick access, and a cyberpunk-inspired dark theme.

## Features

- **Workout Generator**: Select a workout type and get a random set of exercises from predefined JSON data.
- **Authentication**: Register and log in with a username, email, and password, secured with JWT.
- **Guest Mode**: Use the app without an account.
- **Cyberpunk UI**: A minimal, dark theme with neon accents (cyan, magenta, yellow) and subtle animations.
- **Responsive Design**: Centered layout adaptable to various screen sizes.

## Prerequisites

- **Node.js** (v16+ recommended): [Download](https://nodejs.org/)
- **Python** (v3.8+): [Download](https://www.python.org/)
- **npm**: Comes with Node.js
- A modern web browser (e.g., Chrome, Firefox)

### Backend

1. **Navigate to the Backend Directory**:
   ```bash
   cd backend
   ```

### Install Dependencies:
    ```bash
    npm install
    ```

### Start the Development Server:
   ```bash
   npm run dev
   
   ```

### User authentication is still work in progress
Work in progress. Currently supports basic login/register with JWT and guest mode, but lacks full integration with workout features.

### Comming soon:
- **Workout tracking**: Users can log their workouts and track progress.
- **Exercise database**: A more comprehensive database of exercises with detailed information.
- **New Workout Types**: Add support for Calisthenics, Gymnastics, and CrossFit routines.

### Technologies Used:
- **Frontend**: React, Vite, Axios, Custom CSS
- **Backend**: FastAPI, Uvicorn, PyJWT
- **Data**: Static JSON files.

### Check it out Here
- **Link**: [Visit](https://hyper-trophy-guide.vercel.app/)

## Thank you for visiting,stay tuned for future updates



