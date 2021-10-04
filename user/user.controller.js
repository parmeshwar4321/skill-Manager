const usersDataAccess = require("./user.dal");
const bcrypt = require("bcrypt");
const ExpressError = require("../utils/errorGenerator");
const { generateAccessToken } = require("../utils/jwt");
const userModel = require("./user.model");
const { myFunction } = require("../utils/nodemailer");

exports.getUser = async (req) => {
  const users = await usersDataAccess.findUsers(req);
  return {
    error: false,
    sucess: true,
    message: "Get user",
    data: users,
  };
};

exports.createUser = async (req) => {
  const { email, password, first_name, last_name, number } = req.body;
  if (!password || !email || !first_name || !last_name || !number) {
    throw new ExpressError(401, "Bad request");
  }
  const passwordHash = bcrypt.hashSync(req.body.password, 10);
  const data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    contact: req.body.number,
    email: req.body.email,
    password: passwordHash,
  };
  const storedUser = await usersDataAccess.storeUser(data);

  return {
    error: false,
    sucess: true,
    message: "user created successfully",
    data: storedUser,
  };
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return new ExpressError(
      401,
      "Either username or password is missing in the request."
    );
  }
  const userData = await usersDataAccess.findUserByUsername({
    email: req.body.email,
  });
  if (!userData) {
    return new ExpressError(404, "email not found in the database.");
  }
  const match = bcrypt.compareSync(req.body.password, userData.password);
  if (!match) {
    return new ExpressError(403, "Invalid password");
  }
  const token = generateAccessToken({ _id: userData._id });
  return {
    error: false,
    sucess: true,
    message: "login user successfully",
    data: userData,
    token,
  };
};

exports.updateUser = async (req, res) => {
  const _id = req.token_data._id;
  const updateData = {
    _id,
    toUpdate: {
      contact: req.body.number,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    },
  };
  const update = await usersDataAccess.updateUser(updateData);
  return {
    error: false,
    sucess: true,
    message: "updated user successfully",
    data: update,
  };
};

exports.updatePassword = async (req, res) => {
  const _id = req.token_data._id;
  const userData = await usersDataAccess.updatePassword({
    _id: _id,
  });
  const match = bcrypt.compareSync(req.body.password, userData.password);
  if (!match) {
    return new ExpressError(403, "Your Old Password is Invalid");
  }
  const password = bcrypt.hashSync(req.body.newPassword, 10);
  const updateData = {
    _id,
    toUpdate: {
      password: password,
    },
  };
  const updatePass = await usersDataAccess.updatePassword(updateData);
  return {
    error: false,
    sucess: true,
    message: "updated password successfully",
    data: updatePass,
  };
};

exports.uploadImage = async (req, res) => {
  if (!req.file) {
    res.send(new ExpressError(400, "Bad request"));
  }
  const _id = req.token_data._id;
  const image = "/uploads/" + req.file.filename;
  const updateImage = {
    _id,
    toUpdate: {
      profileImage: image,
    },
  };
  const updatedProfile = await usersDataAccess.updateProfile(updateImage);
  return {
    error: false,
    sucess: true,
    message: "Uploaded Sucessfully",
    data: updatedProfile,
  };
};

exports.getAllusers = async (req, res) => {
  try {
    const data = await userModel.find({});
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return new ExpressError(401, "Either email is missing in the request.");
  }
  const userData = await usersDataAccess.forgotPass({
    email: req.body.email,
  });
  if (!userData) {
    return new ExpressError(404, "email does not exists");
  }
  const otpSend = {
    from: "subhashajmera2@gmail.com",
    to: userData.email,
    subject: "Sending email using node.js",
    text: `http://localhost:3000/users/auth/verifyEmail/${userData._id}`,
  };
  myFunction(otpSend);
  return {
    error: false,
    sucess: true,
    message: "password successfully generate",
    data: userData,
  };
};