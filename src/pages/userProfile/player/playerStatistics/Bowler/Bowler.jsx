import React, { useEffect, useState } from "react";
import PlayerRankCard from "../components/PlayerRankCard";
import Loading from "../../../../../components/shared/Loading/Loading";

const Bowler = ({ isLoading, bowler }) => {
  const [limit, setLimit] = useState(3);
  const bowlerHeading = [
    "NO",
    "Player Name",
    "Matches",
    "Given Run",
    "Overs",
    "Wickets",
    "Economy",
  ];

  const handelInfinityScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >
        document.documentElement.scrollHeight
      ) {
        setLimit((prev) => prev + prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfinityScroll);
    return () => window.removeEventListener("scroll", handelInfinityScroll);
  }, []);

  return (
    <div className="container block m-auto">
      {isLoading ? (
        <Loading />
      ) : (
        <PlayerRankCard
          playerHeading={bowlerHeading}
          isBatter={false}
          topPlayers={bowler}
          limit={limit}
        />
      )}
    </div>
  );
};

export default Bowler;
