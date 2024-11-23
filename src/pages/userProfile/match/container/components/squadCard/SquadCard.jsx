import React from "react";

const SquadCard = ({
  squadData,
  handleClickSingleSquad,
  matchValues,
  TeamSquad,
}) => {
  console.log(matchValues, "from Squad Card");

  return squadData?.map((item, index) => (
    <div
      onClick={() => handleClickSingleSquad({ [TeamSquad]: item._id })}
      key={item._id}
      className={`border shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-2 lg:mb-5 p-2 lg:p-5 rounded-md cursor-pointer capitalize ${
        matchValues?.squads[TeamSquad]?.squadId === item._id &&
        "border-primary-brightOrange"
      } `}
    >
      <h4>squad {index + 1}</h4>
      <h6>total player {item.selectedPlayer.length} </h6>
    </div>
  ));
};

export default SquadCard;
