import React, { useEffect, useState } from "react";
import SearchBar from './SearchBar';
import UserTable from './UserTable';
import PaginationUI from "./PaginationUI";
import "../styles/AdminDashboard.css";
import userdata from "../Db/userdata";

//use state list
const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  //fetch userdata from API call using useEffect.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(userdata.apiEndPoint);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const dataReceived = await response.json();
        setData(dataReceived);
        setSearchApiData(dataReceived);
      } catch (error) {
        alert("Error fetching data:", error);
        //  display an error message
      }
    };

    fetchData();
  }, []);

  return (
    <section className="adminui-container">
      <SearchBar
        searchApiData={searchApiData}
        setData={setData}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        data={data}
      />

      <UserTable
        data={data}
        setData={setData}
        currentPage={currentPage}
        usersPerPage={usersPerPage}
        setEditingId={setEditingId}
        editingId={editingId}
        setSearchApiData={setSearchApiData}
        searchApiData={searchApiData}
      />

      <PaginationUI
        setCurrentPage={setCurrentPage}
        usersPerPage={usersPerPage}
        setData={setData}
        currentPage={currentPage}
        data={data}
        setSearchApiData={setSearchApiData}
        searchApiData={searchApiData}
      />
    </section>
  );
};

export default AdminDashboard;
