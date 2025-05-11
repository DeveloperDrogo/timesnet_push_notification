const { sendNotification } = require("../services/notificationService");

exports.sendNotification = async (req, res) => {
    console.log('coming');
  try {
    const { tokens, title, body, dataPayload, keyName } = req.body;

    if (!tokens || !title || !body || !keyName) {
      return res.status(400).send("Tokens, title, body, and keyName are required.");
    }

    const response = await sendNotification(tokens, title, body, dataPayload, keyName);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in notification controller:", error);
    res.status(500).send("Error sending notification.");
  }
};
