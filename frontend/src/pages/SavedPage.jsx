import React from "react";
import { useThemeStore } from "../store/useThemeStore";

const SavedPage = () => {
  const { light } = useThemeStore();

  return (
    <div className="flex flex-col gap-5 items-center justify-center mt-10 p-5">
      <div
        className={`max-sm:size-[50px] size-[70px] outline outline-gray-400 ${
          !light && "outline-white"
        } rounded-full flex items-center justify-center`}
      >
        <img
          className={`${!light && "invert"}`}
          src="/Save.png"
          alt="tagged-icon"
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="max-md:text-xl text-2xl font-bold">Introducing Save</h2>
        <p className="text-[13px] text-center w-[75%]">
          Save photoes and videos what you want to see again. Only you can see
          what you save.
        </p>
      </div>
    </div>
  );
};

export default SavedPage;
