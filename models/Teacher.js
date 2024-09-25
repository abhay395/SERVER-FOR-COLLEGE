const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qualification: { type: String ,required: true },
  image: { type: String },
  contact: { type: String,required: true },
  subject: { type: String },
  post: { type: String ,required: true ,enum: ["Faculty", "HOD", "Principal","Staff"] },
});

module.exports = mongoose.model('Teacher', TeacherSchema);


const a={name: "Abhay",
qualification: "MCA ,BCA",
image: "https://res.cloudinary.com/dhcszkydc/image/upload/v1726813715/id4kju5v3ggg2s7tpvyx.png",
contact: "Abhay@gmail.com"
}