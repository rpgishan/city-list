import React, { useState } from "react";

const CitiesSearchBar = ({
  isNameSearch,
  loadCitiesByName,
  loadInitialCitiesPage,
}) => {
  const [name, setName] = useState("");

  const isSearchDisabled = !name;
  const isClearDisabled = !isNameSearch && !name;

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const onClear = (event) => {
    event.preventDefault();
    if (!isClearDisabled) {
      setName("");
      if (isNameSearch) {
        loadInitialCitiesPage();
      }
    }
  };

  const onSearch = (event) => {
    event.preventDefault();
    if (!isSearchDisabled) {
      loadCitiesByName(name);
    }
  };

  return (
    <div>
      <input type="text" value={name} onChange={handleNameChange} />
      <input
        type="button"
        value="Search"
        disabled={isSearchDisabled}
        onClick={onSearch}
      />
      <input
        type="button"
        value="Clear"
        disabled={isClearDisabled}
        onClick={onClear}
      />
    </div>
  );
};

export default CitiesSearchBar;
