import React, { useEffect, useState } from "react";
import { Input, Radio } from "antd";

import { SEARCH_KEY } from "../constants";

const { Search } = Input;

const SearchBar = (props) => {
  const [searchType, setSearchType] = useState(SEARCH_KEY.all);
  const [error, setError] = useState("");

  const handleSearch = (value) => {
    if (searchType !== SEARCH_KEY.all && value === "") {
      setError("Please input your search keyword!");
      return;
    }
    setError("");
    props.handleSearch({ type: searchType, keyword: value });
  };

  const changeSearchType = (event) => {
    const searchType = event.target.value 
    setSearchType(searchType); //异步更新
    setError("");

    if (searchType === SEARCH_KEY.all) {
      props.handleSearch({ type: searchType, keyword: "" });
    }
  };

  return (
    <div className="search-bar">
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
        disabled={searchType === SEARCH_KEY.all}
      />
      <p className="error-msg">{error}</p>

      <Radio.Group
        onChange={changeSearchType}
        value={searchType}
        className="search-type-group"
      >
        <Radio value={SEARCH_KEY.all}>All</Radio>
        <Radio value={SEARCH_KEY.keyword}>Keyword</Radio>
        <Radio value={SEARCH_KEY.user}>User</Radio>
      </Radio.Group>
    </div>
  );
};

export default SearchBar;
