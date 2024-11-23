import React from "react";
import MainLayout from "../../components/MainLayout";
import Hero from "./container/Hero";
import KeyFeatures from "./container/KeyFeatures";
import HowItWorks from "./container/HowItWorks";
import TodayMatch from "./container/TodayMatch";
import FinishedMatch from "./container/FinishedMatch";
import CTA from "./container/CTA";

const HomePage = () => {
  return (
    <MainLayout>
      <Hero />
      <KeyFeatures />
      <HowItWorks />
      <TodayMatch />
      <FinishedMatch />
      <CTA />
    </MainLayout>
  );
};

export default HomePage;
