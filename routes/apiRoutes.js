const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { de } = require("date-fns/locale");

//  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
//  User.prototype.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
//   };
//   // Hooks are automatic methods that run during various phases of the User Model lifecycle
//   // In this case, before a User is created, we will automatically hash their password
//   User.addHook("beforeCreate", function(user) {
//     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
//   });

router.post("/api/sign-up", ({ body }, res) => {
  body.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10), null);
  const user = new db.User(body);
  user.lastUpdatedDate();

  db.User.create(user)
    .then((newlyCreatedUser) => {
      res.status(200).json(omitPassword(newlyCreatedUser));
    })
    .catch((err) => {
      if (err.keyValue.hasOwnProperty("username")) {
        res.status(409).json({ message: "Username already exists" });
      } else if (err.keyValue.hasOwnProperty("email")) {
        res.status(409).json({ message: "Email address already exists" });
      } else {
        res.status(500).json(err);
      }
    });
});

const omitPassword = ({ username, email }) => {
  const newUser = { username, email };
  return newUser;
};

const validatePassword = (submittedPassword, passwordFromDB) =>
  bcrypt.compareSync(submittedPassword, passwordFromDB);

router.post("/api/sign-in", ({ body }, res) => {
  db.User.findOne({ email: body.email })
    .then((response) => {
      if (!response) {
        res.status(401).json({ message: "invalid log-in credentials" });
      }
      const passwordIsCorrect = validatePassword(
        body.password,
        response.password
      );
      passwordIsCorrect
        ? res.status(200).json(omitPassword(response))
        : res.status(401).json({ message: "invalid log-in credentials" });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;


//install express-jwt , json webtokens and .ENV
//jwt to pass in - paylod- whatever you want signed then JWT-secret 
//on response give cookie- then token and you can set expiration
//res.cookie


//user can only access their account - id
//POST with paramatised route
//get req useEffect with react - store it in state
//set up - use postman to test
//formidable 

//use the cookie and use the token - user id as a webtoken 

//a healthy check - hit api endpoint 
//will checkthe service is running ok, will wake up app the heroku
//third health package npm