const bcrypt = require("bcrypt");
const User = require("../models/user");

async function signup(req, res) {
  try {
    const { firstName,lastName,email,phonenumber, password } = req.body;
    const useremail = await User.findOne({ email });
    const usermobile = await User.findOne({ phonenumber });
    if (!!useremail ||!!usermobile) {
      return res.status(401).json({ error: "User Already Exist" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ firstName,lastName,email,phonenumber, password: hashedPassword, });
      await user.save();
      const savedUser = await User.findById(user._id);
      res.json({ message: "User Saved successfully", data: savedUser });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ message: "Login successful",data:user });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while logging in" });
  }
}

module.exports = {
  signup,
  login,
};
