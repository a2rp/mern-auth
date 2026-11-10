require("dotenv").config();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const { connectDB } = require("./src/middlewares/connect.db");
const userRoutes = require("./src/routes/user.routes");

const PORT = Number(process.env.PORT) || 1198;
if (!process.env.MONGODB_URI || !process.env.TOKEN_KEY || Buffer.byteLength(process.env.TOKEN_KEY) < 32) {
    throw new Error("Set MONGODB_URI and a TOKEN_KEY with at least 32 bytes in the environment.");
}

const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
            return callback(new Error("Origin not allowed by CORS"));
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.get("/api/a2rp", (req, res) => res.status(200).json({ success: true, message: "A2RP: an Ashish Ranjan project" }));
app.use("/api/user", userRoutes);
app.use((req, res) => res.status(404).json({ success: false, message: "Route not found." }));
app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    if (error.type === "entity.parse.failed") {
        return res.status(400).json({ success: false, message: "Request body must contain valid JSON." });
    }
    if (error.message === "Origin not allowed by CORS") {
        return res.status(403).json({ success: false, message: "This origin is not allowed." });
    }
    console.error("Request failed:", error.message);
    return res.status(500).json({ success: false, message: "Unable to process this request right now." });
});

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
    } catch (error) {
        console.error("Unable to start the API:", error.message);
        process.exitCode = 1;
    }
};

start();
