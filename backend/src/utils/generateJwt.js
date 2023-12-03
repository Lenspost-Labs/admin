const jsonwebtoken = require("jsonwebtoken");

function generateJwt(email) {
  return jsonwebtoken.sign({ email }, process.env.JWT_SECRET_KEY, {
    expiresIn: "60m", 
  });
}

module.exports = generateJwt;
