const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: { type: String, required: true },
  image: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});


module.exports = mongoose.model('Doctor', doctorSchema);
