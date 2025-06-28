import cloudinary from "../lib/cloudinary.js";
import User from "../models/User.js";
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  const { description, file, type } = await req.body;
  const userId = req.user._id;

  try {
    if (type === "video") {
      const response = await cloudinary.uploader.upload_large(file, {
        resource_type: "video",
      });

      const newPost = await Post.create({
        user: userId,
        post: response.secure_url,
        description: description,
      });

      return res.status(200).json({ newPost });
    }

    if (type === "image") {
      const response = await cloudinary.uploader.upload(file);
      const newPost = await Post.create({
        user: userId,
        post: response.secure_url,
        description: description,
      });

      return res.status(200).json({ newPost });
    }
  } catch (error) {
    console.log(`Error in createPost :${error}`);
  }
};

export const fetchPost = async (req, res) => {
    const userId = req.user._id
    
    try {
        const posts = await Post.find({user:userId})
        res.status(200).json({
            posts
        })
        
  } catch (error) {
    console.log(`Error in createPost :${error}`);
    res.status(500).json({
        message:'Server Error - couldn\'t fetch the posts'
    })
  }
};
