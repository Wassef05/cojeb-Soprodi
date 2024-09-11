import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { throwError } from "../utils/error.js";





export const createUser = async (req, res, next) => {
  try {
      // Hash the password before creating the user
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
          ...req.body,
          password: hashedPassword
      });
      res.status(201).json(user);
  } catch (error) {
      console.error("Error creating user:", error);
      next(error);
  }
};


// ====== get user=========//
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return throwError(404, "User not found");

    const { password, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Update User
export const updateUser = async (req, res, next) => {
  const { email, username } = req.body;

  try {
    const currentUser = await User.findById(req.params.id);
    if (!currentUser) return next(throwError(404, "User not found"));

    if (email !== currentUser.email) {
      const checkEmail = await User.findOne({ email });
      if (checkEmail) return next(throwError(500, "Email already in use"));
    }

    if (username !== currentUser.username) {
      const checkUserName = await User.findOne({ username });
      if (checkUserName) return next(throwError(500, "Username already in use"));
    }

    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(throwError(500, error.message));
  }
};


//=====Handle User Delete=====//
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User Deleted Successfully!");
  } catch (error) {
    next(error);
  }
};




