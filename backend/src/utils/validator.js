
module.exports.isValidEmail = (emailAddress) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);

module.exports.isValidUsername = (username) => {
    return /^[a-zA-Z0-9_]{3,32}$/.test(username);
}

module.exports.isValidPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{12,128}$/.test(password);
};


