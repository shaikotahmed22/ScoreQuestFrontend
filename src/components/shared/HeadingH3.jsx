import React from "react";

const HeadingH3 = ({ text, classes }) => {
  return (
    <div>
      <h3
        className={`text-center text-[22px] md:text-[28px] font-bold  text-primary-darkNavy ${classes}`}
      >
        {text}
      </h3>
    </div>
  );
};

export default HeadingH3;
