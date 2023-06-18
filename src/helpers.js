const jwt = require("jsonwebtoken");

exports.generateJwtToken = (_id, email) => {
    return jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
};

exports.genJwt = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.JWT_SECRET_ADMIN, {
      expiresIn: "30d",
    });
};