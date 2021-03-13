const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reducewaste", {
  useNewUrlParser: true,
  useFindAndModify: false,
  // useUnifiedTopology: true,
});

app.use(express.static("public"));
app.use(require("./routes/htmlRoutes"));
//app.use(require("./routes/apiRoute"));
// set up routes

app.listen(PORT, () => {
  console.log(`Reduce waste is running on port: ${PORT}`);
});
