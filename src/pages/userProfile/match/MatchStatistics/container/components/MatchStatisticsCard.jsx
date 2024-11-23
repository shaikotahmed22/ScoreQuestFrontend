import React from "react";

const MatchStatisticsCard = ({
  match,
  teamKeyBatting,
  teamKeyBowling,
  battingPlayerNameKey,
  bowlingPlayerKey,
}) => {
  return (
    <div>
      {/* Batters Table */}
      <div className="mb-8">
        <h2 className="text-xl mt-2 font-semibold text-primary-brightOrange mb-2">
          Batters
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-left text-primary-darkNavy">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Out</th>

                <th className="p-2 border">Runs</th>
                <th className="p-2 border">Balls</th>
                <th className="p-2 border">4s</th>
                <th className="p-2 border">6s</th>
                <th className="p-2 border">SR</th>
              </tr>
            </thead>
            <tbody>
              {match?.score[teamKeyBatting]?.playerStats?.map((item) => {
                return (
                  item?.playBalls > 0 && (
                    <tr
                      key={item?.playerId}
                      className="hover:bg-secondary-slateGray hover:text-natural-white"
                    >
                      <td className="p-2 border font-semibold ">
                        {battingPlayerNameKey?.[item.playerId]}
                      </td>
                      <td className="p-2 border">
                        {item.out.out ? "out" : "Not Out"}
                      </td>

                      <td className="p-2 border">{item.runs}</td>
                      <td className="p-2 border">{item.playBalls}</td>
                      <td className="p-2 border">{item.total4s || 0}</td>
                      <td className="p-2 border">{item.total6s || 0}</td>
                      <td className="p-2 border">
                        {parseInt((item.runs / item.playBalls) * 100) || 0}
                      </td>
                    </tr>
                  )
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bowlers Table */}
      <div>
        <h2 className="text-xl font-semibold text-primary-brightOrange mb-2">
          Bowlers
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-primary-darkNavy text-left">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Overs</th>
                <th className="p-2 border">Runs</th>
                <th className="p-2 border">WD</th>
                <th className="p-2 border">NB</th>
                <th className="p-2 border">Wickets</th>
              </tr>
            </thead>
            <tbody>
              {match?.score[teamKeyBowling]?.playerStats?.map(
                (item) =>
                  item?.overs.ball > 0 && (
                    <tr
                      key={item.playerId}
                      className="hover:bg-secondary-slateGray hover:text-natural-white "
                    >
                      <td className="p-2 border font-semibold ">
                        {bowlingPlayerKey?.[item.playerId]}
                      </td>
                      <td className="p-2 border">
                        {parseInt(item?.overs.ball / 6) +
                          "." +
                          parseInt(item?.overs.ball % 6)}
                      </td>
                      <td className="p-2 border">{item.overs.givenRun}</td>
                      <td className="p-2 border">
                        {item.overs.extra.wideBall}
                      </td>
                      <td className="p-2 border">{item.overs.extra.noBall}</td>
                      <td className="p-2 border">
                        {item.wicketTaken.totalWickets}
                      </td>
                    </tr>
                  )
              )}
              {/* More rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MatchStatisticsCard;
