const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }
});


module.exports = mongoose.model('Booking', bookingSchema);
