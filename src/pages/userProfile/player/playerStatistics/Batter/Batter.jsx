import React, { useEffect, useState } from "react";
import PlayerRankCard from "../components/PlayerRankCard";
import Loading from "../../../../../components/shared/Loading/Loading";

const batterHeading = [
  "NO",
  "Player Name",
  "Matches",
  "Runs",
  "Ball Faced",
  "Total 4s",
  "Total 6s",
  "Average",
];

const Batter = ({ batter, isLoading }) => {
  const [limit, setLimit] = useState(3);

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
          playerHeading={batterHeading}
          limit={limit}
          topPlayers={batter}
        />
      )}
    </div>
  );
};

export default Batter;
