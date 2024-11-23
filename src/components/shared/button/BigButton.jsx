import React from "react";

const BigButton = ({ func, classes, parentClass, type = "text", text }) => {
  return (
    <div className={`${parentClass}`}>
      <button
        className={`${classes} rounded-md hover:shadow-lg w-full text-center text-xl py-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-primary-brightOrange font-bold `}
        onClick={func}
        type={type}
      >
        {text}
      </button>
    </div>
  );
};

export default BigButton;
