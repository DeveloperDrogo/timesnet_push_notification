const admin = require("firebase-admin");
const serviceAccountPaths = require("../utils/serviceAccountPaths");

exports.sendNotification = async (tokens, title, body, dataPayload, keyName) => {
  const serviceAccountPath = serviceAccountPaths[keyName];
  if (!serviceAccountPath) {
    throw new Error("Invalid keyName provided.");
  }

  // Load the service account key dynamically
  const serviceAccount = require(serviceAccountPath);

  // Clear any existing Firebase apps before initializing a new one
  if (admin.apps.length) {
    admin.app().delete();
  }

  // Initialize Firebase Admin SDK with the specific service account
  const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const messaging = firebaseApp.messaging();

  // Define the message to be sent
  const message = {
    notification: {
      title: title,
      body: body,
    },
    data: dataPayload || {},
    tokens: tokens,
  };

  try {
    // Send the multicast message to multiple devices
    const response = await messaging.sendEachForMulticast(message);
    const successCount = response.successCount;
    const failureCount = response.failureCount;

    // Return the result of the operation
    return {
      message: `${successCount} messages were sent successfully, ${failureCount} failed.`,
      failures: response.responses
        .map((resp, idx) => {
          if (!resp.success) {
            return {
              token: tokens[idx],
              error: resp.error.message,
            };
          }
          return null;
        })
        .filter((failure) => failure !== null),
    };
  } catch (error) {
    console.error("Error sending multicast message:", error);
    throw error;
  }
};
