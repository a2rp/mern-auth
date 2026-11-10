const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res) => {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ success: false, message: "Authentication required." });

    let payload;
    try {
        payload = jwt.verify(token, process.env.TOKEN_KEY, { algorithms: ["HS256"] });
    } catch {
        return res.status(401).json({ success: false, message: "Authentication required." });
    }

    try {
        const user = await User.findById(payload.id).select("_id username email");
        if (!user) return res.status(401).json({ success: false, message: "Authentication required." });
        return res.json({
            success: true,
            user: { id: user._id.toString(), username: user.username, email: user.email },
        });
    } catch (error) {
        console.error("Session verification failed:", error.message);
        return res.status(500).json({ success: false, message: "Unable to verify the session right now." });
    }
};
