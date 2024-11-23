import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import images from "../../../../../constants/images";
import { useState } from "react";
import { useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlayer, updatePlayer } from "../../../../../service/player";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddAndUpdatePlayer from "../../components/AddAndUpdatePlayer";
import { useEffect } from "react";
import stables from "../../../../../constants/stable";
import { useMemo } from "react";
const UpdatePlayer = () => {
  const [playerData, setPlayerData] = useState();
  const { playerId } = useParams();
  const [AvatarUrl, setAvatarUrl] = useState(images.Profile);
  const [uploadProfile, setUploadProfile] = useState();
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const profileUseRef = useRef(null);

  const { data, error, isLoading } = useQuery({
    queryFn: async () =>
      await getPlayer({
        playerId,
        token: userState.userInfo.token,
      }),
    queryKey: ["player"],
  });

  useEffect(() => {
    setPlayerData(data);
  }, [data]);

  useEffect(() => {
    if (playerData)
      setAvatarUrl(
        playerData?.avatar
          ? stables.UPLOAD_FOLDER_BASE_URL + playerData.avatar
          : images.Profile
      );
  }, [playerData, data]);

  const { mutate } = useMutation({
    mutationFn: ({ formData, token }) => {
      return updatePlayer({
        formData,
        token,
      });
    },

    onSuccess: (data) => {
      reset();
      queryClient.invalidateQueries(["player"]);
      toast.success("Player update successfully");
    },
    onError: (error) => {
      console.log("mutation error", error);
      toast.error(error);
    },
  });

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      birthday: "",
      role: "",
    },
    values: useMemo(() => {
      return {
        firstName: isLoading ? "" : playerData?.firstName,
        lastName: isLoading ? "" : playerData?.lastName,
        birthday: isLoading ? "" : playerData?.birthday,
        role: isLoading ? "" : playerData?.role,
      };
    }),
  });

  const handleClick = (event) => {
    event.preventDefault();
    profileUseRef.current.click();
  };

  const handleChange = () => {
    const uploadImage = profileUseRef.current.files[0];

    setUploadProfile(uploadImage);
    const cachedImageUrl = URL.createObjectURL(uploadImage);
    setAvatarUrl(cachedImageUrl);
  };

  const submitHandle = (data) => {
    const { firstName, lastName, birthday, role } = data;
    const formData = new FormData();
    formData.append("profilePicture", uploadProfile);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("birthday", birthday);
    formData.append("role", role);
    formData.append("playerId", playerId);

    mutate({
      formData,
      token: userState.userInfo.token,
    });
  };

  return (
    <div className="px-1">
      <AddAndUpdatePlayer
        AvatarUrl={AvatarUrl}
        buttonTitle={`Update`}
        errors={errors}
        handleChange={handleChange}
        handleClick={handleClick}
        handleSubmit={handleSubmit}
        profileUseRef={profileUseRef}
        register={register}
        submitHandle={submitHandle}
        title={playerData?.firstName + "'s Details"}
      />
    </div>
  );
};

export default UpdatePlayer;
