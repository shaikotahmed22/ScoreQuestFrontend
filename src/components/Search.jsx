import React from "react";
import { useState } from "react";
import PrimaryButton from "./shared/button/PrimaryButton";

const Search = ({ placeholder = "", setSearchKeywords }) => {
  const [search, setSearch] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    setSearchKeywords(search);
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setSearch(value);
  };

  return (
    <div className="searchArea">
      <form onSubmit={handleClick} className="flex gap-4">
        <input
          name="search"
          value={search}
          onChange={handleChange}
          type="text"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-accentColor-skyBlur border-secondary-slateGray"
          placeholder={placeholder}
        />
        <div className="btn">
          <PrimaryButton type="submit" text={"Search"} />
        </div>
      </form>
    </div>
  );
};

export default Search;
