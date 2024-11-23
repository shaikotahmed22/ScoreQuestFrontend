import { useMutation, useQuery } from "@tanstack/react-query";
import { deletePlayer, getPlayers } from "../../../../service/player";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import PlayerTable from "../components/PlayerTable";
import Loading from "../../../../components/shared/Loading/Loading";

const ManagePlayer = () => {
  const userState = useSelector((state) => state.user);

  const deletePlayerById = (playerId) => {
    console.log(playerId, "deletePlayerId");

    if (window.confirm("are you sure to delete this player?")) {
      mutate({ playerId, userId: userState.userInfo.id });
    }
  };

  const {
    data: players,
    refetch,
    isLoading,
  } = useQuery({
    queryFn: () => {
      return getPlayers({
        userId: userState.userInfo.id,
        token: userState.userInfo.token,
      });
    },
    queryKey: ["player"],
  });

  const { mutate } = useMutation({
    mutationFn: ({ playerId, userId }) => {
      deletePlayer({
        token: userState.userInfo.token,
        playerId,
        userId,
      });
    },
    onSuccess: () => {
      refetch();
      toast.success("Player Delete Successfully");
    },
    onError: (error) => {
      console.log(error);

      toast.error(error.message);
    },
    mutationKey: ["player"],
  });

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <PlayerTable
          players={players}
          deletePlayerById={deletePlayerById}
          title={"Manage Player"}
        />
      )}
    </div>
  );
};

export default ManagePlayer;
