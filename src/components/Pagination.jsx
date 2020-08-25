import React, { useState, useEffect } from "react";

export default function PaginationBar(props) {
    
  // Setting state
  const [pager, setPager] = useState({
    totalPages: 0,
    startIndex: 0,
    endIndex: 0,
    currentPage: 1,
    pages: [],
  });

  // Set selected page
  const setPage = (page) => {
    var { items, pageSize } = props;
    var newPager = pager;

    if (page < 1 || page > newPager.totalPages) {
      return;
    }
    // get new pager object for specified page
    newPager = getPager(items.length, page, pageSize);

    // get new page of items from items array
    var pageOfItems = props.items.length
      ? items.slice(newPager.startIndex, newPager.endIndex + 1)
      : [];

    // update state
    setPager(newPager);

    // call change page function in parent component
    props.onChangePage(pageOfItems);
  };

  // Component did mount / update
  useEffect(
    () => {
      // set page if items array isn't empty
      if (props.items) {
        setPage(props.initialPage);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.items, props.pageSize]
  );

  const getPager = (totalItems, currentPage, pageSize) => {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    var pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  };

  if (!pager.pages || pager.pages.length <= 1) {
    return null;
  } else {
    return (
      <ul className="pagination">
        <li className={pager.currentPage === 1 ? "disabled" : ""}>
          <a onClick={() => setPage(1)}>First</a>
        </li>
        <li className={pager.currentPage === 1 ? "disabled" : ""}>
          <a onClick={() => setPage(pager.currentPage - 1)}>Previous</a>
        </li>
        {pager.pages.map((page, index) => (
          <li
            key={index}
            className={pager.currentPage === page ? "active" : ""}
          >
            <a onClick={() => setPage(page)}>{page}</a>
          </li>
        ))}
        <li
          className={pager.currentPage === pager.totalPages ? "disabled" : ""}
        >
          <a onClick={() => setPage(pager.currentPage + 1)}>Next</a>
        </li>
        <li
          className={pager.currentPage === pager.totalPages ? "disabled" : ""}
        >
          <a onClick={() => setPage(pager.totalPages)}>Last</a>
        </li>
      </ul>
    );
  }
}
