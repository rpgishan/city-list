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
    <div>
      <FormControl
        type="text"
        size={"lg"}
        value={name}
        onChange={handleNameChange}
      />
      <p>
        <Button value="Search" disabled={isSearchDisabled} onClick={onSearch}>
          Search
        </Button>
        <span> </span>
        <Button disabled={isClearDisabled} onClick={onClear}>
          Clear
        </Button>
      </p>
    </div>
  );
};

export default CitiesSearchBar;
