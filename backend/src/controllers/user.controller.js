import User from "../models/user.model";
import _ from "lodash";
import fs from "fs";

import formidable from "formidable";
export const passwordComplexity = (req, res, next) => {
  const password = req.body.password;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).send({
      message:
        "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
    });
  }

  next();
};

export const create = async (req, res) => {
  const user = new User(req.body);

  try {
    const userAlreadyExists = await User.findOne({ email: user.email });
    if (userAlreadyExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    await user.save();

    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "something went wrong",
    });
  }
};

export const userByID = async (req, res, next, id) => {
  console.log("userByID");
  try {
    const user = await User.findById(id);
    if (!user)
      return res.status("401").json({
        error: "User not found",
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status("401").json({
      error: "Could not retrieve user",
    });
  }
};
export const read = (req, res) => {
  req.profile.hashedPassword = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};
export const list = async (req, res) => {
  try {
    let users = await User.find().select("name updated created");
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};
export const update = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded",
      });
    }
    let user = req.profile;
    user = _.extend(user, fields);

    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.filepath);
      user.photo.contentType = files.photo.mimetype;
    }
    try {
      await user.save();

      user.hashedPassword = undefined;
      user.salt = undefined;
      user.updated = Date.now();
      user.photo = undefined;
      return res.json(user);
    } catch (error) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
  });
};
export const remove = async (req, res) => {
  try {
    let user = req.profile;
    const deletedUser = await User.findOneAndDelete({ _id: user._id });

    deletedUser.hashedPassword = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};
export const photo = (req, res, next) => {
  console.log(req.profile.photo.contentType);
  if (req.profile.photo.data) {
    res.set("Content-Type", req.profile.photo.contentType);
    return res.send(req.profile.photo.data);
  }
  next();
};
export const defaultPhoto = (req, res) => {
  return res.sendFile("profile-pic.png", { root: "public" });
};
