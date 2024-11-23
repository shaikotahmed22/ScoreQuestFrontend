import { useState } from "react";
import RequestedUser from "./container/components/requestedUser/RequestedUser";
import RequestingUser from "./container/components/requestingUser/RequestingUser";
import BigButton from "../../../components/shared/button/BigButton";
const Match = () => {
  const [selectActive, setSelectActive] = useState(true);

  const handleSendRequest = () => {
    setSelectActive(true);
  };
  const handleGetRequest = () => {
    setSelectActive(false);
  };
  return (
    <div className="">
      <div className="px-1 flex flex-row gap-2 justify-between w-full ">
        <BigButton
          classes={`${selectActive && "border-primary-brightOrange"} border`}
          func={handleSendRequest}
          text={"Send Request"}
          parentClass={"w-1/2"}
        />
        <BigButton
          classes={`${!selectActive && "border-primary-brightOrange"} border`}
          func={handleGetRequest}
          text={"Get Request"}
          parentClass={"w-1/2"}
        />
      </div>

      {selectActive ? <RequestingUser /> : <RequestedUser />}
    </div>
  );
};

export default Match;
