const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resourceController");

// Upload a resource
router.post("/upload-resource", resourceController.upload.single("file"), resourceController.uploadResource);

// Get all resources
router.get("/resources", resourceController.getAllResources);

module.exports = router; 