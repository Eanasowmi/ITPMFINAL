// userController.js
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, lastName, email, password, pic, mobileNo, address } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    lastName,
    email,
    password,
    pic,
    mobileNo,
    address,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      mobileNo: user.mobileNo,
      address: user.address,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occurred!");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      mobileNo: user.mobileNo,
      address: user.address,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id); 

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    user.mobileNo = req.body.mobileNo || user.mobileNo;
    user.address = req.body.address || user.address;
    user.bio = req.body.bio || user.bio;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      pic: updatedUser.pic,
      mobileNo: updatedUser.mobileNo,
      address: updatedUser.address,
      bio: updatedUser.bio,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});


// userController.js

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Find user by ID and delete
  const result = await User.findByIdAndDelete(id);
  
  if (result) {
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { registerUser, authUser,getUser, getUserProfile, updateUserProfile, getAllUsers, deleteUser };