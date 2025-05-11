module.exports = (req, res, next) => {
  const { tokens, title, body, keyName } = req.body;
  if (!tokens || !title || !body || !keyName) {
    return res
      .status(400)
      .send("Tokens, title, body, and keyName are required.");
  }
  next();
};
