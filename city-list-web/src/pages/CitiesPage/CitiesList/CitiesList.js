import React from "react";

const CitiesList = ({
  page,
  selectedCity,
  isPaginated,
  loadNewPage,
  setSelectedCity,
}) => {
  const cities = page.content;
  const selectedId = selectedCity.id || 0;
  const pageNo = page.pageNo;
  const totalPages = page.totalPages;
  const isLast = page.last;
  const isPrevEnabled = pageNo && isPaginated;
  const isNextEnabled = pageNo !== undefined && !isLast && isPaginated;

  const buttonClicked = (event, city) => {
    event.preventDefault();
    console.log(event);
    setSelectedCity(city);
  };
  const prev = (event) => {
    event.preventDefault();
    if (isPrevEnabled) {
      loadNewPage(pageNo - 1);
    }
  };
  const next = (event) => {
    event.preventDefault();
    if (isNextEnabled) {
      loadNewPage(pageNo + 1);
    }
  };

  if (cities) {
    return (
      <div>
        <div hidden={!isPaginated}>
          <button type="button" disabled={!isPrevEnabled} onClick={prev}>
            previous
          </button>
          <span>{` ${pageNo + 1} of ${totalPages}`}</span>
          <button type="button" disabled={!isNextEnabled} onClick={next}>
            next
          </button>
        </div>
        <ul>
          {cities.map((city) => (
            <li key={city.id} defaultValue={selectedId}>
              <p>
                <button
                  type="button"
                  onClick={(event) => buttonClicked(event, city)}
                >
                  {city.id} - {city.name}
                </button>
                -
                <img src={city.photo} width={100} height={50} alt={city.name} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return <div>City is empty</div>;
};
export default CitiesList;
