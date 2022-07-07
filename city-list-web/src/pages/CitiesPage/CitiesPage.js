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
      <div>
        <div className="splitLeft">
          <div className="topCentered">
            <CitiesSearchBar
              isNameSearch={isNameSearch}
              loadCitiesByName={loadCities}
              loadInitialCitiesPage={loadInitialCitiesPage}
            />
          </div>
          <div className="listPanel">
            <CitiesList
              page={citiesPage}
              selectedCity={selectedCity}
              isPaginated={isPaginated}
              loadNewPage={loadNewPage}
              setSelectedCity={setSelectedCity}
            />
          </div>
        </div>

        <div className="splitRight">
          <div className={"absoluteright"}>
            <input type="button" value="Logout" onClick={onLogout} />
          </div>
          <div className="centered">
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
