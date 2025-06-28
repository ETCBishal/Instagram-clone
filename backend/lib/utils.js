import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET;

export const generateAndSetToken = (userId, res) => {
  const token = jwt.sign({ _id:userId }, SECRET, { expiresIn: "1h" });

  res.cookie("dev_token", token, {
    maxAge: 60 * 60 * 1000,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
  });

  return token;
  
};
