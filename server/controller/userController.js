import User from "../model/usermodel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, age, weight, height, answer, role } =
      req.body;
    if (
      !name ||
      !email ||
      !password ||
      !age ||
      !weight ||
      !height ||
      !answer ||
      !role
    ) {
      return res.status(500).json({
        success: false,
        message: "Please provide all fields",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(309).json({
        success: false,
        message: "User already exists",
      });
    }

    let salt = bcrypt.genSaltSync(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
      weight,
      height,
      answer,
      role,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User register successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in register api",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "User login successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in register api",
      error,
    });
  }
};

export const getUsersController = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "get all users successfully",
      totalUsers: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in get all users api",
      error,
    });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const { email, name, age, weight, height } = req.body;
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { name, age, weight, height } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in update user api",
      error,
    });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).json({
        success: false,
        message: "provide all fields",
      });
    }

    const user = await User.findOne({ email, answer });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    let salt = bcrypt.genSaltSync(10);
    let hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User reset password successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in reset password api",
      error,
    });
  }
};

export const updatePasswordController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).json({
        success: false,
        message: "Provide old or new password",
      });
    }

    // compare
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).json({
        success: false,
        message: "invalid credentials",
      });
    }

    // hash
    let salt = bcrypt.genSaltSync(10);
    let hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User update password successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in update password api",
      error,
    });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      res.status(500).json({
        success: false,
        message: "User Id not found",
      });
    }
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "user deleted successfully",
      deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in delete user api",
      error,
    });
  }
};
