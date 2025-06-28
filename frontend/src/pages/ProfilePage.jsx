import { NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { Camera, Plus, Upload } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore.js";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { usePostStore } from "../store/usePostStore.js";

const ProfilePage = () => {
  const { authUser, updateProfileInfo, isUpdatingProfile, updateProfilePic } =
    useAuthStore();
  const { isCreatingPost, posts, createPost, fetchPost } = usePostStore();
  const { light } = useThemeStore();
  const choosePostRef = useRef(null);
  const profilePicRef = useRef(null);
  const [profileData, setProfileData] = useState({
    username: "",
    bio: "",
  });
  const [postPreview, setPostPreview] = useState(null);
  const [postType, setPostType] = useState("");
  const [description, setDescription] = useState("");

  const changeProfilePic = async () => {
    const file = profilePicRef.current.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;

      await updateProfilePic({ profilePic: base64Image });
    };
  };

  const handlePostPreview = () => {
    const file = choosePostRef.current.files[0];

    if (!file) return;

    const reader = new FileReader();

    const fileType = file.type.split("/")[0];
    setPostType(fileType);

    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64image = reader.result;
      setPostPreview(base64image);
    };
  };

  const handleCreatePost = async () => {
    try {
      if (postPreview || description.trim()) {
        await createPost({ description, file: postPreview, type: postType });
        toast.success("Your post is public now");
        setPostPreview(null);
        setDescription("");
        setPostType("");

        fetchPost();
      }
      if (!postPreview) {
        toast.error("Please select a file");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateData = () => {
    const isSpace = profileData.username.includes(" ");
    const isDash = profileData.username.includes("-");

    if (isSpace) return toast.error("Spaces are not allowed");
    if (isDash) return toast.error("Dashes are not allowed");
    if (!profileData.username && !profileData.bio)
      return toast.error("Fields can't be empty");

    if (!profileData.username.trim()) {
      profileData.username = authUser.username;
    }

    const cleanedData = {
      ...profileData,
      username: profileData.username.trim() || authUser?.username,
      bio: profileData.bio.trim(),
    };

    setProfileData(cleanedData);

    return true;
  };

  const submitProfileUpdate = async (e) => {
    e.preventDefault();

    const success = validateData();
    if (success === true) {
      await updateProfileInfo(profileData);

      setProfileData({
        username: "",
        bio: "",
      });

      document.getElementById("my_modal_3").close();
    }
  };

  return (
    <div className="min-h-screen max-h-screen grid grid-cols-1 p-5 lg:p-2 overflow-y-scroll">
      {/* wrapper */}
      <div className="lg:p-[10px]">
        {/* top */}
        <div className="grid sm:grid-cols-[10vw_70vw] md:grid-cols-[20vw_70vw] max-sm:gap-5 max-md:gap-30">
          {/* profile image */}
          <div className="relative w-[150px] h-[150px] max-sm:w-[100px] max-sm:h-[100px]">
            <div className="flex items-center justify-center w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[150px] lg:h-[150px] rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={authUser?.profilePic || "/user.png"}
                alt="profile-pic"
              />
            </div>

            {/* change profile pic */}
            <input
              onChange={changeProfilePic}
              ref={profilePicRef}
              type="file"
              hidden
            />
            <button
              onClick={() => profilePicRef.current.click()}
              className={`bg-pink-600 text-white absolute bottom-4 right-4 sm:bottom-12 sm:right-12 md:bottom-12 md:right-12 lg:bottom-2 lg:right-2 p-1 rounded-full cursor-pointer`}
            >
              <Camera className="max-sm:size-5" />
            </button>
          </div>

          {/* edit profile dialogue */}
          <dialog id="my_modal_3" className="modal bg-black/50">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg capitalize">Edit profile</h3>
              <form
                onSubmit={submitProfileUpdate}
                className="flex flex-col w-[100%] gap-4 mt-4"
              >
                <div>
                  <span>Username:</span>
                  <input
                    name="username"
                    value={profileData.username}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="outline outline-gray-400 p-2 rounded-sm w-full text-sm"
                    type="text"
                    placeholder="username"
                  />
                </div>

                <div className="relative">
                  <h4>Bio:</h4>
                  <textarea
                    name="bio"
                    placeholder="Write about yourself...."
                    value={profileData.bio}
                    onChange={(e) => {
                      if (e.target.value.length <= 200) {
                        setProfileData({
                          ...profileData,
                          [e.target.name]: e.target.value,
                        });
                      }
                    }}
                    className="outline resize-none outline-gray-400 rounded-sm w-full p-2 text-sm"
                  ></textarea>

                  <div className="absolute right-0">
                    {profileData.bio?.length}/200
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className={`${
                      !light ? "bg-base-300" : "bg-black"
                    } text-white p-2 rounded-sm cursor-pointer`}
                  >
                    {isUpdatingProfile ? "Updaing..." : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </dialog>

          {/* profile info */}

          <div className="flex flex-col items-start gap-5 sm:w-[50vw] lg:w-[40vw] max-sm:mt-5">
            <div className="flex items-center justify-start gap-4 w-full">
              <h3 className="font-bold">{authUser?.username}</h3>
              <button
                className="bg-base-300 p-2 rounded-sm font-semibold text-sm cursor-pointer"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Edit Profile
              </button>
            </div>
            <div className="flex items-center justify-start gap-4 w-full">
              <span>
                {posts.length} <span className="text-gray-400">Posts</span>
              </span>
              <span>
                0 <span className="text-gray-400">Followers</span>
              </span>
              <span>
                0 <span className="text-gray-400">Followings</span>
              </span>
            </div>

            {/* user-bio */}
            <div className="w-full">
              <p>{authUser?.bio || "Add something to your bio!"}</p>
            </div>
          </div>
        </div>

        {/* middle */}

        <dialog id="post_modal" className="modal">
          <div className="modal-box flex flex-col gap-2">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => setPostPreview(null)}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Create A Post</h3>

            <div className="flex flex-col gap-2">
              {/* description */}
              <div className="mt-5">
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write about your post..."
                  className={`w-full resize-none outline ${
                    !light && "outline-gray-500"
                  } outline-gray-300 text-sm p-2 scroll-smooth rounded-sm`}
                ></textarea>
              </div>
              {/* img/video */}
              <div className="w-full h-[400px] rounded-sm overflow-hidden">
                {postPreview ? (
                  postType === "image" ? (
                    <img className="object-cover" src={postPreview} alt="" />
                  ) : (
                    <video src={postPreview} loop autoPlay></video>
                  )
                ) : (
                  <img className="object-cover" src={"/preview.png"} alt="" />
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <input
                onChange={handlePostPreview}
                ref={choosePostRef}
                type="file"
                hidden
              />
              <button
                onClick={() => choosePostRef.current.click()}
                className={`p-3 rounded-sm cursor-pointer flex gap-2 bg-slate-800 hover:bg-slate-950 text-white`}
              >
                <Upload size={20} />
                <span className="text-sm">Upload file</span>
              </button>

              <button
                onClick={handleCreatePost}
                className={`p-2 rounded-sm cursor-pointer flex gap-2 bg-slate-800 hover:bg-slate-950 text-white`}
              >
                {isCreatingPost ? (
                <div  type="button" class="text-white font-medium rounded flex items-center" disabled>
                  <svg class="mr-3 size-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Creating…
                </div>
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </div>
        </dialog>

        <div className="cursor-pointer w-fit mt-10">
          <div className="flex flex-col items-center">
            {/* Icon Circle */}
            <button
              onClick={() => document.getElementById("post_modal").showModal()}
              className={`cursor-pointer size-[13vw] sm:size-[7vw] rounded-full border ${
                light ? "border-gray-300" : "border-gray-500"
              } flex items-center justify-center`}
            >
              <div
                className={`size-[11vw] sm:size-[6vw] ${
                  light ? "bg-gray-100" : "bg-gray-500"
                } rounded-full flex items-center justify-center`}
              >
                <Plus
                  className={`${
                    light ? "text-gray-300" : "text-gray-700"
                  } size-[9vw] sm:size-[5vw]`}
                />
              </div>
            </button>

            {/* Label */}
            <span className="mt-1 text-[10px] sm:text-sm text-center font-semibold">
              New
            </span>
          </div>
        </div>

        {/* bottom */}
        <div className="mt-16">
          <div className="h-[1px] bg-gray-300"></div>

          <div className="flex items-center justify-center gap-10 mt-2">
            {/* links */}
            <NavLink to={"/profile"} end className="flex items-center gap-2">
              {({ isActive }) => {
                return (
                  <>
                    <img
                      className={`${!light && "invert"} size-[15px]`}
                      src="/Posts.png"
                      alt="post-icon"
                    />
                    <span
                      className={`${
                        isActive && "uppercase text-[13px] font-semibold"
                      } uppercase text-[13px] text-gray-600
                      ${!light && "text-white"}`}
                    >
                      Posts
                    </span>
                  </>
                );
              }}
            </NavLink>
            <NavLink
              to={"/profile/saved"}
              className={"flex items-center gap-2"}
            >
              {({ isActive }) => {
                return (
                  <>
                    <img
                      className={`${!light && "invert"} size-[15px]`}
                      src="/Save.png"
                      alt="save-icon"
                    />
                    <span
                      className={`${
                        isActive && "uppercase text-[13px] font-semibold"
                      } uppercase text-[13px] text-gray-600
                      ${!light && "text-white"}`}
                    >
                      Saved
                    </span>
                  </>
                );
              }}
            </NavLink>
            <NavLink
              to={"/profile/tagged"}
              className={"flex items-center gap-2"}
            >
              {({ isActive }) => {
                return (
                  <>
                    <img
                      className={`size-[15px] ${!light && "invert"}`}
                      src="/Tagged.png"
                      alt="save-icon"
                    />
                    <span
                      className={`${
                        isActive && "uppercase text-[13px] font-semibold"
                      } uppercase text-[13px] text-gray-600
                      ${!light && "text-white"}`}
                    >
                      Tagged
                    </span>
                  </>
                );
              }}
            </NavLink>
          </div>

          {/* container */}
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
