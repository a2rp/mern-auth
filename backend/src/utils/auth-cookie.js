const secure = process.env.NODE_ENV === "production";
const sharedOptions = { httpOnly: true, secure, sameSite: "strict", path: "/" };

module.exports = {
    authCookieOptions: { ...sharedOptions, maxAge: 3 * 24 * 60 * 60 * 1000 },
    clearAuthCookieOptions: sharedOptions,
};
