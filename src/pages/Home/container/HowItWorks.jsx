import React from "react";
import {
  MdAppRegistration,
  MdEmergencyShare,
  MdOutlineScoreboard,
} from "react-icons/md";
import FeaturesCard from "./components/FeaturesCard";
import HeadingH3 from "../../../components/shared/HeadingH3";
const HowItWorks = () => {
  return (
    <div className="container px-4 xl:px-0 block m-auto mt-[100px] sm:mt-[150px] ">
      <HeadingH3 text={"How ScoreQuest Works"} />

      <div className="flex flex-col md:flex-row gap-5 justify-evenly mt-10">
        <div className="w-[100%] md:w-[48%] lg:w-[31%] ">
          <FeaturesCard
            icon={<MdAppRegistration />}
            text={
              "Sign up and create a team profile. Get your local cricket games into ScoreQuest."
            }
            title={"Register Your Team"}
          />
        </div>
        <div className="w-[100%] md:w-[48%] lg:w-[31%] ">
          <FeaturesCard
            icon={<MdOutlineScoreboard />}
            text={
              "Start the match and track every ball. Add player stats, runs, overs, and wickets in real-time."
            }
            title={"Start Scoring"}
          />
        </div>
        <div className="w-[100%] md:w-[48%] lg:w-[31%] ">
          <FeaturesCard
            icon={<MdEmergencyShare />}
            text={
              "Share live scores with your teammates, fans, or even on social media in real-time."
            }
            title={"Share & View Scores"}
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
