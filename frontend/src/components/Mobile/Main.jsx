import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="block md:hidden h-screen pt-[50px]">
      <Outlet />
    </div>
  );
};

export default Main;
