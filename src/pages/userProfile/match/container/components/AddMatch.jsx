import { useCallback, useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getSquad } from "../../../../../service/squad";
import { toast } from "react-hot-toast";
import { addMatch } from "../../../../../service/match";
import Loading from "../../../../../components/shared/Loading/Loading";
import SecondaryButton from "../../../../../components/shared/button/SecondaryButton";
import { IoMdClose } from "react-icons/io";
import SquadCard from "./squadCard/SquadCard";
import AddMatchCard from "./AddMatchCard/AddMatchCard";

const InitValue = {
  teams: {
    requestingTeam: {
      name: "",
      userId: "",
    },
    requestedTeam: {
      name: "",
      userId: "",
    },
  },
  squads: {
    requestingTeamSquad: {
      squadId: "",
    },
  },
  date: "",
  venue: "",
};

const AddMatch = ({ requestedTeam, setPlayMatchBtn }) => {
  const userState = useSelector((state) => state.user);
  const [squadData, setSquadData] = useState();
  const [matchValues, setMatchValues] = useState({ ...InitValue });
  const [isDisabled, setIsDisabled] = useState(true);

  console.log(matchValues);
  useEffect(() => {
    setMatchValues({
      ...matchValues,
      teams: {
        requestingTeam: {
          userId: userState.userInfo.id,
          name: userState.userInfo.name,
        },
        requestedTeam: {
          userId: requestedTeam.requestedTeam,
          name: requestedTeam.requestedTeamName,
        },
      },
    });
  }, [requestedTeam, userState.userInfo]);

  const handleClickSingleSquad = ({ requestingTeamSquad }) => {
    setMatchValues({
      ...matchValues,
      squads: { requestingTeamSquad: { squadId: requestingTeamSquad } },
    });
  };

  const {
    data: squad,
    refetch: squadRefetch,
    isLoading: squadIsLoading,
  } = useQuery({
    queryFn: useCallback(() => {
      return getSquad({
        userId: userState.userInfo.id,
        token: userState.userInfo.token,
      });
    }, [userState]),
    queryKey: ["squad"],
  });

  useEffect(() => {
    if (squad) {
      setSquadData(squad);
    } else {
      squadRefetch();
    }
  }, [squad, squadRefetch]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setMatchValues({
      ...matchValues,
      [name]: value,
    });
  };

  useEffect(() => {
    if (
      matchValues.date === InitValue.date ||
      matchValues.squads === InitValue.squads ||
      matchValues.venue === InitValue.venue
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [matchValues]);

  const { mutate } = useMutation({
    mutationFn: ({ matchValues }) => {
      return addMatch({ matchValues, token: userState.userInfo.token });
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Match Add Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    mutationKey: ["Match"],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ matchValues });
    setMatchValues({ ...InitValue });
    setPlayMatchBtn(false);
  };
  // lg:top-[2%] fixed z-50 top-[60%] left-[50%] w-full -translate-x-1/2  -translate-y-1/2 lg:-translate-y-0 backdrop-blur-sm
  return (
    <div className=" absolute top-0 left-0 w-full py-10 z-50 backdrop-blur-sm ">
      <AddMatchCard
        handleChange={handleChange}
        handleClickSingleSquad={handleClickSingleSquad}
        handleSubmit={handleSubmit}
        isDisabled={isDisabled}
        matchValues={matchValues}
        setPlayMatchBtn={setPlayMatchBtn}
        squadData={squadData}
        squadIsLoading={squadIsLoading}
        title={"Add New Match"}
        title2={"Select Date and Time"}
        teamSquad={"requestingTeamSquad"}
        buttonText={"Add Match"}
      />
    </div>
  );
};

export default AddMatch;
