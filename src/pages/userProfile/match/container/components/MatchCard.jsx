import React, { useEffect, useState } from "react";
import PrimaryButton from "../../../../../components/shared/button/PrimaryButton";
import SecondaryButton from "../../../../../components/shared/button/SecondaryButton";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDateDifference } from "../../../../../utils/getDateDifference";

const MatchCard = ({
  item,
  classes,
  setAutoCancel = null,
  handelClickDeleteMatch = null,
  handelClickAcceptMatch = null,
  AddMatchCard,
  setNote,
  note,
  setMatchValues,
  isAccept,
}) => {
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [isRejectNote, setIsRejectNote] = useState(false);
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    const interval = setInterval(() => {
      if (minute / 60 < 24) {
        setSecond(getDateDifference(new Date(item.date), new Date()).seconds);
      }

      setMinute(getDateDifference(new Date(item.date), new Date()).minutes);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (
      (new Date(item.date) === new Date() ||
        new Date() > new Date(item.date)) &&
      item.status === "pending"
    ) {
      if (typeof setAutoCancel === "function") {
        setAutoCancel(item._id);
      }
    }
  }, [item, setAutoCancel]);

  useEffect(() => {
    if (typeof setMatchValues === "function") {
      let date = new Date(item.date);

      // Calculate GMT+6 offset in milliseconds (6 hours * 60 minutes * 60 seconds * 1000 milliseconds)
      const offset = 6 * 60 * 60 * 1000;

      // Add the offset to the date
      date = new Date(date.getTime() + offset);
      setMatchValues({
        teams: {
          requestingTeam: {
            name: item.teams.requestingTeam.name,
            userId: item.teams.requestingTeam.userId,
          },
          requestedTeam: {
            name: item.teams.requestedTeam.name,
            userId: item.teams.requestedTeam.userId,
          },
        },
        squads: {
          requestedTeamSquad: {
            squadId: "",
          },
        },
        date: date.toISOString().slice(0, 16),
        venue: item.venue,
      });
    }
  }, [setMatchValues]);

  const handelRejectMatch = (data) => {
    handelClickDeleteMatch(data);
  };

  return (
    <div
      className={`${classes} w-full mx-1 mb-5 md:w-[48%] flex flex-col gap-3 p-6 rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-lg transition-all duration-150`}
      key={item?._id}
    >
      <Link to={`${item._id}`}>
        <h3 className="text-xl font-semibold text-primary-brightOrange text-center mb-2 cursor-pointer">
          {item.teams.requestingTeam.name || "unknown"} <br /> VS <br />
          {item.teams.requestedTeam.name || "unknown"}
        </h3>
      </Link>
      <span className="w-full block h-[1px] bg-primary-brightOrange "></span>

      <div className="text-secondary-slateGray flex flex-row gap-1">
        <span className="font-semibold">Status:</span>

        <span className="">{item.status}</span>
      </div>
      <div className="text-secondary-slateGray flex flex-row gap-1">
        <span className="font-semibold">Date:</span>
        <span className="">{new Date(item.date).toLocaleString()}</span>
      </div>

      <div className="text-secondary-slateGray flex flex-row gap-1">
        <span className="font-semibold">Venue:</span>

        <span className="">{item.venue}</span>
      </div>

      <div className="text-secondary-slateGray flex flex-row gap-1">
        <span className="font-semibold">Remaining:</span>

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
      </div>

      {item.status === "pending" &&
      item.teams.requestedTeam.userId === userState.userInfo.id ? (
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between">
            <span onClick={() => setIsRejectNote(!isRejectNote)}>
              <SecondaryButton text={"Reject"} />
            </span>

            <span onClick={() => handelClickAcceptMatch(item._id)}>
              <PrimaryButton text={"Accept"} />
            </span>
          </div>
          {isRejectNote && (
            <div className="w-full flex flex-row gap-5">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-accentColor-skyBlur border-secondary-slateGray"
                value={note}
                placeholder="Note"
                onChange={(e) => setNote(e.target.value)}
              />
              <span onClick={() => handelRejectMatch(item._id)}>
                <SecondaryButton text={"Ok"} />
              </span>
            </div>
          )}

          <div className="fixed top-[3%] w-[70%] left-[25%] ">
            {isAccept && AddMatchCard}
          </div>
        </div>
      ) : (
        (item.status === "pending" || item.status === "rejected") && (
          <div>
            <span onClick={() => handelClickDeleteMatch(item._id)}>
              <SecondaryButton text={"Cancel"} />
              {item.status === "rejected" && (
                <div>
                  <p className="text-primary-brightOrange font-bold">
                    {item.note && item.note}
                  </p>
                </div>
              )}
            </span>
          </div>
        )
      )}

      {item.status === "pending" &&
      item.teams.requestedTeam.userId === userState.userInfo.id ? (
        <span className="text-primary-brightOrange font-bold ">
          It will reject if you will not accept it within remaining time
        </span>
      ) : (
        item.status === "pending" && (
          <span className="text-primary-brightOrange font-bold ">
            It will reject if {item.teams.requestedTeam.name} will not accept it
            within remaining time
          </span>
        )
      )}
    </div>
  );
};

export default MatchCard;
