# MERN Auth Frontend

React client for the MERN Auth API. It keeps session tokens in an HttpOnly cookie and asks the API to verify the signed-in user instead of reading the cookie in JavaScript.

## Run locally

Start the backend first, then run:

```bash
npm ci
npm start
```

The API base URL defaults to `http://localhost:1198/api`. To change it, add a frontend `.env` file containing `REACT_APP_API_URL=https://api.example.com/api`. The backend must allow the frontend origin with `CLIENT_ORIGIN`.
