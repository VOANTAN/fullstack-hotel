const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Không có token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Token không hợp lệ" });
  }
};

exports.isAdmin = (req, res, next) => {
  if (!req.user?.isAdmin)
    return res.status(403).json({ message: "Chỉ admin mới được phép" });
  next();
};
