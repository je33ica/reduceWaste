//due to express routing, the "/" matches "/api/ocr"
// because of the folder/file structure
const ocrController = require("../../controllers/ocrController");

const router = require("express").Router();

router.post("/", ocrController.sendImage);

module.exports = router;
