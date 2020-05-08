const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const doctorSchema = require('../models/doctor');
const doctor = require('../data/doctor.json');
const bookingSchema = require('../models/booking');

const userSchema = require('../models/user');

// const nodemailer = require('nodemailer');
// const sendgridTransport = require('nodemailer-sendgrid-transport');

// const transporter = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key:
//         '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'
//     }
//   })
// );

exports.createUser = async (req, res, next) => {
  console.log("neter")
  const password = await bcrypt.hash(req.body.password, 10);
  const uId = mongoose.Types.ObjectId();
  console.log("exports.createUser -> uId", uId)
  const user = new userSchema({
    _id: uId,
    firstname: req.body.firstName,
    lastname: req.body.lastName,
    password: password,
    email: req.body.email,
  });
  const result = await user.save();
  console.log("exports.createUser -> result", result);
  res.status(201).json({
    message: 'User created',
    result: result
  });
}

exports.signIn = async (req, res, next) => {
  console.log("exports.signIn ->  process.env.JWT_KEY",  process.env.JWT_KEY)
  let fetchedUser;
  userSchema.findOne({email: req.body.username })
  .then(user => {
    fetchedUser = user;
    console.log("exports.signIn -> fetchedUser", fetchedUser)
    if(!user) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    return bcrypt.compare(req.body.password, user.password)
  }).then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Auth Failed"
      });
    }
    const token = jwt.sign(
      {email: fetchedUser.email, userId: fetchedUser._id},process.env.JWT_KEY,
    { expiresIn: "1h" }
    );
    res.status(200).json({
      authenticated: true,
       token: token,
       expiresIn: 3600,
       username: fetchedUser.firstname
    })
  }).catch(err => {
    return res.status(401).json({
      message: "Auth failed"
    });
  })
}

exports.seedData = (req, res, next) => {
  doctor.forEach(ele => {
    doctorSchema.create({ name: ele.name, gender: ele.gender, image: ele.image, phone: ele.phone, address: "India" }, (err, r) => { 
      console.log("exports.seedData -> r", r)
      console.log("exports.seedData -> err", err)
      res.json({
        result: r
      })
    
      })
  })
  doctorSchema.insertMany(doctor, (err, r) => { 
  console.log("exports.seedData -> r", r)
  console.log("exports.seedData -> err", err)

  })
}

exports.getDoctors = (req, res, next) => {
  doctorSchema.find().then(result => {
    res.status(200).json({
      message: 'Doctors fetched successfully',
      doctors: result,
    });
  }).catch(err => {
    return res.status(401).json({
      message: "Auth failed"
    });
  })
}

exports.getBookings = async (req, res, next) => {
  bookingSchema.find({user: req.userData.userId}).populate('user doctor').then(result => {
    res.status(200).json({
      message: 'Bookings fetched successfully',
      bookings: result,
    });
  }).catch(err => {
    return res.status(401).json({
      message: "Auth failed"
    });
  })
 
}

exports.bookDoctor = (req, res, next) => {
  bookingSchema.create({doctor: req.body.id, user: req.userData.userId}).then(result => {
    res.status(200).json({
      message: 'Doctor Booked successfully',
      booking: result,
    });
  }).catch(err => {
    return res.status(401).json({
      message: "Auth failed"
    });
  })
}

// exports.confirmEmail = async (req, res, next) => {
//   tokenSchema.findOne({ token: req.body.token }).populate("_userId").then(user => {
//   console.log("exports.confirmEmail -> user", user)
//     if (!user) {
//       return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
//     }
//     if (user.active) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
//     user._userId.active = true;
//     user._userId.save().then((result) => {
//       console.log("exports.confirmEmail -> result", result)
//       if (result) return res.status(200).json({ done: true ,message:"The account has been verified. Please log in."});
//     });

//   })
// }
