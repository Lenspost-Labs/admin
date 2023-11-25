const jsonwebtoken = require("jsonwebtoken");

function generateJwt(email) {
  return jsonwebtoken.sign({ email }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15m", // Set the expiration time to one day (you can adjust this as needed)
  });
}

module.exports = generateJwt;
