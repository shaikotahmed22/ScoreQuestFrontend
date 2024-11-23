import React, { useState, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import InputLabel from "../../components/shared/inputandLabel/InputLabel";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { detectInputType } from "../../utils/detectInputType";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../service/user";
import { userActions } from "../../store/reducers/userReducer";
import SecondaryButton from "../../components/shared/button/SecondaryButton";
import Loading from "../../components/shared/Loading/Loading";
const LoginPage = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ valueType, value, password }) => {
      return login({ valueType, value, password });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("userAccount", JSON.stringify(data));
      toast.success("Account Login Successfully");
      console.log(data, "data");
    },
    onError: (error) => {
      toast.error(error.message);
    },

    mutationKey: ["userInfo"],
  });

  useEffect(() => {
    if (userState.userInfo) navigate("/");
    console.log("from useEffect");
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      value: "",
      password: "",
    },
    mode: "onchange",
  });

  const handleSubmitData = (data) => {
    const { value, password } = data;
    const valueType = detectInputType(value);
    if (valueType === "invalid") {
      toast.error("please enter valid email or password");
      return;
    }

    mutate({ valueType, value, password });
    // reset();
  };

  if (isPending) {
    return <Loading />;
  }

  return (
    <MainLayout>
      <div className="flex px-4 sm:px-0 flex-col justify-center items-center mt-10">
        <div className="bg-white p-8 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6 text-primary-darkNavy">
            Login Your Club
          </h2>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(handleSubmitData)}
          >
            <InputLabel
              register={register}
              errors={errors}
              name={"value"}
              label={"Email Or Phone"}
              placeholder={"Enter Email Or Phone"}
              textMsg="Enter valid Email Or password"
              // type="email"
            />

            <InputLabel
              register={register}
              errors={errors}
              name={"password"}
              label={"Password"}
              placeholder={"Enter Password"}
              type="password"
              value={6}
              textMsg={"Password at least 6 character"}
            />
            <p className="text-md text-secondary-slateGray [&>a]:hover:underline">
              <Link to={"/forgetPassword"}>Forget Password?</Link>
            </p>
            <SecondaryButton
              classes={
                "w-full !bg-primary-darkNavy hover:!bg-blue-700 transition duration-300"
              }
              text={"Login"}
              type="submit"
            />
          </form>
          <p className="mt-4 text-sm text-secondary-slateGray [&>a]:hover:underline text-center">
            Don't have an account?{" "}
            <Link className="signUp" to={"/signup"}>
              Register
            </Link>{" "}
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
