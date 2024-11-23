import React, { useEffect, useState } from "react";
import HeaderLayout from "./container/HeaderLayout";

const Header = () => {
  const [scroll, setScroll] = useState(0);

  const handelInfinityScroll = () => {
    setScroll(document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", handelInfinityScroll);
    return () => window.removeEventListener("scroll", handelInfinityScroll);
  }, []);
  return (
    <div className="">
      {scroll > 150 && (
        <HeaderLayout
          classes={
            "!fixed top-0 w-full transition-all duration-300 backdrop-blur shadow-xl"
          }
        />
      )}
      <HeaderLayout />
    </div>
  );
};

export default Header;
