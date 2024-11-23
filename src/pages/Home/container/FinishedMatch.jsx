import React from "react";
import HeadingH3 from "../../../components/shared/HeadingH3";
import SecondaryButton from "../../../components/shared/button/SecondaryButton";
import FinishedMatchCard from "../../userProfile/match/MatchStatistics/container/components/FinishedMatchCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCompleteMatch } from "../../../service/match";
import { Link } from "react-router-dom";

const FinishedMatch = () => {
  const { data: match } = useQuery({
    queryKey: ["completeMatch"],
    queryFn: () =>
      getCompleteMatch({
        searchKeywords: "",
        limit: 6,
        page: 1,
      }),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="container px-4 xl:px-0 block m-auto mt-[100px] sm:mt-[150px] ">
      <HeadingH3 text={"Finished Match"} classes={"mb-5"} />

      <div className="flex flex-col gap-4 md:flex-row flex-wrap justify-center">
        {match?.splice(0, 6).map((match, index) => (
          <FinishedMatchCard match={match} key={match?._id} />
        ))}
      </div>
      <div className="flex justify-center mt-16 ">
        <Link to={"/finished-match"}>
          <SecondaryButton text={"See More"} />
        </Link>
      </div>
    </div>
  );
};

export default FinishedMatch;
