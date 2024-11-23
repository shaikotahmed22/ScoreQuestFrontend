import React from "react";

const UpdateScoreButton = ({ classes, title }) => {
  return (
    <button
      className={` border border-primary-brightOrange !text-black hover:!text-natural-white hover:bg-primary-brightOrange transition-all duration-300 ${classes} text-white h-10 w-10  flex items-center justify-center rounded-full`}
    >
      {title}
    </button>
  );
};

export default UpdateScoreButton;
