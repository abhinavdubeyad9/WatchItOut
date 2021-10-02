const User = require("../models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    User.create(
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
        password: hashedPassword,
      },
      function (error, result) {
        //check for error
        if (error) {
          return res.json({
            status: false,
            message: "DB insert fail...",
            error: error,
          });
        }
        //if no error exist then create jwt token
        let token = jwt.sign(
          { id: result._id, name: result.name, role: result.role },
          jwtSecretKey,
          {
            expiresIn: "2h",
          }
        );

        return res.json({
          status: true,
          message: "success",
          id: result._id,
          name: result.name,
          role: result.role,
          token: token,
        });
      }
    );
  } catch {
    res.status(500).send("error occured");
  }
};

const login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({
    $or: [{ email: username }, { phone: username }],
  }).lean();

  if (!user) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }
  //this will compare password and return true if matched
  if (await bcrypt.compare(password, user.password)) {
    let token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      jwtSecretKey,
      {
        expiresIn: "2h",
      }
    );

    return res.status(201).json({
      status: "success",
      message: "login successful",
      id: user._id,
      name: user.name,
      role: user.role,
      token,
    });
  }

  return res.json({ status: "error", error: "Invalid username/password" });
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  //auth header will be like 'Bearer token'
  //if we have header then only we will pick token
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).send("token not found");

  jwt.verify(token, jwtSecretKey, (err, user) => {
    if (err) return res.send(403).status("Access Denied");
    //this user object will receive name and role
    req.user = user;
    next();
  });
};

function authenticateRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401);
      return res.send("Not allowed");
    }
    next();
  };
}

module.exports = {
  register,
  login,
  authenticateToken,
  authenticateRole,
};
