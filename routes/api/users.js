const router = require("express").Router();
const userController = require("../../controllers/userController");
const passport = require("passport");

//due to express routing, the "/" matches "/api/users"
// because of the folder/file structure
router.route("/sign-up").post(userController.userSignUp);
//sends get and post requests on default route
//to the users controller which posts to mongodb
router
  .route("/login", passport.authenticate("local"))
  .post(userController.userLogIn);
//remove, findbyid update
//uses param route to target the necessary user
// router.route("/:id")
//   .delete(booksController.remove)
//   .put(booksController.update)
//   .get(booksController.findById)

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
