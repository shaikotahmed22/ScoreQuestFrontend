import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import stables from "../../../../constants/stable";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import images from "../../../../constants/images";
import SecondaryButton from "../../../../components/shared/button/SecondaryButton";
const PlayerTable = ({
  players,
  deletePlayerById,
  checkBox = false,
  handleSubmit,
  handleChange,
  title = "",
  buttons = true,
  closeSquad,
  isSelectPlayer = true,
  selectedPlayer = null,
  classes,
  setSelectBatter1 = null,
  setSelectBatter2 = null,
}) => {
  const handleBatter1Id = (data) => {
    if (typeof selectedPlayer === "function") {
      selectedPlayer(data);
      if (typeof setSelectBatter1 === "function") {
        setSelectBatter1(false);
      }
      if (typeof setSelectBatter2 === "function") {
        setSelectBatter2(false);
      }
    }
  };

  return (
    <div>
      <div className="px-2 lg:px-5">
        <h2 className="text-2xl font-semibold text-primary-darkNavy mb-4 text-center">
          {title}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between mt-10 ">
            <h2 className="text-xl w-[40%] font-bold text-left mb-6 text-primary-darkNavy">
              Name
            </h2>

            {isSelectPlayer && (
              <span className="text-xl w-[40%] font-bold text-right mb-6 mr-10 text-primary-darkNavy">
                {buttons ? (
                  <span>Action</span>
                ) : (
                  <span
                    className="cursor-pointer flex justify-end"
                    onClick={closeSquad}
                  >
                    {" "}
                    <IoMdClose />{" "}
                  </span>
                )}{" "}
              </span>
            )}
          </div>

          <div className="">
            {players?.length > 0 ? (
              players?.map((item) => (
                <div
                  onClick={() =>
                    handleBatter1Id({
                      id: item._id,
                      fName: item.firstName,
                      lName: item.lastName,
                      avatar: item.avatar,
                    })
                  }
                  className={`${classes} flex flex-col flex-wrap lg:flex-row lg:gap-5 w-full lg:justify-between shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-5 p-3 align-middle lg:items-center rounded-md hover:shadow-lg`}
                  key={item._id}
                >
                  <div className="flex lg:w-[40%] flex-row gap-5 items-center mb-5">
                    <img
                      className="rounded-full"
                      height={50}
                      width={50}
                      src={
                        item.avatar
                          ? stables.UPLOAD_FOLDER_BASE_URL + item.avatar
                          : images.Profile
                      }
                      alt="img"
                    />

                    <h3 className="font-bold text-xl text-primary-brightOrange">
                      {item.firstName} {item.lastName}{" "}
                    </h3>
                  </div>

                  <div className=" w-full items-center lg:w-[40%] flex justify-between">
                    <div className=" flex justify-start lg:justify-center">
                      <p className="text-center">{item.role}</p>
                    </div>

                    {isSelectPlayer && (
                      <div className="lg:w-[40%] flex justify-end">
                        {checkBox ? (
                          <span>
                            <input
                              className="cursor-pointer"
                              type="checkbox"
                              onChange={handleChange}
                              value={item._id}
                            />
                          </span>
                        ) : (
                          buttons && (
                            <div className="flex gap-4">
                              <span className="hover:text-primary-brightOrange cursor-pointer">
                                <Link to={`/profile/update/${item._id}`}>
                                  Edit
                                </Link>
                              </span>
                              <span
                                onClick={() => deletePlayerById(item._id)}
                                className="hover:text-primary-brightOrange cursor-pointer"
                              >
                                Delete
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>There are no player found please add first</p>
            )}
          </div>

          <div className="flex justify-center">
            {checkBox && <SecondaryButton text={"Submit"} type={"submit"} />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerTable;
