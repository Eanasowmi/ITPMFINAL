const express = require("express");
const { uploadImage, upload } = require("../controllers/cloudinaryController");
const router = express.Router();

router.post("/uploadimage", upload.single("file"), uploadImage);

module.exports = router;
