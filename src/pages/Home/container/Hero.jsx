import React from "react";
import images from "../../../constants/images";
import PrimaryButton from "../../../components/shared/button/PrimaryButton";
import SecondaryButton from "../../../components/shared/button/SecondaryButton";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="container px-5 xl:px-0 block m-auto overflow-x-hidden text-center">
      <div className="flex flex-row justify-between mt-10 md:mt-24 mb-[200px]">
        <div className="translate-x-[0px] lg:translate-x-[-45px]  translate-y-[130px] hidden md:block">
          <img width={300} loading="lazy" src={images.hero} alt="" />
        </div>
        <div>
          <h1 className="text-primary-brightOrange text-left text-3xl md:text-5xl md:text-center leading-tight font-bold">
            Track Every Ball in Real-Time with ScoreQuest.
          </h1>
          <p className="text-secondary-slateGray text-[16px] text-left md:text-center leading-6 pt-7">
            Leave behind the pen and paper. Experience the ease of real-time
            live scoring, detailed player stats, and instant match updates – all
            from your mobile or desktop.
          </p>
        </div>
        <div className="lg:translate-x-[45px] translate-y-[130px] hidden md:block">
          <img width={300} loading="lazy" src={images.hero} alt="" />
        </div>
      </div>
      <div className="md:justify-center translate-y-[-185px] flex flex-col md:flex-row items-start md:items-center gap-4 ">
        <Link to={"/signup"}>
          <PrimaryButton text={"Get Started"} />
        </Link>
        <Link to={"/today-match"}>
          <SecondaryButton text={"Explore Live Match"} />
        </Link>
      </div>
    </div>
  );
};

export default Hero;
