import React from "react";
import { useThemeStore } from "../store/useThemeStore";

const TaggedPage = () => {
    const {light} = useThemeStore()
    
  return (
    <div className="flex flex-col gap-5 items-center justify-center mt-10 p-5">
      <div
        className={`max-sm:size-[50px] size-[70px] outline outline-gray-400 ${
          !light && "outline-white"
        } rounded-full flex items-center justify-center`}
      >
        <img className={`${!light&&'invert'}`} src="/Tagged.png" alt="tagged-icon" />
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="max-md:text-xl text-2xl font-bold">Photoes of you</h2>
        <p className="text-[13px]">
          When people tag you in photos, they'll appear here.
        </p>
      </div>
    </div>
  );
};

export default TaggedPage;
