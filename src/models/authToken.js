const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Oturum yok" });
  }

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Erişim izniniz yok" });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
