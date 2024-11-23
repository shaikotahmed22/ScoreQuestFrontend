import React from "react";

const FeaturesCard = ({ icon, title, text, classes }) => {
  return (
    <div
      className={`${classes} text-center rounded-md px-4 py-6 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-xl transition-all duration-150 `}
    >
      <div className=" mb-3 [&>svg]:p-3 rounded-full [&>svg]:text-natural-white w-14 h-14 text-[48px] flex align-middle justify-center items-center m-auto bg-primary-brightOrange">
        {icon}
      </div>
      <div>
        <h4 className="text-[18px] leading-[28px] font-bold text-secondary-slateGray ">
          {title}
        </h4>
        <p className="text-[16px] leading-[22px]  text-secondary-slateGray">
          {text}
        </p>
      </div>
    </div>
  );
};

export default FeaturesCard;
