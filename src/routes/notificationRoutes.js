const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const validateNotification = require("../middleware/validateNotification");


// POST route to send notifications
router.post("/send-notification", validateNotification, notificationController.sendNotification);

module.exports = router;
