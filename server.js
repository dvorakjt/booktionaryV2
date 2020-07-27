const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require('mongoose');
const Book = require('./models/book');
const cors = require('cors');

//connect to the database!
mongoose.connect(process.env.MONGODB_URI || "mongodb://user1>:password1@ds235411.mlab.com:35411/heroku_v2pvz6xn");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// API Routes
//Adding a book
app.post("/api/addbook", ({ body }, res) => {
  console.log(body);
  Book.create(body)
    .then(dbBook => {
      res.json(dbBook);
    })
    .catch(err => {
      res.json(err);
    });
});

//Get all books
app.get("/api/getbooks", (req, res) => {
  Book.find({}).then(results => {
    res.json(results);
  });
});

app.delete("/api/delete/:googleId", (req, res) => {
  const { googleId } = req.params;
  Book.deleteOne({ googleId: googleId }, function (err, results) {
    if (err) console.log(err);
    else res.json(results);
  });
});


// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
