const jwt = require("jsonwebtoken");
import { JWT_SECRET } from "../config";

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
    req.user = payload.userID;

    next();
  } catch (e) {
    res.status(401).json({
      message: "Unauthorized"
    });
  }
  res.redirect("/login");
}

module.exports ={ 
  authMiddleware
}