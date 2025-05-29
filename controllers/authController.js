const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Email không tồn tại" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Sai mật khẩu" });

    const token = jwt.sign(
      { id: user._id, name: user.name, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user: { name: user.name, isAdmin: user.isAdmin } });
  } catch (err) {
    res.status(500).json({ message: "Lỗi đăng nhập", error: err.message });
  }
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email đã tồn tại" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });

    await user.save();

    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi đăng ký", error: err.message });
  }
};
