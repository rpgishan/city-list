import React from 'react';
import CitiesList from "./CitiesList";
import CityDetails from "./CityDetails";

const CitiesPage = ({citiesPage, selectedCity, loadNewPage, setSelectedCity}) => {
    // const dispatch = useDispatch();
    // const token = useSelector(state => state.loginPage.token);

    // dispatch(loadCitiesPage(token, pageNo));

    console.log('dispatch loadCitiesPage')
    // const citiesPage = useSelector(state => state.citiesPage.citiesPage);
    // const selectedCity = useSelector(state => state.citiesPage.selectedCity);

    console.log('citiesPage ', citiesPage)
    console.log('selectedCity ', selectedCity)

    // return(<div>cities page</div>)

    if (citiesPage && selectedCity) {
        return (
            <div>
                <div className="split left">
                    <div className="centered">
                        <CitiesList page={citiesPage}
                                    selectedCity={selectedCity}
                                    loadNewPage={loadNewPage}
                                    setSelectedCity={setSelectedCity}/>
                    </div>
                </div>

                <div className="split right">
                    <div className="centered">
                        <CityDetails city={selectedCity}/>
                    </div>
                </div>
            </div>
        );
    } else {
        console.log('city list page in else ')
        // return (
        //     <BrowserRouter>
        //         <Redirect to="/"/>
        //     </BrowserRouter>)
        return (<div>no cities list</div>)
    }
}

export default CitiesPage;