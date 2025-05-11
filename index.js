const express = require("express");
const bodyParser = require("body-parser");
const notificationRoutes = require("./src/routes/notificationRoutes");

// Initialize Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Use the routes defined in notificationRoutes and whatsappRoutes
app.use("/", notificationRoutes);

// Start the server on localhost
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running`);
});
