import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { getPlayer, getPlayers } from "../../../service/player";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { IoAddOutline } from "react-icons/io5";

import PlayerTable from "../player/components/PlayerTable";
import {
  addSquad,
  deleteSquad,
  getSquad,
  getSquadById,
} from "../../../service/squad";
import Loading from "../../../components/shared/Loading/Loading";

const Squad = () => {
  const [players, setPlayers] = useState([]);
  const [checkChecked, setCheckChecked] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [oneSquad, setOneSquad] = useState([]);
  const [playersFromSquad, setPlayersBySquad] = useState([]);
  const [isSquadActive, setIsSquadActive] = useState(false);

  const userState = useSelector((state) => state.user);

  const { mutate } = useMutation({
    mutationKey: ["squad"],
    mutationFn: ({ selectedPlayer }) => {
      return addSquad({
        userId: userState.userInfo.id,
        token: userState.userInfo.token,
        selectedPlayer,
      });
    },
    onSuccess: () => {
      toast.success("squad added successfully");
      squadRefetch();
      setIsActive(false);
    },
    onError: (error) => {
      console.log(error, "error");
      toast.error("only 3 squad you can added");
    },
  });

  const handleChange = (e) => {
    if (e.target.checked) {
      setCheckChecked([...checkChecked, e.target.value]);
    } else {
      setCheckChecked([
        ...checkChecked.filter((item) => item !== e.target.value),
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkChecked.length > 0) {
      mutate({ selectedPlayer: checkChecked });
      squadRefetch();
      setCheckChecked([]);
    } else {
      toast.error("Please Select Player");
    }
  };

  const { mutate: deleteSquadMutate } = useMutation({
    mutationFn: ({ squadId }) =>
      deleteSquad({
        token: userState.userInfo.token,
        squadId,
      }),
    mutationKey: ["squad"],
    onSuccess: (data) => {
      squadRefetch();
      toast.success(data.message);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const handleClick = async ({ squadId }) => {
    if (window.confirm("Are you sure delete this squad?")) {
      deleteSquadMutate({ squadId });
    }
  };

  const handleClickSingleSquad = async ({ _id }) => {
    console.log(_id, "id form click single squad");

    const data = await getSquadById({
      squadId: _id,
      token: userState.userInfo.token,
    });

    setOneSquad(data[0].selectedPlayer);
    setIsSquadActive(true);
    setIsActive(false);
  };

  const closeSquad = () => {
    setIsSquadActive(false);
  };

  const {
    data,
    error,
    isLoading: playersLoading,
  } = useQuery({
    queryFn: useCallback(() => {
      return getPlayers({
        userId: userState.userInfo.id,
        token: userState.userInfo.token,
      });
    }, [userState]),
    queryKey: ["player", userState.userInfo.id],
  });

  if (error) {
    toast.error(error.message);
    console.log(error);
  }

  useEffect(() => {
    if (data) {
      if (Array.isArray(data)) {
        setPlayers(data);
      } else {
        setPlayers([data]);
      }
    }
  }, [data, players]);

  const {
    data: squadData,
    refetch: squadRefetch,
    isLoading: squadIsLoading,
  } = useQuery({
    queryFn: useCallback(() => {
      return getSquad({
        userId: userState?.userInfo?.id,
        token: userState.userInfo.token,
      });
    }, [userState.userInfo]),

    queryKey: ["squad"],
  });

  useEffect(() => {
    async function squadDataFunc() {
      const data = await Promise.all(
        oneSquad?.map((item) => {
          return getPlayer({ playerId: item, token: userState.userInfo.token });
        })
      );
      setPlayersBySquad([...data]);
    }

    squadDataFunc();
  }, [oneSquad, userState.userInfo]);

  return (
    <div className="flex flex-col mt-5 w-full ">
      <div className="">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary-darkNavy">
          Manage Squad
        </h2>

        <div className="flex flex-col gap-5 lg:flex-row items-center justify-center">
          <div className=" flex flex-row flex-wrap px-2 gap-5 justify-center items-center">
            {squadIsLoading ? (
              <Loading />
            ) : (
              squadData?.map((item, index) => (
                <div
                  key={item?._id}
                  className="flex gap-3 flex-col  rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] px-6 py-4 uppercase "
                >
                  <h4
                    className="text-center text-[18px] font-bold text-primary-brightOrange cursor-pointer "
                    onClick={() => handleClickSingleSquad({ _id: item?._id })}
                  >
                    squad {index + 1}
                  </h4>

                  <span className="border-b border-primary-darkNavy "></span>
                  <h6
                    className="cursor-pointer"
                    onClick={() => handleClickSingleSquad({ _id: item?._id })}
                  >
                    total player {item?.selectedPlayer.length}{" "}
                  </h6>
                  <span
                    className="cursor-pointer hover:underline inline"
                    onClick={() => handleClick({ squadId: item?._id })}
                  >
                    delete
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="">
            {squadData?.length < 3 && (
              <div>
                <button
                  className="text-6xl text-primary-darkNavy "
                  onClick={() => {
                    setIsActive(!isActive);
                    setIsSquadActive(false);
                  }}
                >
                  <IoAddOutline />
                </button>
              </div>
            )}
          </div>
        </div>

        {isActive &&
          (playersLoading ? (
            <Loading />
          ) : (
            <PlayerTable
              players={players}
              checkBox={true}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
            />
          ))}

        {isSquadActive && (
          <PlayerTable
            players={playersFromSquad}
            buttons={false}
            closeSquad={closeSquad}
          />
        )}
      </div>
    </div>
  );
};

export default Squad;
