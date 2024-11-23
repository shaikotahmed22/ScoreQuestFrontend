import React, { useEffect, useState } from "react";
import PrimaryButton from "../../../../../../../components/shared/button/PrimaryButton";
import { getDateDifference } from "../../../../../../../utils/getDateDifference";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StartMatchTImeCount = ({ match }) => {
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    const interval = setInterval(() => {
      if (minute / 60 < 24) {
        setSecond(getDateDifference(new Date(match.date), new Date()).seconds);
      }

      setMinute(getDateDifference(new Date(match.date), new Date()).minutes);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [match]);

  return (
    <div>
      {!match?.toss?.tossWinner && (
        <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-[90%] sm:w-[40%] p-5 rounded-md m-auto flex flex-col gap-3 mt-5">
          <h3 className="text-xl font-semibold text-primary-brightOrange text-center mb-2 cursor-pointer">
            {match?.teams?.requestingTeam?.name || "unknown"} <br /> VS <br />
            {match?.teams?.requestedTeam?.name || "unknown"}
          </h3>
          <div className="text-secondary-slateGray  flex flex-col items-center justify-center gap-3">
            <span className="">
              {minute / 60 > 24
                ? parseInt(minute / 60 / 24) +
                  "D  " +
                  (parseInt(minute / 60) % 24) +
                  "H"
                : minute / 60 < 24 &&
                  parseInt(minute / 60) +
                    "H " +
                    parseInt(minute % 60) +
                    "M " +
                    second +
                    " S"}
            </span>

            {new Date(match?.date).toLocaleDateString() <=
              new Date().toLocaleDateString() &&
              userState.userInfo.id === match?.teams?.requestingTeam?.userId &&
              match?.status === "accepted" && (
                <span
                  onClick={() => navigate(`/profile/match/toss/${match?._id}`)}
                >
                  <PrimaryButton text={"Start Match?"} />
                </span>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StartMatchTImeCount;
