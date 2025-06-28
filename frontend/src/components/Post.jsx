import { useState } from "react";

const Post = ({ post_url }) => {
  const [mouseOver, setMouseOver] = useState(false);

  return (
    
    
    <div
      className="w-[30vw] sm:w-[22vw] lg:w-[18vw] h-full sm:h-[50vh] relative cursor-pointer"
      onMouseOver={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <div className="size-8 absolute top-1 max-sm:left-[75%] left-[88%]">
        <img src="/Reels-c.png" alt="reels" className="invert size-5" />
      </div>
      
      {post_url.endsWith("mp4") ? (
        <video
          className="h-full w-full object-cover rounded-sm"
          src={post_url}
          muted
          autoPlay
          loop
        ></video>
      ) : (
        <img
          className="h-full w-full object-cover rounded-sm"
          src={post_url}
          alt="post"
        />
      )}

      {mouseOver && (
        <div className="rounded-sm absolute top-0 left-0 w-full h-full bg-black/60 flex gap-4 items-center justify-center text-white ">
          <img
            className="invert fill-white"
            src="/Comments.png"
            alt="comment-icon"
          />
          <span>0</span>
        </div>
      )}
    </div>
  );
};

export default Post;
