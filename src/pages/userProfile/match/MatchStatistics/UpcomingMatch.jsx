import React, { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTodayMatch, getUpcomingMatch } from "../../../../service/match";
import Loading from "../../../../components/shared/Loading/Loading";
import Header from "../../../../components/Header";
import HeadingH3 from "../../../../components/shared/HeadingH3";
import Search from "../../../../components/Search";
import MatchCard from "./container/components/MatchCard";

const UpcomingMatch = () => {
  const [searchKeywords, setSearchKeywords] = useState("");
  const [match, setMatch] = useState([]);
  const [pageChange, setPageChange] = useState(1);

  const limit = 10;

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["todayMatch", searchKeywords, pageChange],
    queryFn: () =>
      getUpcomingMatch({
        searchKeywords: searchKeywords,
        limit,
        page: pageChange,
      }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!data) {
      refetch();
    }
  }, [pageChange, data]);

  const handelInfinityScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPageChange((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      if (searchKeywords === "") {
        setMatch((prev) => {
          const combined = [...prev, ...data];
          return combined.filter(
            (item, index) =>
              index === combined.findIndex((t) => t._id === item._id)
          );
        });
      } else {
        setMatch(data);
        setPageChange(1);
      }
    }
  }, [data, searchKeywords]);

  useEffect(() => {
    window.addEventListener("scroll", handelInfinityScroll);
    return () => window.removeEventListener("scroll", handelInfinityScroll);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {" "}
          <Header />
          <div className="container px-4 xl:px-0 block m-auto mt-10 ">
            <HeadingH3 text={"Upcoming Match"} classes={"mb-5"} />
            <div className="self-center mb-10 sm:w-[40%] m-auto ">
              <Search
                placeholder="Find Match By Club / Area name"
                setSearchKeywords={setSearchKeywords}
              />
            </div>

            <div className="flex flex-wrap gap-5 md:flex-row justify-center">
              {match?.map((match, index) => (
                <MatchCard
                  match={match}
                  key={index}
                  parentClass={"w-[100%] md:w-[48%] lg:w-[31%] "}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingMatch;
