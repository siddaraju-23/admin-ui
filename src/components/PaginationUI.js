import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import "../styles/Pagination.css";
import useMediaQuery from "@mui/material/useMediaQuery";

const PaginationUI = ({
  setCurrentPage,
  usersPerPage,
  setData,
  currentPage,
  data,
  setSearchApiData,
  searchApiData,
}) => {
  const matches = useMediaQuery("(max-width:450px)");

  //  change the page number and update the current page.
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  //  delete all selected users and update the data.
  const handleDeleteSelected = () => {
    const updatedData = data.filter((user) => !user.checked);
    const updatedSearchApiData = searchApiData.filter((user) => !user.checked);
    setData(updatedData);
    setSearchApiData(updatedSearchApiData);
  };

  useEffect(() => {
    const totalPages = Math.ceil(data.length / usersPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(currentPage);
    }
  }, [ data.length,  usersPerPage]);
  
  

  return (
    <section className="pagination-container">
      <section className="delete-selected">
        <Button
          variant="contained"
          onClick={handleDeleteSelected}
          color="error"
          className="delete-selected-button"
        >
          Delete Selected
        </Button>
      </section>
      <nav className="pagination">
        <Pagination
          count={Math.ceil(data.length / usersPerPage)}
          page={currentPage}
          onChange={handleChange}
          showFirstButton
          showLastButton
          color="primary"
          size={matches ? "small" : "large"}
        />
      </nav>
    </section>
  );
};

export default PaginationUI;
