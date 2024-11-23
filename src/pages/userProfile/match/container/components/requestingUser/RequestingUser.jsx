import { useQuery, useMutation } from "@tanstack/react-query";
import {
  cancelMatchByRequestingUser,
  getMatchByRequestingTeamId,
} from "../../../../../../service/match";
import { useSelector } from "react-redux";
import MatchCard from "../MatchCard";
import Loading from "../../../../../../components/shared/Loading/Loading";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const RequestingUser = () => {
  const [autoCancel, setAutoCancel] = useState();

  const userState = useSelector((state) => state.user);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["match", userState.userInfo.id],
    queryFn: () =>
      getMatchByRequestingTeamId({
        token: userState.userInfo.token,
        RequestingTeamId: userState.userInfo.id,
      }),
  });

  const { mutate } = useMutation({
    mutationKey: ["match"],
    mutationFn: ({ matchId }) =>
      cancelMatchByRequestingUser({
        matchId: matchId,
        token: userState.userInfo.token,
      }),
    onSuccess: () => {
      toast.success("Match Deleted Successfully");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handelClickDeleteMatch = (data) => {
    if (window.confirm("Are you sure cancel this match?")) {
      mutate({ matchId: data });
      refetch();
    }
  };

  useEffect(() => {
    if (autoCancel) {
      mutate({ matchId: autoCancel });
      refetch();
    }
  }, [autoCancel]);

  return (
    <div className="mt-10 flex flex-row flex-wrap justify-evenly">
      {data?.length === 0 ? (
        <h3 className="text-primary-brightOrange text-xl ">
          There is no match found
        </h3>
      ) : !isLoading ? (
        data?.map((item) => (
          <MatchCard
            setAutoCancel={setAutoCancel}
            handelClickDeleteMatch={handelClickDeleteMatch}
            item={item}
            key={item._id}
          />
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default RequestingUser;
