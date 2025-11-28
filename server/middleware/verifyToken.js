const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // First try to get token from cookie
  let token = req.cookies?.authToken;

  // If not in cookie, try Authorization header (for backward compatibility)
  if (!token) {
    const auth = req.headers["authorization"];
    token = auth && auth.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token not present",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.USER_SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = verifyToken;
