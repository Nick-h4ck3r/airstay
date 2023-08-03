const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json({
    ok: true,
    msg: "Test API success - get",
  });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json({ ok: false, msg: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await User.findOne({ email });

  if (userDoc) {
    // res.json("found")
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          // res.cookie('token', token).json("password is correct.")
          res.cookie("token", token, { httpOnly: true }).json(userDoc);
          console.log(token);
        }
      );
    } else {
      res.status(422).json("incorrect password");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);

      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", async(req,res) =>{
  res.cookie('token', '').json(true);
})

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
