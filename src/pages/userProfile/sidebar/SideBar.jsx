import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../../../store/reducers/userAction";
import images from "../../../constants/images";
const SideBar = () => {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleDispatch = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="bg-primary-darkNavy w-[210px] fixed shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  h-screen py-10 px-9 z-20 ">
      <div className="flex flex-col gap-4">
        <div>
          <a href="/">
            <img
              className="w-[120px]"
              src={images.ScoreQuest}
              alt="Scorequest"
            />
          </a>
        </div>
        <ul className=" flex flex-col gap-4 ">
          <li>
            <Link
              className={`text-natural-white font-semibold transition-all duration-500 hover:text-primary-brightOrange ${
                location.pathname === "/profile" && "text-primary-brightOrange"
              }`}
              to={"/profile"}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              className={`text-natural-white font-semibold transition-all duration-500 hover:text-primary-brightOrange ${
                location.pathname === "/profile/squad" &&
                "text-primary-brightOrange"
              }`}
              to={"squad"}
            >
              Squad
            </Link>
          </li>
          <li>
            <Link
              className={`text-natural-white font-semibold transition-all duration-500 hover:text-primary-brightOrange ${
                location.pathname === "/profile/allUsers" &&
                "text-primary-brightOrange"
              }`}
              to={"allUsers"}
            >
              All User
            </Link>
          </li>

          <li>
            <Link
              className={`text-natural-white font-semibold transition-all duration-500 hover:text-primary-brightOrange ${
                location.pathname === "/profile/match" &&
                "text-primary-brightOrange"
              }`}
              to={"match"}
            >
              Match
            </Link>
          </li>
          <li className="dropdown" onClick={() => setShow(!show)}>
            <button className="text-natural-white flex flex-row items-center gap-3 font-semibold transition-all duration-500 hover:text-primary-brightOrange">
              Player
              {show ? (
                <span>
                  <IoIosArrowUp />
                </span>
              ) : (
                <span>
                  <IoIosArrowDown />
                </span>
              )}
            </button>
          </li>
          {show && (
            <ul className="flex flex-col gap-4 pl-5">
              <li>
                <Link
                  className={`text-natural-white font-semibold transition-all duration-500 hover:text-primary-brightOrange ${
                    location.pathname === "/profile/managePlayer" &&
                    "text-primary-brightOrange"
                  }`}
                  to={"managePlayer"}
                >
                  Manage Player
                </Link>
              </li>
              <li>
                <Link
                  className={`text-natural-white font-semibold transition-all duration-500 hover:text-primary-brightOrange ${
                    location.pathname === "/profile/addPlayer" &&
                    "text-primary-brightOrange"
                  }`}
                  to={"addPlayer"}
                >
                  Add Player
                </Link>
              </li>
            </ul>
          )}

          <li className="text-natural-white font-semibold transition-all duration-500 hover:text-primary-brightOrange">
            <button onClick={handleDispatch}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
