const express = require("express");
const mongoose = require("mongoose");

const userModel = require("./models/user");
const postModel = require("./models/post");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/mongopractice")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

// app.use(cookieParser());

// app.get("/", (req, res) => {
//   let token = jwt.sign({email: "harsh@gmail.com"}, "secret");
//   res.cookie("token", token);
//   res.send("done");
//     });

app.get("/create", async function (req, res) {
  let user = await userModel.create({
    username: "harsh",
    age: 25,
    email: "harsh@gmail.com",
  });
  res.send(user);
});

app.get("/post/create", async function (req, res) {
  let post = await postModel.create({
    postdata: "this is post data",
    user: "6a8490f1f47bc183518ef1bd",
  });

  let user = await userModel.findOne({
    _id: "6a8490f1f47bc183518ef1bd",
  });

  user.posts.push(post._id);

  await user.save();

  res.send({ post, user });
});

// app.get("/", (req, res) => {
//   bcrypt.genSalt(10, function (err, salt) {
//     bcrypt.hash("hehhehhe", salt, function (err, hash) {
//       console.log(hash);
//       res.send("hello");
//     });
//   });
// });

// app.get("/read", (req, res) => {
//   console.log(req.cookies);
//   res.send("read page");
// });

// const path = require("path");
// const userModel = require("./models/user");

// app.set("view engine", "ejs");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, "public")));

// // Home page
// app.get("/", (req, res) => {
//   res.render("index");
// });

// // Read all users
// app.get("/read", async (req, res) => {
//   let users = await userModel.find();
//   res.render("read", { users });
// });

// // Edit user
// app.get("/edit/:id", async (req, res) => {
//   let user = await userModel.findOne({ _id: req.params.id });
//   res.render("edit", { user });
// });

// // Update user
// app.post("/update/:id", async (req, res) => {
//   let { name, email, imageurl } = req.body;

//   let user = await userModel.findOneAndUpdate(
//     { _id: req.params.id },
//     {
//       name,
//       email,
//       imageurl
//     },{new:true}
//   );
//   res.redirect("/read");
// });

// // Create user
// app.post("/create", async (req, res) => {
//   let { name, email, imageurl } = req.body;

//   let createdUser = await userModel.create({
//     name,
//     email,
//     image: imageurl,
//   });

//   res.redirect("/read");
// });

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
