const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcryptjs");
const { id } = require("date-fns/locale");

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
      res.json(omitPassword(newlyCreatedUser));
    })
    .catch((err) => {
      res.json(err);
    });
});

const omitPassword = ({ username, email }) => {
  const newUser = { username, email };
  return newUser;
};

module.exports = router;
