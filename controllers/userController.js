const db = require("../models");
const bcrypt = require("bcryptjs");
const nodeMailerController = require("./nodeMailerController");

const omitPassword = ({ username, email, userCreated }) => {
  const newUser = { username, email, userCreated };
  return newUser;
};

const validatePassword = (submittedPassword, passwordFromDB) =>
  bcrypt.compareSync(submittedPassword, passwordFromDB);

module.exports = {
  getUser: (req, res) => {
    db.User.findById(req.session.userId)
      .then((dbUser) => res.json(omitPassword(dbUser)))
      .catch((err) =>
        res.status(200).json({ message: "user not currently logged in" })
      );
  },
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
        res.status(200).json(omitPassword(newlyCreatedUser));
        nodeMailerController.sendMail(
          newlyCreatedUser.email,
          `Welcome to Reduce Waste ${newlyCreatedUser.username}, never waste food again!`,
          `<h1>Thank you for signing up ${newlyCreatedUser.username}</h1>`
        );
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
          res.status(401).json({ message: "Invalid login credentials" });
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
          res.status(401).json({ message: "Invalid login credentials" });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  addProduct: (req, res) => {
    db.User.findByIdAndUpdate(
      req.session.userId,
      { $push: { products: { $each: req.body } } },
      { new: true }
    )
      .then((dbUser) => res.json(dbUser.products[dbUser.products.length - 1]))
      .catch((err) => res.status(400).json(err));
  },
  getProducts: (req, res) => {
    db.User.findById(req.session.userId).then((dbUser) => {
      const sortedProducts = dbUser.products.sort((productA, productB) => {
        return new Date(productA.expiry) - new Date(productB.expiry);
      });
      res.json(sortedProducts);
    });
  },

  removeProduct: (req, res) => {
    db.User.findByIdAndUpdate(req.session.userId, {
      $pull: { products: { _id: req.body._id } },
    })
      .then((response) => {
        res.json({ message: "successfully deleted product" });
      })
      .catch((err) => res.status(400).json(err));
  },
  searchBarcode: (req, res) => {
    db.User.findById(req.session.userId).then((dbUser) => {
      const product = dbUser.products.find(dbProduct => {
        return dbProduct.EAN === req.body.EAN;
      })
      if (product){
        return res.json(product)
      } else{
        return res.status(204).json({message: "no product with that barcode"})
      }
    }).catch((err) => res.status(500).json(err));
  }
};
