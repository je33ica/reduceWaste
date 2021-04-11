const db = require("../models");
const bcrypt = require("bcryptjs");
// const passport = require("passport");
// var LocalStrategy = require("passport-local").Strategy;

// use static authenticate method of model in LocalStrategy
// passport.use(new LocalStrategy(db.User.authenticate()));

// // use static serialize and deserialize of model for passport session support
// passport.serializeUser(db.User.serializeUser());
// passport.deserializeUser(db.User.deserializeUser());

const omitPassword = ({ username, email }) => {
  const newUser = { username, email };
  return newUser;
};

const validatePassword = (submittedPassword, passwordFromDB) =>
  bcrypt.compareSync(submittedPassword, passwordFromDB);

module.exports = {
  userSignUp: (req, res) => {
    const { body } = req;
    body.password = bcrypt.hashSync(
      body.password,
      bcrypt.genSaltSync(10),
      null
    );
    const user = new db.User(body);
    user.lastUpdatedDate();
    db.User.create(user)
      .then((newlyCreatedUser) => {
        req.session.userId = newlyCreatedUser._id;
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
  },
  userLogIn: (req, res) => {
    const { body } = req;
    db.User.findOne({ email: body.email })
      .then((response) => {
        if (!response) {
          res.status(401).json({ message: "invalid log-in credentials" });
        }
        const passwordIsCorrect = validatePassword(
          body.password,
          response.password
        );
        if (passwordIsCorrect) {
          //apply the users id as a session token
          req.session.userId = response._id;
          res.status(200).json(omitPassword(response));
        } else {
          res.status(401).json({ message: "invalid log-in credentials" });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  addProduct: (req, res) => {
    console.log(req.session.userId);
    db.User.findByIdAndUpdate(
      req.session.userId,
      { $push: { products: req.body } },
      { new: true }
    )
      .then((dbUser) => res.json(dbUser.products[dbUser.products.length - 1]))
      .catch((err) => res.status(400).json(err));
  },
  getProducts: (req, res) => {
    console.log(req.session.userId);
    // res.json("hello");
    db.User.findById(req.session.userId).then((dbUser) =>
      res.json(dbUser.products)
    );
  },
};
