const express = require ('express');
const app= express();
const userModel = require('./usermodel')

app.get('/', (req, res) => {
    res.send("hey");
})

app.get("/create", async (req, res) => {
  let createuser = await userModel.create({
    name:"harsh",
    username:"harsh",
    email: "harsh@gmail.com"
  })

  res.send(createuser);
});

app.get("/update", async (req, res) => {
  
  let updateduser = await userModel.findOneAndUpdate({username: "harsh"}, {username:"harsh sharma"}, {new:true} )
  res.send(updateduser);
});

app.listen(3000);