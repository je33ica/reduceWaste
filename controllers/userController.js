const db = require("../models");
const bcrypt = require("bcryptjs");

const omitPassword = ({ username, email }) => {
  const newUser = { username, email };
  return newUser;
};

const validatePassword = (submittedPassword, passwordFromDB) =>
  bcrypt.compareSync(submittedPassword, passwordFromDB);

module.exports = {
  userSignUp: ({ body }, res) => {
    body.password = bcrypt.hashSync(
      body.password,
      bcrypt.genSaltSync(10),
      null
    );
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
  },
  userLogIn: ({ body }, res) => {
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
  },
};
