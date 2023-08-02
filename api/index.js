const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(cors());

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

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
