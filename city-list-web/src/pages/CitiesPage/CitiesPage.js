import React from "react";
import CitiesList from "./CitiesList/CitiesList";
import CityDetails from "./CityDetails/CityDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCitiesByName,
  loadCitiesPage,
  selectCity,
  setEditMode,
  updateCity,
} from "./Actions";
import CitiesSearchBar from "./CitiesSearchBar/CitiesSearchBar";
import "./CityPage.scss";
import CityPagination from "./CityPagination/CityPagination";
import Button from "react-bootstrap/Button";

const CitiesPage = ({ token, logout }) => {
  const dispatch = useDispatch();

  const citiesPage = useSelector((state) => state.citiesPage.citiesPage);
  const selectedCity = useSelector((state) => state.citiesPage.selectedCity);
  const isEditMode = useSelector((state) => state.citiesPage.isEditMode);
  const isPaginated = useSelector((state) => state.citiesPage.isPaginated);
  const isNameSearch = useSelector((state) => state.citiesPage.isNameSearch);
  const isCitiesReceiving = useSelector(
    (state) => state.citiesPage.retrievingData.pending
  );

  const loadNewPage = (pageNo) => {
    dispatch(loadCitiesPage(token, pageNo));
  };

  const loadInitialCitiesPage = () => {
    loadNewPage(0);
  };

  const loadCities = (name) => {
    dispatch(loadCitiesByName(token, name));
  };

  const setSelectedCity = (city) => {
    setMode(false);
    dispatch(selectCity(city));
  };

  const updateSelectedCity = (city) => {
    dispatch(updateCity(token, city, citiesPage));
  };

  const setMode = (editMode) => {
    dispatch(setEditMode(editMode));
  };

  const onLogout = (event) => {
    event.preventDefault();
    logout();
  };

  if (citiesPage && selectedCity) {
    return (
      <div className="splitLeft">
        <div className="textCentered">
          <p>
            <CitiesSearchBar
              isNameSearch={isNameSearch}
              loadCitiesByName={loadCities}
              loadInitialCitiesPage={loadInitialCitiesPage}
            />
          </p>
          <p>
            <CityPagination
                isPaginated={isPaginated}
                pageNo={citiesPage.pageNo}
                totalPages={citiesPage.totalPages}
                isLast={citiesPage.last}
                loadPage={loadNewPage}
            />
          </p>
          <p>
            <CitiesList
              page={citiesPage}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
          </p>
        </div>

        <div className="splitRight">
          <div className={"absoluteRight"}>
            <Button onClick={onLogout}>Logout</Button>
          </div>
          <div className="textCentered">
            <CityDetails
              city={selectedCity}
              isEditMode={isEditMode}
              updateSelectedCity={updateSelectedCity}
              setEditMode={setMode}
            />
          </div>
        </div>
      </div>
    );
  } else if (isCitiesReceiving) {
    return <div>Loading...</div>;
  } else {
    return <div>no cities list</div>;
  }
};

export default CitiesPage;
