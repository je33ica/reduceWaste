const router = require("express").Router();
const userController = require("../../controllers/userController");
// const passport = require("passport");

const invalidateSession = (req, res, next) => req.session.regenerate(next);

const destroySession = (req, res, next) => {
  if (req.session.userId !== undefined) {
    req.session.destroy();
    res.status(200).json({ message: "successfully logged out" });
  } else {
    res.status(401).send({
      error: "forbidden",
      message: "You can't log out if you aren't logged in!",
    });
  }


};

const homePageCheck = (req, res, next) => {
  if (req.session.userId !== undefined) {
    return next();
  }

  res.status(200).send({
    message: "No user currently logged in!",
  });
};

const isUserLoggedIn = (req, res, next) => {
  if (req.session.userId !== undefined) {
    return next();
  }

  res.status(401).send({
    error: "forbidden",
    message: "user must be signed in to access this page",
  });
};

//creating a default route that simply gets the users identity, this is required for
// some front end routing]

router.get("/", homePageCheck, userController.getUser);

//due to express routing, the "/" matches "/api/users"
// because of the folder/file structure
router.post("/sign-up", invalidateSession, userController.userSignUp);
//sends get and post requests on default route
//to the users controller which posts to mongodb
router.post("/login", invalidateSession, userController.userLogIn);
router.post("/logout", destroySession);

router.get("/products", isUserLoggedIn, userController.getProducts);
router.put("/products", userController.addProduct);
// isUserLoggedIn,
// .put(userController.addProduct)

module.exports = router;
