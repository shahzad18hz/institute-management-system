const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ User find (email lowercase)
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // 2️⃣ Active check
    if (!user.isActive) {
      return res.status(403).json({ message: "Account is disabled" });
    }

    // 3️⃣ Password compare
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 4️⃣ ✅ JWT TOKEN (ID + ROLE)
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role, // 👈 BOHOT ZAROORI
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 5️⃣ Response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
