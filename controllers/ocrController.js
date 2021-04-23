const cloudinary = require("cloudinary").v2;
const postToOCR = require("../utils/ocr");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

module.exports = {
  sendImage: async (req, res) => {
    cloudinary.uploader.upload(
      req.body.image,
      { tags: "receiptUpload" },
      async (err, img) => {
        if (err) {
          res.status(500).json({
            message:
              "Cloudinary service is temporarily down. Please try again later",
          });
        } else {
          const resultsFromOcr = await postToOCR(img.url);
          if (resultsFromOcr === "Error: Could not obtain data from Azure") {
            res.status(500).json({ message: resultsFromOcr });
          } else {
            res.status(200).json(resultsFromOcr);
          }
        }
      }
    );
  },
};
