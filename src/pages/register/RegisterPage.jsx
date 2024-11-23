import { useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import InputLabel from "../../components/shared/inputandLabel/InputLabel";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducer";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signup } from "../../service/user.js";
import SecondaryButton from "../../components/shared/button/SecondaryButton.jsx";
const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  console.log(userState, "userState");

  const { mutate } = useMutation({
    mutationFn: ({ name, email, phone, password }) => {
      return signup({ name, email, phone, password });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("userAccount", JSON.stringify(data));
      toast.success("Account created Successfully");
      console.log(data, "data");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    mutationKey: ["userInfo"],
  });

  useEffect(() => {
    if (userState.userInfo) navigate("/");
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onchange",
  });

  const handleSubmitData = (data) => {
    const { name, email, phone, password } = data;
    mutate({ name, email, phone, password });

    reset();
  };
  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center mt-10 px-4 sm:px-0">
        <div className="bg-white p-8 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6 text-primary-darkNavy">
            Register Your Club
          </h2>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(handleSubmitData)}
          >
            <InputLabel
              register={register}
              errors={errors}
              name="name"
              label={"Club / Area Name"}
              placeholder={"Enter Name"}
              value={2}
            />
            <InputLabel
              register={register}
              errors={errors}
              name={"email"}
              label={"Email Address"}
              placeholder={"Enter Email"}
              // type="email"
            />
            <InputLabel
              register={register}
              type="tel"
              errors={errors}
              name={"phone"}
              label={"Phone No."}
              placeholder={"Enter Phone"}
              value={11}
            />
            <InputLabel
              register={register}
              errors={errors}
              name={"password"}
              label={"Password"}
              placeholder={"Enter Password"}
              type="password"
              value={6}
              watch={watch}
            />
            <InputLabel
              register={register}
              errors={errors}
              name={"confirmPassword"}
              label={"Confirm Password"}
              placeholder={"Enter Password"}
              type="password"
              value={6}
              watch={watch}
            />

            <SecondaryButton
              classes={
                "w-full !bg-primary-darkNavy hover:!bg-blue-700 transition duration-300"
              }
              text={"Register"}
              type="submit"
            />
          </form>
          <p className="mt-4 text-sm text-secondary-slateGray  text-center">
            Already Have An Account?{" "}
            <Link className="hover:underline" to={"/login"}>
              Login now
            </Link>{" "}
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default RegisterPage;
