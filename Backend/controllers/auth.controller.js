import bcrypt from "bcryptjs";
import User from "../models/user.models.js";

export const signup = async (req, res) => {
  try {
    const { fullName, emailId, password } = req.body;

    if (!fullName || !emailId || !password) {
      return res.status(400).json({ error: "Please fill in all the fields!" });
    }

    const user = await User.findOne({ emailId });

    if (user) {
      return res
        .status(400)
        .json({ error: "User already exists in the database!" });
    }

    // password hashing
    const namak = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, namak);

    const newUser = new User({
      fullName,
      emailId,
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        emailId: newUser.emailId,
      });
    } else {
      return res
        .status(400)
        .json({ error: "Something went wrong while creating the new user!" });
    }
  } catch (error) {
    console.log("Error in signup controller!", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ error: "Incorrect username or password!" });

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      emailId: user.emailId,
    });
  } catch (error) {
    console.log("Error in the login controller!", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
