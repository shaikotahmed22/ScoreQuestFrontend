import React, { useEffect, useState } from "react";
import Header from "../../../../../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { io } from "socket.io-client";
import { getMatchByMatchId } from "../../../../../service/match";
import { useFetchUserNames } from "../../../../../hook/useFetchUserNames";
import MatchStatisticsCard from "./components/MatchStatisticsCard";
import Loading from "../../../../../components/shared/Loading/Loading";

const MatchStatistics = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const [match, setMatch] = useState();
  const matchState = useSelector((state) => state.match);

  const [requestingTeamPlayerName, setRequestingTeamPlayerName] = useState({});
  const [requestedTeamPlayerName, setRequestedTeamPlayerName] = useState({});

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["match"],
    queryFn: () =>
      getMatchByMatchId({
        matchId: matchId,
      }),
  });

  const socket = io("https://scorequest.onrender.com");

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

  useEffect(() => {
    if (match) {
      if (
        match?.battingUser?.userId?.toString() ===
          userState?.userInfo?.id.toString() &&
        match?.status !== "completed"
      ) {
        navigate(`/profile/match/update-match/${matchId}`);
      }
    }
  }, [match, data]);
  console.log(match, "match");

  const requestingNameMap = useFetchUserNames(
    match?.score?.requestingTeam?.playerStats
  );
  const requestedNameMap = useFetchUserNames(
    match?.score?.requestedTeam?.playerStats
  );

  useEffect(() => {
    requestingNameMap.then((data) =>
      setRequestingTeamPlayerName((prev) => ({ ...prev, ...data }))
    );
  }, [match?.score?.requestingTeam?.playerStats]);

  useEffect(() => {
    requestedNameMap.then((data) =>
      setRequestedTeamPlayerName((prev) => ({ ...prev, ...data }))
    );
  }, [match?.score?.requestedTeam?.playerStats]);

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mx-auto p-4 mb-2  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg mt-5">
          <div className="flex flex-col md:flex-row justify-between items-stretch align-baseline  ">
            <div className=" w-full md:w-[45%] ">
              <div
                className={`${
                  match?.teams?.requestingTeam?.userId?.toString() ===
                    match?.battingUser?.userId?.toString() &&
                  match?.status !== "completed" &&
                  "border border-primary-brightOrange"
                } p-5 `}
              >
                <h3 className="text-xl font-semibold text-primary-brightOrange text-center mb-2 cursor-pointer">
                  {match?.teams?.requestingTeam?.name || "unknown"}
                </h3>

                <div className="flex flex-row gap-2 justify-evenly ">
                  <span>
                    Runs: {match?.score?.requestingTeam?.totalRuns} /{" "}
                    {match?.score?.requestingTeam?.totalWickets}{" "}
                  </span>
                  <span>
                    Overs:{" "}
                    {parseInt(match?.score?.requestingTeam.totalOvers / 6)}.
                    {match?.score?.requestingTeam.totalOvers % 6}
                  </span>
                </div>

                <div className="flex flex-row gap-2 justify-center mt-3">
                  <span>Extra Runs: </span>
                  <span>
                    lb: {match?.score?.requestingTeam?.extraRun?.legBye}
                  </span>
                  <span>b: {match?.score?.requestingTeam?.extraRun?.bye}</span>
                  <span>
                    nb: {match?.score?.requestingTeam?.extraRun?.noBall}
                  </span>
                  <span>
                    wd: {match?.score?.requestingTeam?.extraRun?.wideBall}
                  </span>
                </div>
              </div>
              <MatchStatisticsCard
                battingPlayerNameKey={requestingTeamPlayerName}
                bowlingPlayerKey={requestedTeamPlayerName}
                match={match}
                teamKeyBatting={"requestingTeam"}
                teamKeyBowling={"requestedTeam"}
              />
            </div>
            <span className=" w-full mt-5 md:mt-0 md:flex-1 text-center p-5 ">
              VS
            </span>
            <div className="w-full md:w-[45%] ">
              <div
                className={`${
                  match?.teams?.requestedTeam?.userId?.toString() ===
                    match?.battingUser?.userId?.toString() &&
                  match?.status !== "completed" &&
                  "border border-primary-brightOrange"
                } p-5`}
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
                    Overs:{" "}
                    {parseInt(match?.score?.requestedTeam.totalOvers / 6)}.
                    {match?.score?.requestedTeam.totalOvers % 6}
                  </span>
                </div>

                <div className="flex flex-row gap-2 justify-center mt-3">
                  <span>Extra Runs: </span>
                  <span>
                    lb: {match?.score?.requestedTeam?.extraRun?.legBye}
                  </span>
                  <span>b: {match?.score?.requestedTeam?.extraRun?.bye}</span>
                  <span>
                    nb: {match?.score?.requestedTeam?.extraRun?.noBall}
                  </span>
                  <span>
                    wd: {match?.score?.requestedTeam?.extraRun?.wideBall}
                  </span>
                </div>
              </div>
              <MatchStatisticsCard
                battingPlayerNameKey={requestedTeamPlayerName}
                bowlingPlayerKey={requestingTeamPlayerName}
                match={match}
                teamKeyBatting={"requestedTeam"}
                teamKeyBowling={"requestingTeam"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchStatistics;
