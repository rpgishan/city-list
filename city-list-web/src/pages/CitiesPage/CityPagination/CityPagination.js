import React from "react";
import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";

const CityPagination = ({
  isNameSearch,
  pageNo,
  totalPages,
  isLast,
  loadPage,
  loadCitiesByName,
}) => {
  const currPageNo = pageNo + 1;
  const noOfShowItems = 5;
  const initialPageNo = 1;
  const lastPageNo = totalPages;

  const isFirst = currPageNo === initialPageNo;

  let startNumber = currPageNo - Math.floor(noOfShowItems / 2);
  startNumber = startNumber < initialPageNo ? initialPageNo : startNumber;

  let endNumber = startNumber + noOfShowItems - 1;

  if (endNumber > lastPageNo) {
    endNumber = lastPageNo;
    startNumber = lastPageNo - noOfShowItems + 1;
    if (startNumber < initialPageNo) {
      startNumber = initialPageNo;
    }
  }

  const loadNewPage = (newPageNo) => {
    const pageNumber = newPageNo - 1;
    if (isNameSearch) {
      loadCitiesByName(pageNumber);
    } else {
      loadPage(pageNumber);
    }
  };

  const onClickFirst = (event) => {
    event.preventDefault();
    loadNewPage(initialPageNo);
  };

  const onClickLast = (event) => {
    event.preventDefault();
    loadNewPage(lastPageNo);
  };

  const onClickItem = (event, clickedPage) => {
    event.preventDefault();
    loadNewPage(clickedPage);
  };

  const onClickPrev = (event) => {
    event.preventDefault();
    loadNewPage(currPageNo - 1);
  };

  const onClickNext = (event) => {
    event.preventDefault();
    loadNewPage(currPageNo + 1);
  };

  const items = [];

  // items.push(<Pagination.First disabled={isFirst} onClick={onClickFirst} />);
  items.push(
    <Pagination.Prev key={"prev"} disabled={isFirst} onClick={onClickPrev} />
  );

  if (startNumber !== initialPageNo) {
    items.push(
      <PageItem key={initialPageNo} onClick={onClickFirst}>
        {initialPageNo}
      </PageItem>
    );
  }
  if (startNumber !== initialPageNo && startNumber !== initialPageNo + 1) {
    items.push(<Pagination.Ellipsis key={"leftEllipsis"} />);
  }

  for (let number = startNumber; number <= endNumber; number++) {
    items.push(
      <PageItem
        key={number}
        active={number === currPageNo}
        onClick={(event) => onClickItem(event, number)}
      >
        {number}
      </PageItem>
    );
  }
  if (endNumber !== lastPageNo && endNumber !== lastPageNo - 1) {
    items.push(<Pagination.Ellipsis key={"rightEllipsis"} />);
  }
  if (endNumber !== lastPageNo) {
    items.push(
      <PageItem key={lastPageNo} onClick={onClickLast}>
        {lastPageNo}
      </PageItem>
    );
  }
  items.push(
    <Pagination.Next key={"next"} disabled={isLast} onClick={onClickNext} />
  );
  // items.push(<Pagination.Last disabled={isLast} onClick={onClickLast} />);

  return (
    <div>
      <Pagination size="sm">{items}</Pagination>
    </div>
  );
};

export default CityPagination;
