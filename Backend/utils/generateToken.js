import jwt from "jsonwebtoken";

const generateAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60,
    httpsOnly: true,
    sameSite: "strict",
  });
};

export default generateAndSetCookie;
