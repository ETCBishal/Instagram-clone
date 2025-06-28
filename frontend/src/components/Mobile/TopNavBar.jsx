
const TopNavBar = () => {
  return (
    <div className=" flex md:hidden h-[50px] fixed top-0 w-full z-10 px-3 bg-base-100 outline outline-gray-200">
      {/* wrapper */}
      <div className="flex items-center justify-between w-full">
        {/* logo */}
        <div>
          <h3
            className="text-2xl"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            Instagram
          </h3>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center">
            <input
              className="w-[50vw] max-w-[150px] p-1 text-[12px] bg-gray-200 rounded-sm outline outline-gray-400 box-border"
              type="text"
              placeholder="Search"
            />
          </div>

          <div>
            <img src="/Like.png" alt="notification-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
