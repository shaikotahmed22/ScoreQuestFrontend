import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getSquadById } from "../../../../../../service/squad";
import { getPlayer } from "../../../../../../service/player";
import PlayersList from "./components/PlayersList";
import { IoMdClose } from "react-icons/io";
import images from "../../../../../../constants/images";
import stables from "../../../../../../constants/stable";
import UpdateScoreButton from "../../../../../../components/shared/button/UpdateScoreButton";
import WideNoByeRun from "./components/WideNoByeRun";
import {
  getMatchByMatchId,
  updateMatch,
} from "../../../../../../service/match";
import { toast } from "react-hot-toast";
import { matchActions } from "../../../../../../store/reducers/matchUpdate";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../../../components/shared/Loading/Loading";
import { io } from "socket.io-client";

const runs = [0, 1, 2, 3, 4, 5, 6];

const INIT_SELECT_PLAYER = {
  batter1: {
    id: "",
    fName: "",
    lName: "",
    avatar: "",
  },
  batter2: {
    id: "",
    fName: "",
    lName: "",
    avatar: "",
  },
  bowler: {
    id: "",
    fName: "",
    lName: "",
    avatar: "",
  },
};

const INIT_PER_BALL_OCCURS = {
  ballOccurs: "",
  wideBye: null,
  batterScore: null, //if score in no ball
  byeScore: null, // if bye in no ball
  byeRun: null, // bye or legBye
  catchKeeperId: "",
  runOutThrowerId: "",
};

const INIT_STATS = {
  run: 0,
  ballPlay: 0,
  isOut: false,
};

