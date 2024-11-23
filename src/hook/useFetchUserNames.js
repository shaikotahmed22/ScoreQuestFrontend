import { getPlayer } from "../service/player";

export const useFetchUserNames = async (
  playersStats,

  isRequesting = true
) => {
  const playerIds = new Set();
  isRequesting
    ? playersStats?.forEach((player) => {
        playerIds.add(player.playerId);
      })
    : playersStats?.forEach((player) => {
        playerIds.add(player.playerId);
      });

  const namePromises = Array.from(playerIds).map((playerId) =>
    getPlayer({ playerId }).then((data) => ({
      playerId,
      name: data.firstName,
    }))
  );

  const names = await Promise.all(namePromises);

  const nameMap = {};
  names.forEach(({ playerId, name }) => {
    nameMap[playerId] = name;
  });

  return nameMap;
};
