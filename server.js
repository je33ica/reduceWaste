const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger("dev"));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(
  session({
    saveUninitialized: false,
    resave: true,
    secret: process.env.SECRET,
  })
);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reducewaste", {
  useNewUrlParser: true,
  useFindAndModify: false,
  // useUnifiedTopology: true,
});

// set up routes

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use(routes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Reduce waste is running on port: ${PORT}`);
});
