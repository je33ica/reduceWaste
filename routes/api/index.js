const router = require("express").Router();
const userRoutes = require("./users");
const ocrRoutes = require("./ocr");
const recipeRoutes = require("./recipe")

router.use("/users", userRoutes);
router.use("/ocr", ocrRoutes);
router.use("/recipe", recipeRoutes);

module.exports = router;
