import jsonwebtoken from "jsonwebtoken";
import {expressjwt} from "express-jwt";
import User from "../models/user.model";
import {config} from "../utils/config";
export const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }
  next();
};
export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }
    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({
        error: "Email and password don't match.",
      });
    }
    const token = jsonwebtoken.sign(
      {
        _id: user._id,
      },
      config.JWT_SECRET
    );
    res.cookie("t", token, {
      expire: new Date() + 9999,
    });
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(401).json({
      error: "Could not log in",
    });
  }
};
export const logout = (req, res) => {
    res.clearCookie("t");
    return res.json({
        message: "logged out",
    });
    }
export const requireLogin = expressjwt({
    secret: config.JWT_SECRET,
    userProperty: "auth",
    algorithms: ["HS256"],
});
