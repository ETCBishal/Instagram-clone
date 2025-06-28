import jwt from "jsonwebtoken";
import User from '../models/User.js'

export const protectRoute = async (req,res, next) => {
  const token = req.cookies.dev_token;
  
  try {
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No Token Provided",
      });
    }

    const decoded = await jwt.verify(token, process.env.SECRET);    

    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized - Invalid Token Provided",
      });
    }

    const user = await User.findOne({_id:decoded._id}).select('-password')

    req.user = user;

    next();
  } catch (error) {
    console.log(`Error in auth.middleware: `, error);
    res.status(500).json({
      message: "Server Error - Authorization Failed",
    });
  }
};
