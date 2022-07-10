import React from "react";
import CitiesList from "./CitiesList/CitiesList";
import CityDetails from "./CityDetails/CityDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCitiesByName,
  loadCitiesPage,
  removeSearchedCityName,
  selectCity,
  setEditMode,
  setSearchedCityName,
  updateCity,
} from "./Actions";
import CitiesSearchBar from "./CitiesSearchBar/CitiesSearchBar";
import "./CityPage.scss";
import CityPagination from "./CityPagination/CityPagination";

const CitiesPage = ({ token }) => {
  const dispatch = useDispatch();

  const citiesPage = useSelector((state) => state.citiesPage.citiesPage);
  const selectedCity = useSelector((state) => state.citiesPage.selectedCity);
  const isEditMode = useSelector((state) => state.citiesPage.isEditMode);
  const searchedName = useSelector((state) => state.citiesPage.searchedName);
  const isNameSearch = useSelector((state) => state.citiesPage.isNameSearch);
  const isCitiesReceiving = useSelector(
    (state) => state.citiesPage.retrievingData.pending
  );

  const loadNewPage = (pageNo) => {
    dispatch(loadCitiesPage(token, pageNo));
  };

  const loadInitialCitiesPage = () => {
    dispatch(removeSearchedCityName());
    loadNewPage(0);
  };

  const loadCities = (name, pageNo = 0) => {
    dispatch(setSearchedCityName(token, name, pageNo));
  };

  const loadSearchedCities = (pageNo = 0) => {
    if (searchedName) {
      dispatch(loadCitiesByName(token, searchedName, pageNo));
    }
  };

  const setSelectedCity = (city) => {
    setMode(false);
    dispatch(selectCity(city));
  };

  const updateSelectedCity = (city) => {
    dispatch(updateCity(token, city, citiesPage, isNameSearch, searchedName));
  };

  const setMode = (editMode) => {
    dispatch(setEditMode(editMode));
  };

  if (citiesPage && selectedCity) {
    return (
      <div className="splitLeft">
        <div className="text-center">
          <div className="mt-4 mx-2">
            <CitiesSearchBar
              isNameSearch={isNameSearch}
              loadCitiesByName={loadCities}
              loadInitialCitiesPage={loadInitialCitiesPage}
            />
          </div>
          <div className="mt-4 mx-2">
            <CityPagination
              isNameSearch={isNameSearch}
              pageNo={citiesPage.pageNo}
              totalPages={citiesPage.totalPages}
              isLast={citiesPage.last}
              loadPage={loadNewPage}
              loadCitiesByName={loadSearchedCities}
            />
          </div>
          <div className="mt-4 mx-2">
            <CitiesList
              page={citiesPage}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
          </div>
        </div>

        <div className="splitRight">
          <div className="text-center">
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
