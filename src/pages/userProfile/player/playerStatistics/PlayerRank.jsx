import React, { useEffect, useState } from "react";
import PlayerRankCard from "./components/PlayerRankCard";
import Header from "../../../../components/Header";
import BigButton from "../../../../components/shared/button/BigButton";
import Batter from "./Batter/Batter";
import Bowler from "./Bowler/Bowler";
import { useQuery } from "@tanstack/react-query";
import { getTopPlayers } from "../../../../service/player";

const PlayerRank = () => {
  const [selectActive, setSelectActive] = useState(true);
  const [batter, setBatter] = useState([]);
  const [bowler, setBowler] = useState([]);

  const handleSendRequest = () => {
    setSelectActive(true);
  };
  const handleGetRequest = () => {
    setSelectActive(false);
  };

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["topPlayers"],
    queryFn: () => getTopPlayers(),
  });

  useEffect(() => {
    if (data) {
      const { batterRank, bowlerRank } = data;

      setBatter(batterRank);
      setBowler(bowlerRank);
    } else {
      refetch();
    }
  }, [data]);

  // console.log(batter, bowler);
  return (
    <div className="">
      <Header />
      <div className="container m-auto px-1 flex flex-row gap-2 justify-between w-full mt-5 ">
        <BigButton
          classes={`${selectActive && "border-primary-brightOrange"} border`}
          func={handleSendRequest}
          text={"Top Batters"}
          parentClass={"w-1/2"}
        />
        <BigButton
          classes={`${!selectActive && "border-primary-brightOrange"} border`}
          func={handleGetRequest}
          text={"Top Bowlers"}
          parentClass={"w-1/2"}
        />
      </div>

      {selectActive ? (
        <Batter batter={batter} isLoading={isLoading} />
      ) : (
        <Bowler bowler={bowler} isLoading={isLoading} />
      )}
    </div>
  );
};

export default PlayerRank;
