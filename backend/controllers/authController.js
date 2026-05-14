const User = require("../models/user");          // Admin
const Receptionist = require("../models/Receptionist");
const Teacher = require("../models/Teacher");    // ✅ NEW
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const lowerEmail = email.toLowerCase();

    let user = null;
    let role = null;

    // 1️⃣ Admin check
    user = await User.findOne({ email: lowerEmail });
    if (user) role = "admin";

    // 2️⃣ Receptionist check
    if (!user) {
      user = await Receptionist.findOne({ email: lowerEmail });
      if (user) role = "receptionist";
    }

    // 3️⃣ Teacher check
    if (!user) {
      user = await Teacher.findOne({ email: lowerEmail });
      if (user) role = "teacher";
    }

    // 4️⃣ Agar kahin se bhi na mile
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 5️⃣ Active check
    if (user.isActive === false) {
      return res.status(403).json({ message: "Account is disabled" });
    }

    // 6️⃣ Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 7️⃣ JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 8️⃣ Response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        role: role,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
