const isTrainer = (req, res, next) => {
  if (req.user.role !== "trainer") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = isTrainer;