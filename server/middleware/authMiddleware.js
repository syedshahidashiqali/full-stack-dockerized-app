const jwt = require("jsonwebtoken");

const config = process.env;

exports.verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];
  // req.body.token || req.query.token || req.headers["x-access-token"];

  console.log("10 => req.body.token", req.body.token);
  console.log("11 => req.query.token", req.query.token);
  console.log("12 => req.headers['Authorization']", req.headers["Authorization"]);
  console.log("13 => req.headers", req.headers);

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    console.log("Decoded issss:", decoded);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};