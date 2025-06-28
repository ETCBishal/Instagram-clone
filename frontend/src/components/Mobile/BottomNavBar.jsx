import { NavLink } from "react-router-dom";

const BottomNavBar = () => {
  return (
    <div className="flex items-center justify-center bg-base-100 md:hidden h-[50px] fixed bottom-0 w-full outline outline-gray-200">
      {/* crtl btn */}

      <div className="flex gap-10">
        <NavLink to="/">
          {({ isActive }) => {
            return (
              <img className="min-w-[15px]" src={isActive ? "Home-c.png" : "/Home.png"} alt="Home" />
            );
          }}
        </NavLink>
        <NavLink to="/explore">
          {({ isActive }) => {
            return (
              <img className="min-w-[15px]" src={isActive ? "Explore-c.png" : "/Explore.png"} alt="Explore" />
            );
          }}
        </NavLink>
        <NavLink to={'/reels'}>
        {
          ({isActive})=>{
            return(
          <img className="min-w-[15px]" src={isActive?"Reels-c.png":"/Reels.png" } alt="Reels" />

            )
          }
        }
        
        </NavLink>
        <NavLink to={'/create'}>
        {
          ({isActive})=>{
            return (
          <img className="min-w-[15px]" src={isActive?"Create-c.png":"/Create.png"} alt="plus" />

            )
          }
        }
        </NavLink>
        <NavLink to={'/messages'}>
        {
          ({isActive})=>{
            return (
          <img className="min-w-[15px]" src={isActive?"Messages-c.png":"/Messages.png"} alt="messages" />


            )
          }
        }
        </NavLink>
        <NavLink to={'/profile'}>
          <img className="min-w-[15px]" src="/Tag.png" alt="profile" />
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNavBar;
