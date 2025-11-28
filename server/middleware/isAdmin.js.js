const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  try {
    const token = req.cookies?.authToken;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.USER_SECRET_KEY);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = isAdmin;
