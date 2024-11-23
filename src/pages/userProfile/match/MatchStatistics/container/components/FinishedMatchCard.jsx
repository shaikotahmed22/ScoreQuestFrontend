import React from "react";
import { Link } from "react-router-dom";

const FinishedMatchCard = ({ match, parentClass }) => {
  return (
    <div
      className={`${parentClass} p-6 rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-lg transition-all duration-150 w-[100%] md:w-[48%] lg:w-[31%] `}
    >
      <Link
        to={`/match-statistics/${match?._id}`}
        className="text-xl font-semibold text-primary-brightOrange text-center mb-2"
      >
        {match?.teams?.requestingTeam?.name} vs{" "}
        {match?.teams?.requestedTeam?.name}
      </Link>
      <div className="border-t border-secondary-slateGray py-4">
        <div className="flex justify-between mb-2">
          <span className="font-bold text-primary-darkNavy">
            {match?.teams?.requestingTeam?.name}
          </span>
          <span className="text-secondary-slateGray">
            {match?.score?.requestingTeam?.totalRuns} /{" "}
            {parseInt(match?.score?.requestingTeam?.totalOvers / 6) +
              "." +
              parseInt(match?.score?.requestingTeam?.totalOvers % 6)}
          </span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="font-bold text-primary-darkNavy">
            {match?.teams?.requestedTeam?.name}
          </span>
          <span className="text-secondary-slateGray">
            {match?.score?.requestedTeam?.totalRuns} /{" "}
            {parseInt(match?.score?.requestedTeam?.totalOvers / 6) +
              "." +
              parseInt(match?.score?.requestedTeam?.totalOvers % 6)}
          </span>
        </div>
        <div className="text-secondary-slateGray">
          <span className="font-semibold">
            {parseInt(match?.score?.requestedTeam?.totalRuns) <
            parseInt(match?.score?.requestingTeam?.totalRuns)
              ? match?.teams?.requestingTeam?.name + " wine the match"
              : match?.teams?.requestedTeam?.name + " wine the match"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FinishedMatchCard;
