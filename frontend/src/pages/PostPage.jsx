import Post from "../components/Post";
import { Camera } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { useEffect, useRef } from "react";
import { usePostStore } from "../store/usePostStore";

const PostPage = () => {
  const { light } = useThemeStore();
  const choosePostRef = useRef(null);

  const { isFetchingPost, posts, fetchPost } = usePostStore();

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (isFetchingPost === true) {
    return <div>fetching the posts......</div>;
  }

  return (
    <>
      {posts.length !== 0 ? (
        <div className="mt-5 max-h-[100vh] grid grid-cols-[30vw_30vw_30vw] sm:grid-cols-[22vw_22vw_22vw_22vw] lg:grid-cols-[18vw_18vw_18vw_18vw] gap-1 sm:gap-2">
          {posts.map((post) => {
            return <Post key={post._id} post_url={post.post} />;
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-5 items-center justify-center mt-10 p-5">
          <input ref={choosePostRef} type="file" hidden />

          <button
            className={`max-sm:size-[50px] size-[70px] outline outline-gray-400 ${
              !light && "outline-white"
            } rounded-full flex items-center justify-center cursor-pointer`}
            onClick={() => choosePostRef.current.click()}
          >
            <Camera
              strokeWidth={1}
              className={`size-[50%] ${!light && "text-white"}`}
            />
          </button>

          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="max-md:text-xl text-2xl font-bold">Share Photoes</h2>
            <p className="text-[13px]">
              When you share photos, they will appear on your profile.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default PostPage;
