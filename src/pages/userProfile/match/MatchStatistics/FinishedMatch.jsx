import React, { useEffect, useState } from "react";
import HeadingH3 from "../../../../components/shared/HeadingH3";
import FinishedMatchCard from "./container/components/FinishedMatchCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCompleteMatch } from "../../../../service/match";
import Search from "../../../../components/Search";
import Header from "../../../../components/Header";
import Loading from "../../../../components/shared/Loading/Loading";

const FinishedMatch = () => {
  const [searchKeywords, setSearchKeywords] = useState("");
  const [match, setMatch] = useState([]);
  const [pageChange, setPageChange] = useState(1);

  const limit = 10;

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["completeMatch", searchKeywords, pageChange],
    queryFn: () =>
      getCompleteMatch({
        searchKeywords: searchKeywords,
        limit,
        page: pageChange,
      }),
    placeholderData: keepPreviousData,
  });

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
    if (!data) {
      refetch();
    }
  }, [pageChange, data]);

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
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container px-4 xl:px-0 block m-auto mt-10 ">
          <HeadingH3 text={"Finished Match"} classes={"mb-5"} />
          <div className="self-center mb-10 sm:w-[40%] m-auto ">
            <Search
              placeholder="Find Match By Club / Area name"
              setSearchKeywords={setSearchKeywords}
            />
          </div>

          <div className="flex flex-col gap-4 md:flex-row flex-wrap justify-center">
            {match?.map((match, index) => (
              <FinishedMatchCard match={match} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinishedMatch;
