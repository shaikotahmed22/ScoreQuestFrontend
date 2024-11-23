import React from "react";
import stables from "../../../../../constants/stable";
import images from "../../../../../constants/images";

const PlayerRankCard = ({
  topPlayers,
  playerHeading,
  limit,
  isBatter = true,
}) => {
  console.log(limit, "limit");
  return (
    <div className="min-h-screen py-10 px-5 overflow-hidden">
      <div className="mx-auto overflow-x-auto">
        <table className="w-full table-auto border-separate border-spacing-y-4">
          <thead>
            <tr className="text-primary-darkNavy text-left">
              {playerHeading?.map((item) => (
                <th key={item} className="p-3">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topPlayers?.slice(0, limit).map((player, index) => (
              <tr
                key={player._id}
                className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md  md:table-row  mb-5 md:mb-0"
              >
                <td className="p-4 md:p-6">{index + 1}</td>
                <td className="flex flex-col md:flex-row justify-start gap-2 items-center p-4 md:p-6 font-semibold ">
                  <img
                    className="rounded-full w-12 h-12 md:w-14 md:h-14"
                    src={
                      player.avatar
                        ? stables.UPLOAD_FOLDER_BASE_URL + player.avatar
                        : images.Profile
                    }
                    alt="Player Avatar"
                  />
                  <h3 className="font-bold text-md md:text-xl text-primary-brightOrange">
                    {player.firstName} {player.lastName}
                  </h3>
                </td>
                <td className="p-4 md:p-6">
                  {player.statistics.totalMatchPlay}
                </td>

                {isBatter && (
                  <td className="p-4 md:p-6">{player.statistics.totalRun}</td>
                )}

                {isBatter && (
                  <td className="p-4 md:p-6">{player.statistics.playBalls}</td>
                )}

                {isBatter && (
                  <td className="p-4 md:p-6">{player.statistics.total4s}</td>
                )}

                {isBatter && (
                  <td className="p-4 md:p-6">{player.statistics.total6s}</td>
                )}

                {isBatter && (
                  <td className="p-4 md:p-6">
                    {parseFloat(
                      player.statistics.totalRun /
                        player.statistics.totalMatchPlay
                    ).toFixed(2)}
                  </td>
                )}

                {!isBatter && (
                  <td className="p-4 md:p-6">
                    {player.statistics.totalGivenRun}
                  </td>
                )}

                {!isBatter && (
                  <td className="p-4 md:p-6">
                    {parseInt(player.statistics.totalBowlsThrough / 6)}.
                    {parseInt(player.statistics.totalBowlsThrough % 6)}
                  </td>
                )}

                {!isBatter && (
                  <td className="p-4 md:p-6">
                    {player.statistics.totalWicket}
                  </td>
                )}

                {!isBatter && (
                  <td className="p-4 md:p-6">
                    {parseFloat(
                      player.statistics.totalGivenRun /
                        parseFloat(
                          player.statistics.totalBowlsThrough / 6
                        ).toFixed(2)
                    ).toFixed(2)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerRankCard;
