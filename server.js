const mongoose = require("mongoose");
const logger = require("morgan");
const express = require("express");

const db = require("./models");
const app = express();

const PORT = process.env.PORT || 7000;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/exercisedb", { useNewUrlParser: true });


var routes = require("./routes/html-routes.js");
app.use(routes);

// get last workoutulte
app.get("/api/workouts", (req, res) => {
  
  db.Workout.find({}).populate("exercises").then(dbWorkout => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });

});

// get all workout info
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .populate("exercises")
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// add exercises
app.put("/api/workouts/:id", (req, res) => {
  
  db.Exercises.create(req.body).then(({_id}) => db.Workout.findOneAndUpdate({_id: req.params.id},{$push: {exercises: _id}}, {new: true}))
  .then(dbWorkout =>{
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

// create workout
app.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });

});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});