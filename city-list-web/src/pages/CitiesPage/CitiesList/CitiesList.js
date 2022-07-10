import React from "react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Figure from "react-bootstrap/Figure";
import FigureImage from "react-bootstrap/FigureImage";
import FigureCaption from "react-bootstrap/FigureCaption";

const CitiesList = ({ page, selectedCity, setSelectedCity }) => {
  const cities = page.content;
  const selectedId = selectedCity.id || 0;

  const buttonClicked = (event, city) => {
    event.preventDefault();
    setSelectedCity(city);
  };

  if (cities) {
    return (
      <div>
        {/*<OldCityPagination
          isPaginated={isPaginated}
          pageNo={pageNo}
          totalPages={totalPages}
          isLast={isLast}
          loadNewPage={loadNewPage}
        />*/}
        <ListGroup>
          {cities.map((city) => (
            <ListGroup.Item key={city.id} defaultValue={selectedId}>
              <CityItem city={city} buttonClicked={buttonClicked} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  }
  return <div>City is empty</div>;
};

const CityItem = ({ city, buttonClicked }) => {
  return (
    <div>
      <p>
        <Button
          variant="outline-primary"
          onClick={(event) => buttonClicked(event, city)}
        >
          <Figure>
            <FigureImage
              src={city.photo}
              width={100}
              height={50}
              alt={city.name}
            />
            <FigureCaption>{city.name}</FigureCaption>
          </Figure>
        </Button>
      </p>
    </div>
  );
};

const OLDCityItem = ({ city, buttonClicked }) => {
  return (
    <div>
      <p>
        <Button type="button" onClick={(event) => buttonClicked(event, city)}>
          {city.id} - {city.name}
        </Button>
        <span> </span>
        <Image src={city.photo} width={100} height={50} alt={city.name} />
      </p>
    </div>
  );
};

// const OldCityPagination = ({
//   isPaginated,
//   pageNo,
//   totalPages,
//   isLast,
//   loadNewPage,
// }) => {
//   const isPrevEnabled = pageNo && isPaginated;
//   const isNextEnabled = pageNo !== undefined && !isLast && isPaginated;
//   const prev = (event) => {
//     event.preventDefault();
//     if (isPrevEnabled) {
//       loadNewPage(pageNo - 1);
//     }
//   };
//   const next = (event) => {
//     event.preventDefault();
//     if (isNextEnabled) {
//       loadNewPage(pageNo + 1);
//     }
//   };
//   return (
//     <div hidden={!isPaginated}>
//       <Button type="button" disabled={!isPrevEnabled} onClick={prev}>
//         previous
//       </Button>
//       <span>{` ${pageNo + 1} of ${totalPages}`}</span>
//       <Button type="button" disabled={!isNextEnabled} onClick={next}>
//         next
//       </Button>
//     </div>
//   );
// };

export default CitiesList;
