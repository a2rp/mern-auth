# MERN Auth Workspace

A full-stack authentication demo built with React, Express, and MongoDB. It uses bcryptjs password hashing, HttpOnly JWT session cookies, and server-verified route protection.

![MERN Auth preview](frontend/public/preview.png)

## Features

- Register and log in with normalized email addresses
- Hash passwords with bcryptjs
- Keep JWT sessions in HttpOnly, SameSite cookies
- Verify sessions on the server and protect the dashboard
- Log out by expiring the server-issued session cookie

## Requirements

- Node.js 18 or newer
- MongoDB, local or hosted

## Run locally

Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI` and a private random `TOKEN_KEY` with at least 32 bytes. Start the API:

```bash
cd backend
npm ci
npm start
```

In another terminal, start the React client:

```bash
cd frontend
npm ci
npm start
```

The API uses port `1198`; the React development server uses `3000`. If you use another frontend origin, set it in `CLIENT_ORIGIN` in the backend environment. Set `REACT_APP_API_URL` in the frontend environment to the API base URL, including `/api`. For deployment, use HTTPS and serve the frontend and API on the same site so the strict SameSite session cookie is sent correctly.

## API routes

- `POST /api/user/register` — create an account and start a session
- `POST /api/user/login` — start a session
- `POST /api/user` — verify the current session
- `POST /api/user/logout` — clear the session cookie
- `GET /api/a2rp` — API status message

## Project structure

- `backend/` — Express API, MongoDB model, JWT/session utilities
- `frontend/` — React app and protected route guards

## Links

- [Portfolio](https://www.ashishranjan.net)
- [GitHub](https://github.com/a2rp)
- [LinkedIn](https://www.linkedin.com/in/aashishranjan)
- [CodePen](https://codepen.io/ash1198)
