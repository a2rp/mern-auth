# MERN Auth API

Express API for the MERN Auth Workspace. It connects to MongoDB, hashes account passwords with bcryptjs, and issues JWT sessions in HttpOnly cookies.

## Setup

Copy `.env.example` to `.env`, configure `MONGODB_URI`, and replace `TOKEN_KEY` with a random secret of at least 32 bytes. Then run:

```bash
npm ci
npm start
```

The API listens on port `1198` by default. `CLIENT_ORIGIN` can contain a comma-separated list of allowed browser origins. Set `NODE_ENV=production` behind HTTPS to enable the cookie's Secure flag.

## Routes

- `POST /api/user/register`
- `POST /api/user/login`
- `POST /api/user` — verify the session
- `POST /api/user/logout`
- `GET /api/a2rp` — API status
