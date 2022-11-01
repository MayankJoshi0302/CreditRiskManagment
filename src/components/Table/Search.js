import React from "react";
import { useState } from "react";

function Search(props) {
  const [searchTerm, setSearchterm] = useState("");
  const [recordMsg, setrecordMsg] = useState(false);
  const [result, setResult] = useState();

  function onSearchHandler(e) {
    setSearchterm(e.target.value);
    setResult(e.target.value);

    let filtered = props.data.filter((val) => {
      if (searchTerm === "") {
        return val;
      } else if (
        val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
        val.email.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      ) {
        return val;
      }
    });

    setResult(filtered);
    setrecordMsg(
      "Search Results For " +
        `${searchTerm}` +
        " :" +
        ` ${result.length}` +
        " Records Found!"
    );
  }

  return (
    <div>
      <div className="search">
        <div className="input-group rounded">
          <input
            type="search"
            className="form-control input"
            placeholder="Search"
            aria-label="Search"
            onChange={onSearchHandler}
            aria-describedby="search-addon"
          />
          <img id="search" src="/images/search_black_24dp@2x.png"></img>
        </div>
        <div>
          <button
            type="button"
            id="filter-btn"
            className="btn btn-outline-primary"
          >
            Apply filter
          </button>
        </div>
      </div>
      {result && (
        <div style={{ backgroundColor: "#F4F4F4" }} id="record-msg">
          {recordMsg}
        </div>
      )}
    </div>
  );
}

export default Search;
