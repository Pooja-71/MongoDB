const express = require ('express');
const app= express();
// const userModel = require('./usermodel')
const path= require ("path");

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({express:true}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render("index");
})

app.get("/read", (req, res) => {
  res.render("read");
});

// app.get("/create", async (req, res) => {
//   let createuser = await userModel.create({
//     name:"harsh",
//     username:"harsh",
//     email: "harsh@gmail.com"
//   })

//   res.send(createuser);
// });

// app.get("/update", async (req, res) => {
  
//   let updateduser = await userModel.findOneAndUpdate({username: "harsh"}, {username:"harsh sharma"}, {new:true} )
//   res.send(updateduser);
// });

// app.get("/read", async (req, res) => {
//   let users = await userModel.find();
//   res.send(users);
// });

// app.get("/delete", async (req, res) => {
//   let users = await userModel.findOneAndDelete({username:"harsh"});
//   res.send(users);
// });

app.listen(3000);