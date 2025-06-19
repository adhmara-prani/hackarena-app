import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.jwt || req.header("Authorization")?.replace("Bearer ", "");
      //console.log(token)

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decodedToken)

    const user = await User.findById(decodedToken?.userId);
    //console.log(user)

    req.userID = user._id;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token at catch in middleware" });
  } 
};
