import { useCallback, useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../service/user";
import { useSelector } from "react-redux";
import images from "../../../constants/images";
import Search from "../../../components/Search";

import stables from "../../../constants/stable";
import Loading from "../../../components/shared/Loading/Loading";
import AddMatch from "../match/container/components/AddMatch";

const GetAllUser = () => {
  const userState = useSelector((state) => state.user);
  const [searchKeywords, setSearchKeywords] = useState("");

  const [user, setUser] = useState([]);
  const [pageChange, setPageChange] = useState(1);
  const [playMatchBtn, setPlayMatchBtn] = useState(false);
  const [requestedTeamId, setRequestedTeamId] = useState({
    requestedTeam: "",
    requestedTeamName: "",
  });
  const limit = 4;

  const handleClickPlayMatchBtn = ({ requestedTeam, requestedTeamName }) => {
    setRequestedTeamId({
      requestedTeam: requestedTeam,
      requestedTeamName: requestedTeamName,
    });
    setPlayMatchBtn(true);
  };

  const handelInfinityScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >
        document.documentElement.scrollHeight
      ) {
        setPageChange((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryFn: () =>
      getUsers({
        token: userState.userInfo.token,
        searchKeywords,
        limit,
        page: pageChange,
        userId: userState.userInfo.id,
      }),
    queryKey: ["User", pageChange, searchKeywords],
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!data) {
      refetch();
    }
  }, [pageChange, data]);

  useEffect(() => {
    if (data) {
      if (searchKeywords === "") {
        setUser((prev) => {
          const combined = [...prev, ...data];
          return combined.filter(
            (item, index) =>
              index === combined.findIndex((t) => t.id === item.id)
          );
        });
      } else {
        setUser(data);
        setPageChange(1);
      }
    }
  }, [data, searchKeywords]);

  useEffect(() => {
    window.addEventListener("scroll", handelInfinityScroll);
    return () => window.removeEventListener("scroll", handelInfinityScroll);
  }, []);

  return (
    <div className="flex flex-col px-2 lg:p-5">
      <div className="self-center mb-10">
        <Search
          placeholder="Find club / Area name"
          setSearchKeywords={setSearchKeywords}
        />
      </div>

      <div>
        <div className="flex flex-row justify-between ">
          <h2 className="text-xl font-bold text-center mb-6 text-primary-darkNavy">
            Club/Area Name
          </h2>
          <span className="text-xl hidden lg:block font-bold text-center mb-6 mr-10 text-primary-darkNavy">
            Action
          </span>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <div>
            {user?.map(
              (item) =>
                item.id !== userState.userInfo.id && (
                  <div
                    className="flex flex-col md:flex-row gap-1 lg:gap-5 items-start md:justify-between shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-5 p-3 md:align-middle md:items-center rounded-md hover:shadow-lg"
                    key={item.id}
                  >
                    <div className="flex flex-row gap-5 justify-center items-center mb-5">
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
                        {item?.name?.length > 20
                          ? item?.name?.substring(0, 20) + "..."
                          : item?.name}
                      </h3>
                    </div>

                    <div>
                      <button
                        className={`hover:text-primary-brightOrange active:text-primary-darkNavy `}
                        onClick={() =>
                          handleClickPlayMatchBtn({
                            requestedTeam: item?.id,
                            requestedTeamName: item?.name,
                          })
                        }
                      >
                        Lets Play a match?
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
        {user?.length === 0 && (
          <p className="text-primary-brightOrange text-[28px] ">
            Nothing Found
          </p>
        )}
      </div>

      <div>
        {playMatchBtn && (
          <AddMatch
            requestedTeam={requestedTeamId}
            setPlayMatchBtn={setPlayMatchBtn}
          />
        )}
      </div>
    </div>
  );
};

export default GetAllUser;
