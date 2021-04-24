const recipeController = require("../../controllers/recipeController");

const router = require("express").Router();
//this route will be hit on /api/recipe
router.post("/", recipeController.findRecipes);

module.exports = router