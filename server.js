const mongoose = require("mongoose");
const express = require("express");

const Workout = require("./models/exerciseModel.js");
const app = express();

const PORT = process.env.PORT || 7000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/exercisedb", { useNewUrlParser: true });


var routes = require("./routes/html-routes.js");

app.use(routes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});