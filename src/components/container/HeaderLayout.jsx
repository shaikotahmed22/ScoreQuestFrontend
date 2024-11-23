import React, { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import images from "../../constants/images";
import HeaderItem from "./HeaderItem";
import { IoMdClose } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";

const navItem = [
  { name: "Home", link: "/" },
  { name: "Today Match", link: "/today-match" },
  { name: "Finished Match", link: "/finished-match" },
  { name: "Upcoming Match", link: "/upcoming-match" },
  { name: "Player Rank", link: "/player-rank" },
  // { name: "Contact Us", link: "/contact" },
];

const HeaderLayout = ({ classes }) => {
  const userState = useSelector((state) => state.user);
  const [humburgerMenu, setHumburgerMenu] = useState(false);

  return (
    <div
      className={`${classes} bg-primary-darkNavy block m-auto relative z-[999999] py-4 px-4 xl:px-0 `}
    >
      <div className="container m-auto flex flex-row justify-between">
        <div className="w-[200px] md:w-[160px] ">
          <Link to={"/"}>
            <img
              width={160}
              loading="lazy"
              src={images.ScoreQuest}
              alt="logo"
            />
          </Link>
        </div>

        <div
          className={` hidden lg:flex flex-row-reverse w-full gap-6 items-center`}
        >
          <HeaderItem navItem={navItem} userState={userState} />
        </div>

        <div className=" flex  gap-6 items-center w-full flex-row-reverse text-primary-brightOrange text-[30px] lg:hidden">
          {humburgerMenu ? (
            <span onClick={() => setHumburgerMenu(false)}>
              <IoMdClose />
            </span>
          ) : (
            <span onClick={() => setHumburgerMenu(true)}>
              {" "}
              <IoMdMenu />{" "}
            </span>
          )}
        </div>

        <div className="">
          {humburgerMenu && (
            <HeaderItem
              parentClass={
                "absolute left-0 top-0 flex-col bg-primary-darkNavy w-full h-[100vh] z-[-3] pt-[100px] text-center "
              }
              classes={"flex-col"}
              navItem={navItem}
              userState={userState}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderLayout;
