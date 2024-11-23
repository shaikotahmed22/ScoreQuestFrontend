import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import images from "../../../../constants/images";
import { useState } from "react";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { addPlayer } from "../../../../service/player";
import { useSelector } from "react-redux";
import AddAndUpdatePlayer from "../components/AddAndUpdatePlayer";
const AddPlayer = () => {
  const [AvatarUrl, setAvatarUrl] = useState(images.Profile);
  const [uploadProfile, setUploadProfile] = useState();

  const userState = useSelector((state) => state.user);

  const profileUseRef = useRef(null);

  const { mutate } = useMutation({
    mutationFn: ({ formData, token }) => {
      return addPlayer({
        formData,
        token,
      });
    },

    onSuccess: (data) => {
      console.log("mutation Data: ", data);
      reset();
      setAvatarUrl(images.Profile);
      toast.success("Player added successfully");
    },
    onError: (error) => {
      console.log("mutation error", error);
      toast.error(error);
    },
    mutationKey: ["player"],
  });

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    firstName: "",
    lastName: "",
    birthday: "",
    role: "",
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

    console.log(firstName, lastName, birthday, role);
    const formData = new FormData();
    formData.append("profilePicture", uploadProfile);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("birthday", birthday);
    formData.append("role", role);
    formData.append("userId", userState.userInfo.id);

    mutate({
      formData,
      token: userState.userInfo.token,
    });
  };

  return (
    <div>
      <AddAndUpdatePlayer
        AvatarUrl={AvatarUrl}
        buttonTitle={"Add Plyer"}
        errors={errors}
        handleChange={handleChange}
        handleClick={handleClick}
        handleSubmit={handleSubmit}
        profileUseRef={profileUseRef}
        register={register}
        submitHandle={submitHandle}
        title={"Add Player"}
      />
    </div>
  );
};

export default AddPlayer;
