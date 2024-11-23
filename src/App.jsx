import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import { Toaster } from "react-hot-toast";
import UserProfile from "./pages/userProfile/UserProfile";
import ManagePlayer from "./pages/userProfile/player/manage/ManagePlayer";
import AddPlayer from "./pages/userProfile/player/addPlayer/AddPlayer";
import UpdatePlayer from "./pages/userProfile/player/manage/update/UpdatePlayer";

import GetAllUser from "./pages/userProfile/User/getAllUser";
import Match from "./pages/userProfile/match/Match";
import Squad from "./pages/userProfile/squad/Squad";
import Profile from "./pages/userProfile/Dashboard/Profile";
import UpdateMatch from "./pages/userProfile/match/Update Match/UpdateMatch";
import TosWinnerOverWickets from "./pages/userProfile/match/Update Match/container/components/TosWinner/TosWinnerOverWickets";
import SelectInningsType from "./pages/userProfile/match/Update Match/container/components/SelectInningsType/SelectInningsType";
import UpdateMatchBallByBall from "./pages/userProfile/match/Update Match/container/updateMatch/UpdateMatchBallByBall";
import TodayMatch from "./pages/userProfile/match/MatchStatistics/TodayMatch";
import FinishedMatch from "./pages/userProfile/match/MatchStatistics/FinishedMatch";
import UpcomingMatch from "./pages/userProfile/match/MatchStatistics/UpcomingMatch";
import MatchStatistics from "./pages/userProfile/match/MatchStatistics/container/MatchStatistics";
import PlayerRank from "./pages/userProfile/player/playerStatistics/PlayerRank";

const App = () => {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/today-match" element={<TodayMatch />} />
        <Route path="/finished-match" element={<FinishedMatch />} />
        <Route path="/upcoming-match" element={<UpcomingMatch />} />
        <Route path="/player-rank" element={<PlayerRank />} />
        <Route
          path="/match-statistics/:matchId"
          element={<MatchStatistics />}
        />
        <Route path="/profile" element={<UserProfile />}>
          <Route index element={<Profile />} />
          <Route path="squad" element={<Squad />} />
          <Route path="allUsers" element={<GetAllUser />} />
          <Route path="match" element={<Match />} />
          <Route path="addPlayer" element={<AddPlayer />} />
          <Route path="managePlayer" element={<ManagePlayer />} />
          <Route path="update/:playerId" element={<UpdatePlayer />} />
          <Route path="match/:matchId" element={<UpdateMatch />} />
          <Route
            path="match/toss/:matchId"
            element={<TosWinnerOverWickets />}
          />
          <Route
            path="match/innings/:matchId"
            element={<SelectInningsType />}
          />

          <Route
            path="match/update-match/:matchId"
            element={<UpdateMatchBallByBall />}
          />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
