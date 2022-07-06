import React from 'react';

const CitiesList = ({page, selectedCity,loadNewPage,setSelectedCity}) => {
    // const dispatch = useDispatch();
    const cities = page.content
    const selectedId = selectedCity.id || 0;
    const pageNo = page.pageNo;
    const isLast = page.last;
    // const token = useSelector(state => state.loginPage.token);

    console.log('run cities list ', page, selectedCity)

    const buttonClicked = (event, city) => {
        event.preventDefault();
        console.log(event)
        setSelectedCity(city)
    };
    const prev = (event) => {
        if (pageNo) {
            // dispatch(loadCitiesPage(token, pageNo - 1));
            loadNewPage(pageNo-1);
        }
    }
    const next = (event) => {
        if (pageNo !== undefined && !isLast) {
            // dispatch(loadCitiesPage(token, pageNo + 1));
            loadNewPage(pageNo+1);
        }
    }

    if (cities) {
        return (
            <div>
                <button type="button"
                        onClick={prev}> previous
                </button>
                <span> - {pageNo + 1} - </span>
                <button type="button"
                        onClick={next}> next
                </button>
                <ul>
                    {cities.map(city => (
                        <li key={city.id} defaultValue={selectedId}>
                            <p>
                                <button type="button"
                                        onClick={event => buttonClicked(event, city)}> {city.id} - {city.name}
                                </button>
                                -
                                <img src={city.photo} width={100}
                                     height={50}
                                     alt={city.name}/>
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    return (
        <div>{selectedCity.name}
        </div>
    );

}
export default CitiesList;