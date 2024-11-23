import SecondaryButton from "../../../../components/shared/button/SecondaryButton";
import InputLabel from "../../../../components/shared/inputandLabel/InputLabel";

const AddAndUpdatePlayer = ({
  handleSubmit,
  submitHandle,
  register,
  errors,
  handleClick,
  AvatarUrl,
  profileUseRef,
  handleChange,
  buttonTitle,
  title,
}) => {
  return (
    <div className="max-w-lg mx-auto px-2 py-6 md:p-6 bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
      <h2 className="text-xl md:text-2xl font-semibold text-primary-darkNavy mb-4 text-center">
        {title}
      </h2>

      <form onSubmit={handleSubmit(submitHandle)} className="space-y-6">
        <div className="flex flex-row gap-2 justify-between">
          <InputLabel
            label="First Name"
            name="firstName"
            placeholder="Enter First Name"
            type="text"
            register={register}
            errors={errors}
            className="w-full"
          />
          <InputLabel
            label="Last Name"
            name="lastName"
            placeholder="Enter Last Name"
            type="text"
            register={register}
            errors={errors}
            className="w-full"
          />
        </div>
        <InputLabel
          label="Birthday"
          name="birthday"
          placeholder="30/01/2001"
          type="date"
          register={register}
          errors={errors}
          className="w-full"
        />

        <div className="flex space-x-4 mt-4">
          <span className="flex items-center space-x-2">
            <input
              {...register("role")}
              name="role"
              type="radio"
              id="batsman"
              value="Batsman"
              className="text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="batsman" className="text-gray-700">
              Batsman
            </label>
          </span>
          <span className="flex items-center justify-center space-x-2">
            <input
              {...register("role")}
              name="role"
              type="radio"
              id="bowler"
              value="Bowler"
              className="text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="bowler" className="text-gray-700">
              Bowler
            </label>
          </span>
          <span className="flex items-center space-x-2">
            <input
              {...register("role")}
              name="role"
              type="radio"
              id="allRounder"
              value="All-Rounder"
              className="text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="allRounder" className="text-gray-700">
              All-Rounder
            </label>
          </span>
        </div>

        <div className="flex items-center space-x-4 mt-4">
          <button
            type="button"
            onClick={handleClick}
            className="focus:outline-none block m-auto"
          >
            <img
              width={50}
              height={50}
              src={AvatarUrl}
              alt="profile"
              className="rounded-full border border-gray-300"
            />
          </button>
          <input
            type="file"
            id="avatar"
            ref={profileUseRef}
            onChange={handleChange}
            accept="image/*"
            hidden
          />
        </div>

        <SecondaryButton text={buttonTitle} type="submit" classes={"w-full"} />
      </form>
    </div>
  );
};

export default AddAndUpdatePlayer;
