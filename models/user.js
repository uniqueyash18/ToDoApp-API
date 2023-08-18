const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phonenumber:Number,
  password: String,

});

module.exports = mongoose.model('User', userSchema);
