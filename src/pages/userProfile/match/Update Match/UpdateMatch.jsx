import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { getMatchByMatchId } from "../../../../service/match";
import { useSelector } from "react-redux";
import StartMatchTImeCount from "./container/components/StartMatchTimeCount/StartMatchTImeCount";
import Loading from "../../../../components/shared/Loading/Loading";
import TosWinnerOverWickets from "./container/components/TosWinner/TosWinnerOverWickets";
import SelectInningsType from "./container/components/SelectInningsType/SelectInningsType";
import UpdateMatchBallByBall from "./container/updateMatch/UpdateMatchBallByBall";
import { toast } from "react-hot-toast";

const UpdateMatch = () => {
  const { matchId } = useParams();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [match, setMatch] = useState();

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["match"],
    queryFn: () =>
      getMatchByMatchId({
        matchId: matchId,
        token: userState.userInfo.token,
      }),
  });

  useEffect(() => {
    if (data) {
      setMatch(data);
    } else refetch();
  }, [data]);

  console.log(match, "match");

  useEffect(() => {
    console.log("from useEffect");
    if (match) {
      if (match?.status === "completed") {
        navigate(`/match-statistics/${matchId}`);
      }
      if (
        match?.battingUser?.userId?.toString() !== userState?.userInfo?.id &&
        userState?.userInfo?.id === match?.bowlingUser?.userId?.toString() &&
        match?.status !== "completed"
      ) {
        navigate(`/match-statistics/${matchId}`);
      }

      if (
        match?.battingUser?.userId?.toString() === userState?.userInfo?.id &&
        userState?.userInfo?.id !== match?.bowlingUser?.userId?.toString() &&
        match?.status !== "completed"
      ) {
        console.log("working from condition");

        navigate(`/profile/match/update-match/${matchId}`);
      }

      if (match?.toss?.tossWinner && !match?.toss?.inningsType) {
        navigate(`/profile/match/innings/${matchId}`);
      }
    }
  }, [
    match?.battingUser?.userId,
    match?.bowlingUser?.userId,
    match?.toss?.tossWinner,
    match?.toss?.inningsType,
    !isLoading,
  ]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {!match?.toss?.tossWinner && <StartMatchTImeCount match={match} />}

          {/* {nextPage && (
            <TosWinnerOverWickets match={match} setNextPage={setNextPage} />
          )} */}

          {/* {userState.userInfo.id === match?.toss?.tossWinner &&
            !match?.battingUser?.userId &&
            !match?.bowlingUser?.userId && <SelectInningsType match={match} />} */}

          {/* {match?.battingUser?.userId?.toString() ===
            userState?.userInfo?.id?.toString() &&
          match?.status === "accepted" ? (
            <UpdateMatchBallByBall match={match} /> */}
        </div>
      )}
    </div>
  );
};

export default UpdateMatch;
