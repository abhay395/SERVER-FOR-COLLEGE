const mongoose = require("mongoose");
const express = require("express");
const User = require("./models/User.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const crypto = require("crypto");

//Routers
const departmentHeadRouter= require("./routes/Departement.routes");
const authRouter = require("./routes/Auth.routes");
const userRouter = require("./routes/User.routes");
const sliderRouter = require('./routes/Slider.routes')
const studentRouter = require('./routes/Student.routes')
const teacherRouter=require('./routes/Teacher.routes')
const timeTableRouter = require('./routes/TimeTable.routes')
const uploadRouter = require('./routes/Upload.routes')
const path = require('path')

//passport js
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
// // const GoogleStrategy = require("passport-google-oauth20").Strategy;
// // const GitHubStrategy = require("passport-github").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;

//cors for set cors origen
const cors = require("cors");

// CookieExtractor For Extracte cookies from request
const { cookieExtractor, isAuth } = require("./service/com");
const cookieParser = require("cookie-parser");

// TODO: cors setup
app.use(express.static('build'))
app.use(
  cors()
);

// Cloudinary setUp
// const cloudinary = require("./config/cloudinaryConfig");
// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });
// app.post("/upload", upload.single("pdf"), async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       resource_type: "raw", // Set to "raw" for PDFs
//     });
//     res.json({ url: result.secure_url });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// TODO: body parser
app.use(express.json());
app.use(cookieParser());

// TODO: session setup
app.use(
  session({
    secret: "shhh",
    resave: false,
    saveUninitialized: false,
  })
);

// TODO: session passport initalize
app.use(passport.session());
app.use(passport.initialize());

// TODO: JWT opts Objecte set
const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY;

// ?? Strategies

//  ** Local strategies
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email }).exec();
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }
        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          "sha256",
          function (err, hashedPassword) {
            if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
              return done(null, false, { message: "Incorrect password." });
            }
            const token = jwt.sign(
              { name: user.name, _id: user.email },
              process.env.JWT_SECRET_KEY
            );
            // // console.log(token);
            return done(null, token);
          }
        );
      } catch (error) {
        // // console.log(error);
        return done(null, { message: "unautherized" });
      }
    }
  )
);

//  ** jwt strategies

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const { _id } = jwt_payload;
      console.log(jwt_payload);
      // // console.log("jwt payload",jwt_payload)
      // // console.log("user",data)
      if (_id) {
        return done(null, _id);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done({ message: "unauth" }, false);
    }
  })
);

//  ** passport Serializer and deserializer
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get('*',(req,res)=>res.sendFile(path.resolve('build','index.html')))
app.use("/auth", authRouter.router);
app.use("/user", isAuth(), userRouter.router);
app.use("/department-head", departmentHeadRouter.router);
app.use('/slider',sliderRouter.router);
app.use("/student", studentRouter.router);
app.use('/teacher',teacherRouter.router);
app.use('/timeTable',timeTableRouter.router);
app.use('/upload',uploadRouter.router);


// app.use("/check", isAuth(), checkRouter.router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGODB_URL)

  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
