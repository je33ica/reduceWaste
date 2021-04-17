const router = require("express").Router();
const userRoutes = require("./users");
const ocrRoutes = require("./ocr");

router.use("/users", userRoutes);
router.use("/ocr", ocrRoutes);

module.exports = router;
