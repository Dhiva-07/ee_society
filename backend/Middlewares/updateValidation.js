const jwt = require("jsonwebtoken");

const updateValidation = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res
      .status(403)
      .json({ message: "Unauthorized , JWT token is required" });
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    if (decoded._id != req.params.id) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized , JWT token is expired" });
  }
};

module.exports = updateValidation;
