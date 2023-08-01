const bcrypt = require('bcrypt');
const User = require('../models/user');

async function signup(req, res) {
  try {
    
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!!user) {
      return res.status(401).json({ error: 'User Already Exist' });
    }
    else{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        const savedUser = await User.findById(user._id);
        res.json({message:'User Saved successfully',data:savedUser});

    }
    
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
}

module.exports = {
  signup,
  login,
};
