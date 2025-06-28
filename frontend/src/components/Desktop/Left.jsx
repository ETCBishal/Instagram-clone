import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore.js";
import { useThemeStore } from "../../store/useThemeStore.js";

const Left = () => {
  const { authUser,logout } = useAuthStore();
  const { light, changeTheme } = useThemeStore();

  const toggleTheme = () => {
    changeTheme();
  };

  return (
    <aside className="max-h-[100vh] px-4 pt-2 pb-5 hidden md:block md:w-[10vw] lg:w-[20vw] outline outline-gray-200">
      {/* wrapper */}
      <div className="flex flex-col md:items-center md:justify-center lg:items-start lg:justify-start gap-12">
        {/* logo */}
        <NavLink to={"/"} className="mt-5">
          <h3
            className="lg:block md:hidden capitalize text-2xl sm:text-3xl"
            style={{ fontFamily: "'Pacifico',cursive" }}
          >
            instagram
          </h3>

          <img
            className={
              !light ? "invert md:block lg:hidden" : "md:block lg:hidden"
            }
            src="/Logo.png"
            alt="logo"
          />
        </NavLink>
        {/* crl-btn */}
        <div className="flex max-lg:justify-center max-lg:items-center flex-col gap-5 w-[90%]">
          <NavLink
            to="/"
            className="flex items-center p-2 gap-4 hover:bg-[#0000000D] hover:rounded-lg"
          >
            {({ isActive }) => {
              return (
                <>
                  <img
                    className={!light?"invert":''}
                    src={isActive ? "/Home-c.png" : "/Home.png"}
                    alt="Home-icon"
                  />
                  <span
                    className={
                      isActive
                        ? "font-semibold md:hidden lg:block"
                        : "md:hidden lg:block"
                    }
                  >
                    Home
                  </span>
                </>
              );
            }}
          </NavLink>

          <div className="flex items-center gap-4 p-2 hover:bg-[#0000000D] hover:rounded-lg cursor-pointer">
            <img
              className={!light && "invert"}
              src="/Search.png"
              alt="Search-icon"
            />
            <span className="md:hidden lg:block">Search</span>
          </div>

          <NavLink
            to="/explore"
            className="flex items-center p-2 gap-4 hover:bg-[#0000000D] hover:rounded-lg"
          >
            {({ isActive }) => {
              return (
                <>
                  <img
                    className={!light && "invert"}
                    src={isActive ? "/Explore-c.png" : "/Explore.png"}
                    alt="Explore-icon"
                  />
                  <span
                    className={
                      isActive
                        ? "font-semibold md:hidden lg:block"
                        : "md:hidden lg:block"
                    }
                  >
                    Explore
                  </span>
                </>
              );
            }}
          </NavLink>

          <NavLink
            to="/reels"
            className="flex items-center p-2 gap-4 hover:bg-[#0000000D] hover:rounded-lg"
          >
            {({ isActive }) => {
              return (
                <>
                  <img
                    className={!light && "invert"}
                    src={isActive ? "/Reels-c.png" : "/Reels.png"}
                    alt="Reels-icon"
                  />
                  <span
                    className={
                      isActive
                        ? "font-semibold md:hidden lg:block"
                        : "md:hidden lg:block"
                    }
                  >
                    Reels
                  </span>
                </>
              );
            }}
          </NavLink>

          <NavLink
            to="/messages"
            className="flex items-center p-2 gap-4 hover:bg-[#0000000D] hover:rounded-lg"
          >
            {({ isActive }) => {
              return (
                <>
                  <img
                    className={!light && "invert"}
                    src={isActive ? "/Messages-c.png" : "/Messages.png"}
                    alt="Messages-icon"
                  />
                  <span
                    className={
                      isActive
                        ? "font-semibold md:hidden lg:block"
                        : "md:hidden lg:block"
                    }
                  >
                    Messages
                  </span>
                </>
              );
            }}
          </NavLink>

          {/* TODO: Side modal */}
          <div className="flex items-center gap-4 p-2 hover:bg-[#0000000D] hover:rounded-lg cursor-pointer">
            <img
              className={!light && "invert"}
              src="/Like.png"
              alt="Notification-icon"
            />
            <span className="md:hidden lg:block">Notification</span>
          </div>

          <NavLink
            to={"/create"}
            className="flex items-center gap-4 p-2 hover:bg-[#0000000D] hover:rounded-lg cursor-pointer"
          >
            {({ isActive }) => {
              return (
                <>
                  <img
                    className={!light && "invert"}
                    src={isActive ? "Create-c.png" : "/Create.png"}
                    alt="Create-icon"
                  />
                  <span className="md:hidden lg:block">Create</span>
                </>
              );
            }}
          </NavLink>

          <NavLink
            to="/profile"
            className="flex items-center p-2 gap-4 hover:bg-[#0000000D] hover:rounded-lg"
          >
            {({ isActive }) => {
              return (
                <>
                  <div className="size-6 rounded-full overflow-hidden">
                    <img
                      src={authUser?.profilePic || "Tag.png"}
                      alt="Tag-icon"
                    />
                  </div>
                  <span
                    className={
                      isActive
                        ? "font-semibold md:hidden lg:block"
                        : "md:hidden lg:block"
                    }
                  >
                    Profile
                  </span>
                </>
              );
            }}
          </NavLink>

          <div className="flex items-cnter mt-5 dropdown dropdown-top p-2">
            <div
              tabIndex={0}
              role="button"
              className="flex gap-4 cursor-pointer"
            >
              <img className={!light && "invert"} src="/More.png" alt="ham" />
              <span className="md:hidden lg:block">More</span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 shadow-sm"
            >
              <li>
                <button className="flex">
                  <img
                    className={!light ? "invert object-cover" : "object-cover"}
                    src="/Settings.png"
                    alt="setting-icon"
                  />
                  <span>Settings</span>
                </button>
              </li>
              <li>
                <button onClick={toggleTheme}>
                  <img
                    className={!light && "invert"}
                    src={light ? "/Theme-Dark.png" : "/Theme-Light.png"}
                    alt="theme-icons"
                  />
                  <span>{light ? "Dark" : "Light"}</span>
                </button>
              </li>
              {/* separator */}
              <div className="bg-gray-200 w-full h-[1px]"></div>

              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Left;
