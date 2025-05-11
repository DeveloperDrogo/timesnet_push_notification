const admin = require("firebase-admin");

exports.initializeFirebase = (serviceAccount) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
};
