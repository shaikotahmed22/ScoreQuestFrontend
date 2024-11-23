import { useMemo, useState, useRef, useEffect } from "react";
import InputLabel from "../../../../../components/shared/inputandLabel/InputLabel";
import SecondaryButton from "../../../../../components/shared/button/SecondaryButton";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { getUser, updateUserProfile } from "../../../../../service/user";
import Loading from "../../../../../components/shared/Loading/Loading";
import images from "../../../../../constants/images";
import stables from "../../../../../constants/stable";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const [cngPsw, setCngPsw] = useState(false);
  const [defaultImage, setDefaultImage] = useState(images.Profile);
  const [uploadAvatar, setUploadAvatar] = useState();
  const userInfo = useSelector((state) => state.user.userInfo);
  const inputRef = useRef();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryFn: () => getUser({ userId: userInfo.id, token: userInfo.token }),
    queryKey: ["User"],
  });

  if (error) {
    toast.error(error?.message);
  }

  const { mutate } = useMutation({
    mutationFn: ({ formData, token }) => {
      return updateUserProfile({
        formData: formData,
        token: token,
      });
    },
    mutationKey: ["User"],
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries(["User"]);
      toast.success("User update successfully");
    },
    onError: (error) => {
      console.log(error);
      toast(error);
    },
  });

  useEffect(() => {
    if (data) {
      setDefaultImage(
        data?.avatar
          ? stables.UPLOAD_FOLDER_BASE_URL + data?.avatar
          : images.Profile
      );
    }
  }, [data]);

  const {
    unregister,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      currentPassword: "",
      newPassword: "",
    },
    values: useMemo(() => {
      return {
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        currentPassword: "",
        newPassword: "",
      };
    }, [data]),
  });

  const handleBtnClick = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };

  const submitHandler = (data) => {
    const formData = new FormData();
    formData.append("userId", userInfo.id);
    formData.append("userAvatar", uploadAvatar);
    formData.append("name", data?.name);
    formData.append("phone", data?.phone);
    formData.append("currentPassword", data?.currentPassword);
    formData.append("newPassword", data?.newPassword);

    mutate({ formData: formData, token: userInfo.token });
  };

  const uploadImageDisplay = async () => {
    const fileUploadImage = inputRef.current.files[0];
    setUploadAvatar(fileUploadImage);
    const cacheImageURL = URL.createObjectURL(fileUploadImage);
    setDefaultImage(cacheImageURL);
  };

  return (
    <div className="flex flex-col justify-center items-center   px-4 sm:px-0">
      <div className="bg-white p-8 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] max-w-md w-full relative">
        {isLoading && <Loading />}
        <h2 className="text-2xl font-bold text-center mb-6 text-primary-darkNavy">
          Update Club
        </h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="flex flex-col gap-5">
            <InputLabel
              errors={errors}
              register={register}
              name="name"
              label={"Club / Area Name"}
              placeholder={"Enter Name"}
              value={data?.name}
            />
            <InputLabel
              errors={errors}
              register={register}
              type="email"
              name={"email"}
              label={"Email Address"}
              placeholder={"Enter Email"}
            />
            <InputLabel
              errors={errors}
              register={register}
              type="tel"
              name={"phone"}
              label={"Phone No."}
              placeholder={"Enter Phone"}
              value={11}
            />
            {!cngPsw ? (
              <span
                className="text-md text-secondary-slateGray inline hover:underline cursor-pointer"
                onClick={() => setCngPsw(!cngPsw)}
              >
                Change Password
              </span>
            ) : (
              <div className="flex flex-col gap-5">
                <InputLabel
                  errors={errors}
                  register={register}
                  unregister={unregister}
                  valueFalse={true}
                  name={"currentPassword"}
                  label={"Current Password"}
                  placeholder={"Enter Current Password"}
                  type="password"
                />
                <InputLabel
                  errors={errors}
                  register={register}
                  unregister={unregister}
                  valueFalse={true}
                  name={"newPassword"}
                  label={"New Password"}
                  placeholder={"New Password"}
                  type="password"
                />
              </div>
            )}

            <div>
              <span className="block text-gray-700 text-sm font-bold mb-2 text-center">
                Upload Profile Photo
              </span>
              <button
                onClick={handleBtnClick}
                type="submit"
                className="block m-auto"
              >
                <img
                  className="rounded-full  h-[70px] w-[70px]"
                  src={defaultImage}
                  alt=""
                />
              </button>
              <input
                type="file"
                id="file"
                ref={inputRef}
                onChange={uploadImageDisplay}
                hidden
              />
            </div>
          </div>
          <SecondaryButton
            text={"Submit"}
            type="submit"
            classes={"w-full mt-5 hover:shadow-sm"}
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