const UpdateMatchBallByBall = () => {
  const userState = useSelector((state) => state.user);
  const { matchId } = useParams();

  const [match, setMatch] = useState();
  const navigate = useNavigate();
  const matchState = useSelector((state) => state.match);
  const dispatch = useDispatch();

  const [selectedPlayer, setSelectedPlayer] = useState(
    localStorage.getItem(`playerInfo:${matchId}`)
      ? JSON.parse(localStorage.getItem(`playerInfo:${matchId}`))
      : { ...INIT_SELECT_PLAYER }
  );

  const [selectedBatterId, setSelectedBatterId] = useState("");
  const [selectedBowlerId, setSelectedBowlerId] = useState("");

  const [perBallOccurs, setPerBallOccurs] = useState({
    ...INIT_PER_BALL_OCCURS,
  });
  const [overCount, setOverCount] = useState(
    localStorage.getItem(`overCount:${matchId}`)
      ? JSON.parse(localStorage.getItem(`overCount:${matchId}`))
      : 1
  );
  const [selectBatter1, setSelectBatter1] = useState(false);
  const [selectBatter2, setSelectBatter2] = useState(false);
  const [selectBowling, setSelectBowling] = useState(false);

  const [battingTeamKey, setBattingTeamKey] = useState("");
  const [bowlingTeamKey, setBowlingTeamKey] = useState("");

  const [battingPlayer, setBattingPlayer] = useState();
  const [bowlingPlayer, setBowlingPlayer] = useState();

  const [turnOff, setTurnOff] = useState(false);

  const [batter1Stats, setBatter1Stats] = useState({ ...INIT_STATS });
  const [batter2Stats, setBatter2Stats] = useState({ ...INIT_STATS });
  const [bowlerStats, setBowlerStats] = useState({
    givenRun: 0,
    ball: 0,
    wicketTaken: 0,
  });

  console.log(perBallOccurs, "perBallOccurs");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["match"],
    queryFn: () =>
      getMatchByMatchId({
        matchId: matchId,
        token: userState.userInfo.token,
      }),
  });

  const socket = io("https://scorequest.onrender.com");

  useEffect(() => {
    if (!match) {
      refetch();
    }
  }, [match, data]);

  useEffect(() => {
    if (match && data) {
      if (
        match?.battingUser?.userId?.toString() !== userState?.userInfo?.id &&
        userState?.userInfo?.id === match?.bowlingUser?.userId?.toString()
      ) {
        console.log("from first condition");
        localStorage.removeItem(`overCount:${matchId}`);
        localStorage.removeItem(`playerInfo:${matchId}`);
        setSelectedPlayer(
          JSON.parse(localStorage.getItem(`playerInfo:${matchId}`))
        );
        setOverCount(JSON.parse(localStorage.getItem(`overCount:${matchId}`)));
        navigate(`match-statistics/${matchId}`);
      }

      if (match?.status === "completed") {
        console.log("from sec condition");
        navigate(`/match-statistics/${matchId}`);
      }

      console.log(match, "from update ball by ball");

      if (match?.battingUser?.userId?.toString() !== userState?.userInfo?.id) {
        console.log("from 3rd condition");
        navigate(`/match-statistics/${matchId}`);
      }
    }
  }, [match?.battingUser, match?.bowlingUser, match?.status, match]);

  useEffect(() => {
    // Listen for updates from the server
    socket.on("scoreUpdated", (data) => {
      // console.log("Score updated:", data);
      setMatch(data);
    });

    // Clean up the connection when the component unmounts
    return () => {
      socket.off("scoreUpdated");
    };
  }, []);

  useEffect(() => {
    if (data) {
      const emitData = matchState.match ? matchState.match : data;
      socket.emit("updateScore", emitData);
    } else {
      refetch();
    }
  }, [matchState, data]);

  const { mutate: updateMutate } = useMutation({
    mutationFn: ({ perBallOccurs }) =>
      updateMatch({
        matchId: match?._id,
        perBallOccurs: perBallOccurs,
        selectedBatterId: selectedBatterId,
        selectedBowlerId: selectedBowlerId,
        overCount: overCount,
        token: userState?.userInfo?.token,
      }),
    onSuccess: (data) => {
      setPerBallOccurs({
        ballOccurs: "",
        wideBye: 0,
        batterScore: 0,
        byeScore: 0,
        byeRun: 0,
        catchKeeperId: "",
        runOutThrowerId: "",
      });

      dispatch(matchActions.setMatch(data));
    },
    onError: (error) => {
      toast.error(error.message);
    },
    mutationKey: ["updateMatch"],
  });

  useEffect(() => {
    let battingTeam =
      match?.battingUser?.userId?.toString() ===
      match?.teams?.requestingTeam?.userId?.toString()
        ? "requestingTeam"
        : "requestedTeam";
    let bowlingTeamKey =
      battingTeam === "requestedTeam" ? "requestingTeam" : "requestedTeam";

    setBattingTeamKey(battingTeam);
    setBowlingTeamKey(bowlingTeamKey);
  }, [match]);

  const handleSelectedPlayer = (data) => {
    if (selectBatter1) {
      if (data.id === selectedPlayer.batter2.id) {
        window.alert("Already select this player please try another player");
      } else {
        setSelectedPlayer({
          ...selectedPlayer,
          batter1: {
            id: data.id,
            fName: data.fName,
            lName: data.lName,
            avatar: data.avatar,
          },
        });
      }
    }
    if (selectBatter2) {
      if (selectedPlayer.batter1.id === data.id) {
        window.alert("Already select this player please try another player");
      } else {
        setSelectedPlayer({
          ...selectedPlayer,
          batter2: {
            id: data.id,
            fName: data.fName,
            lName: data.lName,
            avatar: data.avatar,
          },
        });
      }
    }
  };

  const handleSelectedBowler = (data) => {
    setSelectedPlayer({
      ...selectedPlayer,
      bowler: {
        id: data.id,
        fName: data.fName,
        lName: data.lName,
        avatar: data.avatar,
      },
    });
  };

  useEffect(() => {
    localStorage.setItem(
      `playerInfo:${matchId}`,
      JSON.stringify(selectedPlayer)
    );
    setSelectedBowlerId(selectedPlayer?.bowler?.id);
  }, [selectedPlayer]);

  const { data: requestingSquad, refetch: requestingSquadRefetch } = useQuery({
    queryKey: ["requestingSquad"],
    queryFn: () =>
      getSquadById({
        squadId: match?.squads?.requestingTeamSquad?.squadId,
        token: userState?.userInfo?.token,
      }),
  });

  const { data: requestedSquad, refetch: requestedSquadRefetch } = useQuery({
    queryKey: ["requestedSquad"],
    queryFn: () =>
      getSquadById({
        squadId: match?.squads?.requestedTeamSquad?.squadId,
        token: userState?.userInfo?.token,
      }),
  });

  useEffect(() => {
    if (requestingSquad) {
      requestingSquadRefetch();
    }
    if (requestedSquad) {
      requestedSquadRefetch();
    }
  }, [requestingSquad, requestedSquad]);

  const { data: requestedPlayers } = useQuery({
    queryKey: ["requestedPlayer"],
    queryFn: async () => {
      const players = await Promise.all(
        requestedSquad[0]?.selectedPlayer?.map((item) => {
          return getPlayer({
            playerId: item,
            token: userState?.userInfo?.token,
          });
        })
      );
      return players;
    },
  });

  const { data: requestingPlayers } = useQuery({
    queryKey: ["requestingPlayer"],
    queryFn: async () => {
      const players = await Promise.all(
        requestingSquad[0]?.selectedPlayer?.map((item) => {
          return getPlayer({
            playerId: item,
            token: userState?.userInfo?.token,
          });
        })
      );

      return players;
    },
  });

  const handelRunOccurs = (data) => {
    if (typeof data === "number") {
      setPerBallOccurs({
        // ...perBallOccurs,
        wideBye: null,
        batterScore: null, //if score in no ball
        byeScore: null, // if bye in no ball
        byeRun: null, // bye or legBye
        catchKeeperId: "",
        runOutThrowerId: "",
        ballOccurs: data?.toString(),
      });
    } else {
      setPerBallOccurs({
        // ...perBallOccurs,
        wideBye: null,
        batterScore: null, //if score in no ball
        byeScore: null, // if bye in no ball
        byeRun: null, // bye or legBye
        catchKeeperId: "",
        runOutThrowerId: "",
        ballOccurs: data,
      });
    }
  };

  const handelCatchOrRunOutId = (data) => {
    if (perBallOccurs.ballOccurs === "caught") {
      setPerBallOccurs({
        ...perBallOccurs,
        wideBye: null,
        batterScore: null,
        byeScore: null,
        byeRun: null,
        catchKeeperId: data.id,
        runOutThrowerId: "",
      });
    }

    if (perBallOccurs.ballOccurs === "runOut") {
      setPerBallOccurs({
        ...perBallOccurs,
        wideBye: null,
        batterScore: null,
        byeScore: null,
        byeRun: null,
        runOutThrowerId: data.id,
        catchKeeperId: "",
      });
    }
  };

  const handelByeExtra = (data) => {
    if (typeof data === "object" && perBallOccurs.ballOccurs === "noBall") {
      setPerBallOccurs({
        ...perBallOccurs,
        wideBye: null,
        byeRun: null, // bye or legBye
        catchKeeperId: "",
        runOutThrowerId: "",
        batterScore: data.batterScore,
        byeScore: null,
      });
    } else if (
      perBallOccurs.ballOccurs === "noBall" &&
      typeof data === "number"
    ) {
      setPerBallOccurs({
        ...perBallOccurs,
        wideBye: null,
        byeRun: null, // bye or legBye
        catchKeeperId: "",
        runOutThrowerId: "",
        byeScore: data,
        batterScore: null,
      });
    }

    if (perBallOccurs.ballOccurs === "wide") {
      setPerBallOccurs({
        ...perBallOccurs,
        batterScore: null, //if score in no ball
        byeScore: null, // if bye in no ball
        byeRun: null, // bye or legBye
        catchKeeperId: "",
        runOutThrowerId: "",

        wideBye: data,
      });
    }

    if (
      perBallOccurs.ballOccurs === "bye" ||
      perBallOccurs.ballOccurs === "legBye"
    ) {
      setPerBallOccurs({
        ...perBallOccurs,
        wideBye: null,
        batterScore: null, //if score in no ball
        byeScore: null, // if bye in no ball
        catchKeeperId: "",
        runOutThrowerId: "",
        byeRun: data,
      });
    }
  };

  useEffect(() => {
    if (
      parseInt(perBallOccurs.ballOccurs) >= 0 &&
      parseInt(perBallOccurs.ballOccurs) <= 6 &&
      perBallOccurs.ballOccurs !== ""
    ) {
      localStorage.setItem(
        `overCount:${matchId}`,
        JSON.stringify(overCount + 1)
      );
      setOverCount(JSON.parse(localStorage.getItem(`overCount:${matchId}`)));

      updateMutate({ perBallOccurs: perBallOccurs });
    }

    if (
      perBallOccurs.ballOccurs === "bowled" ||
      perBallOccurs.ballOccurs === "lbw" ||
      perBallOccurs.ballOccurs === "stumped"
    ) {
      localStorage.setItem(
        `overCount:${matchId}`,
        JSON.stringify(overCount + 1)
      );
      setOverCount(JSON.parse(localStorage.getItem(`overCount:${matchId}`)));
      updateMutate({ perBallOccurs: perBallOccurs });
    }

    if (
      perBallOccurs.ballOccurs === "caught" &&
      perBallOccurs.catchKeeperId !== ""
    ) {
      localStorage.setItem(
        `overCount:${matchId}`,
        JSON.stringify(overCount + 1)
      );
      setOverCount(JSON.parse(localStorage.getItem(`overCount:${matchId}`)));
      updateMutate({ perBallOccurs: perBallOccurs });
    }

    if (
      perBallOccurs.ballOccurs === "runOut" &&
      perBallOccurs.runOutThrowerId !== ""
    ) {
      localStorage.setItem(
        `overCount:${matchId}`,
        JSON.stringify(overCount + 1)
      );
      setOverCount(JSON.parse(localStorage.getItem(`overCount:${matchId}`)));
      updateMutate({ perBallOccurs: perBallOccurs });
    }

    if (perBallOccurs.ballOccurs === "wide" && perBallOccurs.wideBye !== null) {
      updateMutate({ perBallOccurs: perBallOccurs });
    }

    if (
      perBallOccurs.ballOccurs === "noBall" &&
      (perBallOccurs.batterScore !== null || perBallOccurs.byeScore !== null)
    ) {
      updateMutate({ perBallOccurs: perBallOccurs });
    }

    if (
      (perBallOccurs.ballOccurs === "legBye" ||
        perBallOccurs.ballOccurs === "bye") &&
      perBallOccurs.byeRun !== null
    ) {
      localStorage.setItem(
        `overCount:${matchId}`,
        JSON.stringify(overCount + 1)
      );
      setOverCount(JSON.parse(localStorage.getItem(`overCount:${matchId}`)));
      updateMutate({ perBallOccurs: perBallOccurs });
    }
  }, [
    perBallOccurs.ballOccurs,
    perBallOccurs.catchKeeperId,
    perBallOccurs.runOutThrowerId,
    perBallOccurs.batterScore,
    perBallOccurs.byeScore,
    perBallOccurs.wideBye,
    perBallOccurs.byeRun,
  ]);

  useEffect(() => {
    if (overCount === 7) {
      setSelectedPlayer({
        ...selectedPlayer,
        bowler: {
          id: "",
          fName: "",
          lName: "",
          avatar: "",
        },
      });
      localStorage.setItem(`overCount:${matchId}`, JSON.parse(1));
      setOverCount(JSON.parse(localStorage.getItem(`overCount:${matchId}`)));
    }
  }, [overCount]);

  useEffect(() => {
    if (requestedPlayers && requestingPlayers) {
      if (
        battingTeamKey === "requestedTeam" &&
        bowlingTeamKey === "requestingTeam"
      ) {
        setBattingPlayer(requestedPlayers);
        setBowlingPlayer(requestingPlayers);
      }
      if (
        battingTeamKey === "requestingTeam" &&
        bowlingTeamKey === "requestedTeam"
      ) {
        setBattingPlayer(requestingPlayers);
        setBowlingPlayer(requestedPlayers);
      }
    }
  }, [requestedPlayers, requestingPlayers, bowlingTeamKey, battingTeamKey]);

  useEffect(() => {
    match?.score[battingTeamKey]?.playerStats.map((item) => {
      if (item.playerId?.toString() === selectedPlayer?.batter1.id) {
        setBatter1Stats({
          run: item.runs,
          ballPlay: item.playBalls,
          isOut: item.out.out,
        });
      }

      if (item.playerId?.toString() === selectedPlayer?.batter2.id) {
        setBatter2Stats({
          run: item.runs,
          ballPlay: item.playBalls,
          isOut: item.out.out,
        });
      }
    });

    match?.score[bowlingTeamKey]?.playerStats.map((item) => {
      if (item.playerId?.toString() === selectedPlayer?.bowler.id) {
        setBowlerStats({
          ball: item.overs.ball,
          givenRun: item.overs.givenRun,
          wicketTaken: item.wicketTaken.totalWickets,
        });
      }
    });
  }, [selectedPlayer, match]);

  useEffect(() => {
    if (batter1Stats?.isOut) {
      toast.success("Out");
      setSelectedPlayer({
        ...selectedPlayer,
        batter1: {
          fName: "",
          lName: "",
          id: "",
          avatar: "",
        },
      });
      setBatter1Stats({ ...INIT_STATS });
      setSelectedBatterId("");
    }

    if (batter2Stats?.isOut) {
      setSelectedPlayer({
        ...selectedPlayer,
        batter2: {
          fName: "",
          lName: "",
          id: "",
          avatar: "",
        },
      });
      setBatter2Stats({ ...INIT_STATS });
    }
  }, [batter1Stats, batter2Stats]);

  return (
    <div className="relative">
      {isLoading ? (
        <Loading />
      ) : (
        <div className=" shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-6 mx-auto rounded-lg">
          <div className="flex flex-col md:flex-row justify-between items-center ">
            <div
              className={`${
                battingTeamKey === "requestingTeam" &&
                "border border-primary-brightOrange"
              } p-5 w-full md:w-[30%] `}
            >
              <h3 className="text-xl font-semibold text-primary-brightOrange text-center mb-2 cursor-pointer">
                {match?.teams?.requestingTeam?.name || "unknown"}
              </h3>

              <div className="flex flex-row gap-2 justify-evenly ">
                <span>
                  Runs: {match?.score?.requestingTeam.totalRuns} /{" "}
                  {match?.score?.requestingTeam.totalWickets}{" "}
                </span>
                <span>
                  Overs: {parseInt(match?.score?.requestingTeam.totalOvers / 6)}
                  .{match?.score?.requestingTeam.totalOvers % 6}
                </span>
              </div>
            </div>
            <span className="flex-1 text-center p-5 ">VS</span>
            <div
              className={`${
                battingTeamKey === "requestedTeam" &&
                "border border-primary-brightOrange"
              } p-5 w-full md:w-[30%]`}
            >
              <h3 className="text-xl font-semibold text-primary-brightOrange text-center mb-2 cursor-pointer">
                {match?.teams?.requestedTeam?.name || "unknown"}
              </h3>

              <div className="flex flex-row justify-evenly ">
                <span>
                  Runs: {match?.score?.requestedTeam.totalRuns} /{" "}
                  {match?.score?.requestedTeam.totalWickets}{" "}
                </span>
                <span>
                  Overs: {parseInt(match?.score?.requestedTeam.totalOvers / 6)}.
                  {match?.score?.requestedTeam.totalOvers % 6}
                </span>
              </div>
            </div>
          </div>

          <span className="border-b border-primary-brightOrange mb-5 w-full block py-2"></span>

          {/* Batting Players Selection */}
          <div className="mb-4">
            <h4 className="mt-5 text-md font-semibold capitalize text-accentColor-skyBlur mb-2 ">
              Select Batter
            </h4>

            <div className="flex flex-col md:flex-row gap-5">
              {selectedPlayer?.batter1?.id === INIT_SELECT_PLAYER.batter1.id ? (
                <button
                  onClick={() => setSelectBatter1(true)}
                  className="w-full py-4 border hover:border-primary-brightOrange capitalize shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md focus:ring-2 focus:ring-primary-brightOrange "
                >
                  Click here to Select first player
                </button>
              ) : (
                <div
                  onClick={() =>
                    setSelectedBatterId(selectedPlayer?.batter1?.id)
                  }
                  className={`${
                    selectedBatterId === selectedPlayer?.batter1?.id &&
                    "bg-primary-brightOrange rounded-md text-natural-white"
                  } flex w-full flex-wrap xl:flex-nowrap xl:flex-row cursor-pointer justify-between rounded-md gap-5 items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-2 mb-5`}
                >
                  <div className="flex w-full flex-row items-center cursor-pointer gap-5">
                    <img
                      className="rounded-full"
                      height={50}
                      width={50}
                      src={
                        selectedPlayer?.batter1?.avatar
                          ? stables.UPLOAD_FOLDER_BASE_URL +
                            selectedPlayer?.batter1?.avatar
                          : images.Profile
                      }
                      alt="img"
                    />
                    <h3
                      className={`font-bold text-xl ${
                        selectedBatterId === selectedPlayer?.batter1?.id
                          ? "text-natural-white"
                          : "text-primary-brightOrange"
                      } `}
                    >
                      {selectedPlayer?.batter1?.fName}{" "}
                      {selectedPlayer?.batter1?.lName}{" "}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <span>{batter1Stats?.run}</span> /{" "}
                    <span>
                      {parseInt(batter1Stats?.ballPlay / 6)}.
                      {parseInt(batter1Stats?.ballPlay % 6)}
                    </span>
                  </div>

                  <div>
                    <span
                      className="hover:underline"
                      onClick={() => setSelectBatter1(true)}
                    >
                      Change
                    </span>
                  </div>
                </div>
              )}

              {selectedPlayer?.batter2?.id ===
              INIT_SELECT_PLAYER?.batter2?.id ? (
                <button
                  onClick={() => setSelectBatter2(true)}
                  className="w-full py-4 border  hover:border-primary-brightOrange capitalize shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md focus:ring-2 focus:ring-primary-brightOrange "
                >
                  Click here to Select 2nd player
                </button>
              ) : (
                <div
                  onClick={() =>
                    setSelectedBatterId(selectedPlayer?.batter2?.id)
                  }
                  className={`${
                    selectedBatterId === selectedPlayer?.batter2?.id &&
                    "bg-primary-brightOrange rounded-md text-natural-white"
                  } flex w-full flex-wrap xl:flex-nowrap xl:flex-row cursor-pointer justify-between rounded-md gap-5 items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-2 mb-5`}
                >
                  <div className="flex w-full flex-row items-center cursor-pointer gap-5">
                    <img
                      className="rounded-full"
                      height={50}
                      width={50}
                      src={
                        selectedPlayer?.batter2?.avatar
                          ? stables.UPLOAD_FOLDER_BASE_URL +
                            selectedPlayer?.batter2?.avatar
                          : images.Profile
                      }
                      alt="img"
                    />
                    <h3
                      className={`font-bold text-xl ${
                        selectedBatterId === selectedPlayer?.batter2?.id
                          ? "text-natural-white"
                          : "text-primary-brightOrange"
                      } `}
                    >
                      {selectedPlayer?.batter2?.fName}{" "}
                      {selectedPlayer?.batter2?.lName}{" "}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <span>{batter2Stats?.run}</span> /{" "}
                    <span>
                      {parseInt(batter2Stats?.ballPlay / 6)}.
                      {parseInt(batter2Stats?.ballPlay % 6)}
                    </span>
                  </div>
                  <div>
                    <span
                      className="hover:underline"
                      onClick={() => setSelectBatter2(true)}
                    >
                      Change
                    </span>
                  </div>
                </div>
              )}
            </div>

            {!selectedBatterId &&
              selectedPlayer?.batter1?.id &&
              selectedPlayer?.batter2?.id && (
                <p className="text-primary-brightOrange font-semibold ">
                  Please click a player who on the strick
                </p>
              )}
          </div>

          {/* Bowling Player Selection */}
          <div className="mb-4">
            <h4 className="mt-5 text-md font-semibold capitalize text-accentColor-skyBlur mb-2 ">
              Select Bowler
            </h4>

            <div className="flex flex-row gap-5">
              {selectedPlayer?.bowler?.id === INIT_SELECT_PLAYER.bowler.id ? (
                <button
                  onClick={() => setSelectBowling(true)}
                  className="w-1/2 py-4 border capitalize shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md focus:ring-2 focus:ring-primary-brightOrange "
                >
                  Click here to Select player 1
                </button>
              ) : (
                <div
                  className={`${
                    selectedBowlerId === selectedPlayer?.bowler?.id &&
                    "bg-primary-brightOrange rounded-md text-natural-white"
                  } flex  flex-wrap xl:flex-nowrap w-full md:w-[50%] cursor-pointer justify-between xl:flex-row gap-5 items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-2 mb-5`}
                >
                  <div className="flex w-full flex-row items-center cursor-pointer gap-5">
                    <img
                      className="rounded-full"
                      height={50}
                      width={50}
                      src={
                        selectedPlayer?.bowler?.avatar
                          ? stables.UPLOAD_FOLDER_BASE_URL +
                            selectedPlayer.bowler.avatar
                          : images.Profile
                      }
                      alt="img"
                    />

                    <h3
                      className={`font-bold text-xl ${
                        selectedBowlerId === selectedPlayer?.bowler?.id
                          ? "text-natural-white"
                          : "text-primary-brightOrange"
                      }`}
                    >
                      {selectedPlayer?.bowler?.fName}{" "}
                      {selectedPlayer?.bowler?.lName}{" "}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <span>{bowlerStats?.givenRun}</span> /{" "}
                    <span>{bowlerStats?.wicketTaken}</span>
                    <span className="ml-5">
                      {parseInt(bowlerStats?.ball / 6)}.
                      {parseInt(bowlerStats?.ball % 6)}
                    </span>{" "}
                  </div>

                  <div>
                    <span
                      className="hover:underline"
                      onClick={() => setSelectBowling(true)}
                    >
                      Change
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Per Ball Occurs Buttons */}
          <div
            className={`${
              (selectedPlayer?.batter1?.id === INIT_SELECT_PLAYER.batter1.id ||
                INIT_SELECT_PLAYER.batter2.id === selectedPlayer?.batter2?.id ||
                INIT_SELECT_PLAYER.bowler.id === selectedPlayer?.bowler?.id ||
                selectedBatterId === "") &&
              "pointer-events-none opacity-25"
            } flex flex-col gap-10 `}
          >
            <div className="flex flex-col md:flex-row gap-5 ">
              <h3 className="text-xl font-semibold text-primary-brightOrange mb-2">
                Runs:
              </h3>
              <div className="flex flex-wrap gap-5">
                {runs.map((item, index) => (
                  <span key={index} onClick={() => handelRunOccurs(item)}>
                    <UpdateScoreButton title={item} key={index} />
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <h3 className="text-xl font-semibold text-primary-brightOrange mb-2">
                Extras:
              </h3>

              <div className="flex flex-wrap flex-col gap-5">
                <div className="flex flex-wrap gap-2 md:gap-5">
                  <span
                    onClick={() => {
                      handelRunOccurs("wide");
                      setTurnOff(true);
                    }}
                  >
                    <UpdateScoreButton
                      title={"Wide"}
                      classes={`${
                        perBallOccurs?.ballOccurs === "wide" &&
                        "bg-primary-brightOrange "
                      } w-[80px] `}
                    />
                  </span>
                  <span
                    onClick={() => {
                      handelRunOccurs("noBall");
                      setTurnOff(true);
                    }}
                  >
                    <UpdateScoreButton
                      title={"No ball"}
                      classes={`${
                        perBallOccurs?.ballOccurs === "noBall" &&
                        "bg-primary-brightOrange "
                      } w-[80px]`}
                    />
                  </span>
                  <span
                    onClick={() => {
                      handelRunOccurs("legBye");
                      setTurnOff(true);
                    }}
                  >
                    <UpdateScoreButton
                      title={"Leg Bye"}
                      classes={`${
                        perBallOccurs?.ballOccurs === "legBye" &&
                        "bg-primary-brightOrange "
                      } w-[80px]`}
                    />
                  </span>
                  <span
                    onClick={() => {
                      handelRunOccurs("bye");
                      setTurnOff(true);
                    }}
                  >
                    <UpdateScoreButton
                      title={"Bye"}
                      classes={`${
                        perBallOccurs?.ballOccurs === "bye" &&
                        "bg-primary-brightOrange "
                      } w-[80px]`}
                    />
                  </span>
                </div>
                {turnOff && perBallOccurs?.ballOccurs === "wide" && (
                  <WideNoByeRun
                    setTurnOff={setTurnOff}
                    title={"If have any bye run on wide"}
                    setByeNo={handelByeExtra}
                    type={"wide"}
                  />
                )}

                {turnOff && perBallOccurs?.ballOccurs === "noBall" && (
                  <div className="flex flex-col flex-wrap gap-5">
                    <WideNoByeRun
                      setTurnOff={setTurnOff}
                      title={"If have any bye run on No Ball"}
                      setByeNo={handelByeExtra}
                      type={"noBall"}
                    />
                    <WideNoByeRun
                      setTurnOff={setTurnOff}
                      title={"If have any batter run on No Ball"}
                      setByeNo={handelByeExtra}
                      type={"batterScore"}
                    />
                  </div>
                )}

                {turnOff &&
                  (perBallOccurs?.ballOccurs === "bye" ||
                    perBallOccurs?.ballOccurs === "legBye") && (
                    <WideNoByeRun
                      setTurnOff={setTurnOff}
                      title={
                        perBallOccurs?.ballOccurs === "bye"
                          ? "Add Bye Run"
                          : "Add Leg Bye Run"
                      }
                      setByeNo={handelByeExtra}
                      type={"bye"}
                    />
                  )}
              </div>
            </div>
            <div>
              <div className="flex flex-col md:flex-row gap-5">
                <h3 className="text-xl font-semibold text-primary-brightOrange mb-2">
                  Wickets:
                </h3>

                <div className="flex flex-wrap gap-2 md:gap-5">
                  <span onClick={() => handelRunOccurs("bowled")}>
                    <UpdateScoreButton title={"Bowled"} classes={"w-[80px]"} />
                  </span>
                  <span
                    onClick={() => {
                      handelRunOccurs("caught");
                      setTurnOff(true);
                    }}
                  >
                    <UpdateScoreButton title={"Caught"} classes={"w-[80px]"} />
                  </span>
                  <span onClick={() => handelRunOccurs("lbw")}>
                    <UpdateScoreButton title={"LBW"} classes={"w-[80px]"} />
                  </span>
                  <span
                    onClick={() => {
                      handelRunOccurs("runOut");
                      setTurnOff(true);
                    }}
                  >
                    <UpdateScoreButton title={"Run out"} classes={"w-[80px]"} />
                  </span>
                  <span onClick={() => handelRunOccurs("stumped")}>
                    <UpdateScoreButton title={"Stumped"} classes={"w-[80px]"} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {(selectBatter1 || selectBatter2) && (
        <div className="absolute top-0 bottom-0 left-0 w-full backdrop-blur-sm">
          <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]p-6 rounded-lg fixed h-[500px] overflow-y-auto w-[90%] left-[5%] top-[5%] bg-secondary-coolGray">
            <PlayersList
              players={battingPlayer}
              title={"Select Batting Player"}
              isSelectPlayer={false}
              classes={"cursor-pointer"}
              handleSelectedPlayer={handleSelectedPlayer}
              setSelectBatter1={setSelectBatter1}
              setSelectBatter2={setSelectBatter2}
            />

            <span
              className="absolute top-5 right-5 cursor-pointer"
              onClick={() => {
                setSelectBatter1(false);
                setSelectBatter2(false);
              }}
            >
              <IoMdClose />
            </span>
          </div>
        </div>
      )}

      {selectBowling && (
        <div className="absolute top-0 bottom-0 left-0 w-full backdrop-blur-sm">
          <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-6 rounded-lg fixed h-[500px] overflow-y-auto w-[90%] left-[5%] top-[5%] bg-secondary-coolGray">
            <PlayersList
              players={bowlingPlayer}
              title={"Select Bowling Player"}
              isSelectPlayer={false}
              classes={"cursor-pointer"}
              handleSelectedPlayer={handleSelectedBowler}
              setSelectBatter1={setSelectBowling}
            />

            <span
              className="absolute top-5 right-5 cursor-pointer"
              onClick={() => {
                setSelectBowling(false);
              }}
            >
              <IoMdClose />
            </span>
          </div>
        </div>
      )}

      {turnOff &&
        (perBallOccurs.ballOccurs === "caught" ||
          perBallOccurs.ballOccurs === "runOut") && (
          <div className="absolute top-0 bottom-0 left-0 w-full backdrop-blur-sm">
            <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-6 rounded-lg fixed h-[500px] overflow-y-auto w-[90%] left-[5%] top-[5%] bg-secondary-coolGray">
              <PlayersList
                players={bowlingPlayer}
                title={
                  (perBallOccurs.ballOccurs === "caught" &&
                    "Select caught keeper") ||
                  (perBallOccurs.ballOccurs === "runOut" &&
                    "select run out thrower")
                }
                isSelectPlayer={false}
                classes={"cursor-pointer"}
                handleSelectedPlayer={handelCatchOrRunOutId}
                setSelectBatter1={setTurnOff}
              />
              <span
                className="absolute top-5 right-5 cursor-pointer"
                onClick={() => {
                  setTurnOff(false);
                }}
              >
                <IoMdClose />
              </span>
            </div>
          </div>
        )}
    </div>
  );
};

export default UpdateMatchBallByBall;
