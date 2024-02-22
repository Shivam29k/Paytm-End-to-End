const jwt = require("jsonwebtoken");
const { JWT_SECRET }  = require("../config");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json({
      message: "Unauthorized"
    });
    return;
  }

  const token = authHeader.split(" ")[1];
  
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userID = payload.userID;
    return next();
  } catch (e) {
    res.status(401).json({
      message: "Unauthorized",
      error: e
    });
  }
  res.redirect("/login");
}

module.exports = { 
  authMiddleware
}