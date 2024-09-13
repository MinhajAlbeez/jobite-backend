const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const InfoModel = require('./models/Information')

const PORT = 8000;

mongoose.connect("mongodb+srv://syedminhajalbeez:zyApjtmrFROqg6PS@cluster0.ogtzf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

app.get('/', (req, res) => {
    InfoModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

app.post("/createInfo", (req, res) => {
    InfoModel.create(req.body)
      .then(user => res.json(user))
      .catch(err => res.json(err));
  });
  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
