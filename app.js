const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Read all users
app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.render("read", { users });
});

// Edit user
app.get("/edit/:id", async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.id });
  res.render("edit", { user });
});

// Update user
app.post("/update/:id", async (req, res) => {
  let { name, email, imageurl } = req.body;

  let user = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      name,
      email,
      imageurl
    },{new:true}
  );
  res.redirect("/read");
});

// Create user
app.post("/create", async (req, res) => {
  let { name, email, imageurl } = req.body;

  let createdUser = await userModel.create({
    name,
    email,
    image: imageurl,
  });

  res.redirect("/read");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
