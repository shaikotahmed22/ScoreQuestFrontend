import React from "react";
import HeadingH3 from "../../../components/shared/HeadingH3";
import SecondaryButton from "../../../components/shared/button/SecondaryButton";
import MatchCard from "../../userProfile/match/MatchStatistics/container/components/MatchCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTodayMatch } from "../../../service/match";
import { Link } from "react-router-dom";

// const matches = [
//   {
//     teams: {
//       requestingTeam: { userId: 1234, name: "asif" },
//       requestedTeam: { userId: 12345, name: "ahmed" },
//     },
//     date: new Date("2024-11-16T14:57:00.000+00:00"),
//   },
//   {
//     teams: {
//       requestingTeam: { userId: 1234, name: "asif" },
//       requestedTeam: { userId: 12345, name: "ahmed" },
//     },
//     date: new Date("2024-11-16T14:57:00.000+00:00"),
//   },
//   {
//     teams: {
//       requestingTeam: { userId: 1234, name: "asif" },
//       requestedTeam: { userId: 12345, name: "ahmed" },
//     },
//     date: new Date("2024-11-16T14:57:00.000+00:00"),
//   },
//   {
//     teams: {
//       requestingTeam: { userId: 1234, name: "asif" },
//       requestedTeam: { userId: 12345, name: "ahmed" },
//     },
//     date: new Date("2024-11-16T14:57:00.000+00:00"),
//   },
//   {
//     teams: {
//       requestingTeam: { userId: 1234, name: "asif" },
//       requestedTeam: { userId: 12345, name: "ahmed" },
//     },
//     date: new Date("2024-11-16T14:57:00.000+00:00"),
//   },
//   {
//     teams: {
//       requestingTeam: { userId: 1234, name: "asif" },
//       requestedTeam: { userId: 12345, name: "ahmed" },
//     },
//     date: new Date("2024-11-16T14:57:00.000+00:00"),
//   },
// ];
const TodayMatch = () => {
  const { data: matches } = useQuery({
    queryKey: ["todayMatch"],
    queryFn: () => getTodayMatch({ limit: 5, page: 1, searchKeywords: "" }),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="container px-4 xl:px-0 block m-auto mt-[100px] sm:mt-[150px] ">
      <HeadingH3 text={"Today's Match"} classes={"mb-5"} />

      <div className="flex flex-wrap gap-5 md:flex-row justify-center">
        {matches?.splice(0, 6).map((match, index) => (
          <MatchCard
            match={match}
            key={index}
            parentClass={"w-[100%] md:w-[48%] lg:w-[31%] "}
          />
        ))}
      </div>
      <div className="flex justify-center mt-16 ">
        <Link to={"/today-match"}>
          <SecondaryButton text={"See More"} />
        </Link>
      </div>
    </div>
  );
};

export default TodayMatch;
