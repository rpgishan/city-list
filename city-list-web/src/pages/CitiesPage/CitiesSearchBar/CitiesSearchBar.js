import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

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
    <div className="mb-2 mx-auto">
      <FormControl
        type="text"
        size={"lg"}
        value={name}
        onChange={handleNameChange}
      />
      <div className={"mt-2"}>
        <Button
          className={"me-1"}
          value="Search"
          disabled={isSearchDisabled}
          onClick={onSearch}
        >
          Search
        </Button>
        <Button className={"ms-1"} disabled={isClearDisabled} onClick={onClear}>
          Clear
        </Button>
      </div>
    </div>
  );
};

export default CitiesSearchBar;
