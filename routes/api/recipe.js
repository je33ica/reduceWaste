const recipeController = require("../../controllers/recipeController");

const router = require("express").Router();

router.post("/", recipeController.findRecipes);

module.exports = router