const PAGE_SIZE = 16;

export const getPager = (totalItems: number, currentPage = 1) => {
  const TOTAL_PAGES = Math.ceil(totalItems / PAGE_SIZE);

  let startPage = 0;
  let endPage = 0;

  if (TOTAL_PAGES <= 10) {
    startPage = 1;
    endPage = TOTAL_PAGES;
  } else if (currentPage <= 6) {
    startPage = 1;
    endPage = 10;
  } else if (currentPage + 4 >= TOTAL_PAGES) {
    startPage = TOTAL_PAGES - 9;
    endPage = TOTAL_PAGES;
  } else {
    startPage = currentPage - 5;
    endPage = currentPage + 4;
  }

  const START_INDEX = (currentPage - 1) * PAGE_SIZE;
  const END_INDEX = Math.min(START_INDEX + PAGE_SIZE - 1, totalItems - 1);

  const PAGES = [...Array(endPage + 1 - startPage).keys()].map(
    (pageNumber) => startPage + pageNumber,
  );

  return {
    totalItems,
    currentPage,
    pageSize: PAGE_SIZE,
    totalPages: TOTAL_PAGES,
    startPage,
    endPage,
    startIndex: START_INDEX,
    endIndex: END_INDEX,
    pages: PAGES,
  };
};

export const setPage = (
  items: never[],
  currentPage = 1,
) => {
  const newState = getPager(items.length, currentPage);

  const pageOfItems = items.length
    ? items.slice(newState.startIndex, newState.endIndex + 1)
    : [];

  return {
    newState,
    items: pageOfItems,
  };
};
