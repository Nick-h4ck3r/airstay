const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const admin = require("firebase-admin");

require("dotenv").config();

// const serviceAccount = require("./firebase.json");
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
// console.log(serviceAccount);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "airstay-6c8e3.appspot.com",
});

const bucket = admin.storage().bucket();

// importing models here
const User = require("./models/User");
const Place = require("./models/Place");
const Booking = require("./models/Booking");

const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

const upload = multer({
  storage: multer.memoryStorage(),
});


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
// app.use("/uploads", express.static("uploads"));
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

app.post("/logout", async (req, res) => {
  res.cookie("token", "").json(true);
});

// app.post("/upload-by-link", async (req, res) => {
//   const { link } = req.body;
//   const newName = "photo" + Date.now() + ".jpg";
//   await imageDownloader.image({
//     url: link,
//     dest: __dirname + "/uploads/" + newName,
//   });
//   res.json(newName);
// });

// const photosMiddleware = multer({ dest: "uploads/" });

// app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
//   const uploadedFiles = [];
//   for (let i = 0; i < req.files.length; i++) {
//     const { path, originalname } = req.files[i];s
//     const parts = originalname.split(".");
//     const ext = parts[parts.length - 1];
//     const newPath = path + "." + ext;
//     fs.renameSync(path, newPath);
//     uploadedFiles.push(newPath.replace("uploads\\", ""));
//   }
//   res.json(uploadedFiles);
// });

app.post("/upload", upload.array("photos", 100), async (req, res) => {
  const uploadedFiles = [];
  for (const file of req.files) {
    const parts = file.originalname.split(".");
    const ext = parts[parts.length - 1];
    const newName = "photo" + Date.now() + "." + "jpg";
    const blob = bucket.file(newName);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });
    blobStream.on("error", (err) => {
      console.log(err);
      res.status(500).json({ error: "Something is wrong" });
    });
    blobStream.on("finish", () => {
      uploadedFiles.push(newName);
      if (uploadedFiles.length === req.files.length) {
        res.status(200).json(uploadedFiles);
      }
    });
    blobStream.end(file.buffer);
  }
});

app.post("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});

app.get("/user-places", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.find({ owner: userData.id });
    res.json(placeDoc);
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  const placeDetails = await Place.findById(id);
  res.json(placeDetails);
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json(placeDoc);
    }
  });
});

app.get("/places", async (req, res) => {
  const places = await Place.find();
  res.json(places);
});

app.post("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;

  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: userData.id,
  })
    .then((bookingDoc) => {
      res.json(bookingDoc);
    })
    .catch((err) => {
      throw err;
    });
});

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.get("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const bookings = await Booking.find({ user: userData.id }).populate("place");
  res.json(bookings);
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
