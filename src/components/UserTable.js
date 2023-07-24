import React from "react";
import UserRowEdit from "./UserRowEdit";
import "../styles/UserTable.css";

const UserTable = ({
  data,
  setData,
  currentPage,
  usersPerPage,
  setEditingId,
  editingId,
  setSearchApiData,
  searchApiData,
}) => {
  const getUserSlice = () => {
    const startIndex = (currentPage - 1) * usersPerPage; 
    const endIndex = startIndex + usersPerPage; 
    return data.slice(startIndex, endIndex); 
  };

  // fun to select all change
  const handleSelectAllChange = (event) => {
    const updatedData = getUserSlice().map((user) => ({
      ...user,
      checked: event.target.checked,
    }));
    const checkeddata = data.map((user) => {
      return {
        ...user,
        ...updatedData.find((checkedUsers) => checkedUsers.id === user.id),
      };
    });

    const chekedAllSearchApiData = searchApiData.map((user) => {
      return {
        ...user,
        ...updatedData.find((checkedUsers) => checkedUsers.id === user.id),
      };
    });
    setData(checkeddata);
    setSearchApiData(chekedAllSearchApiData);
  };

  //create fun to handle checkbox
  const handleCheckboxChange = (event, userId) => {
    const updatedData = data.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          checked: event.target.checked,
        };
      }
      return user;
    });

    //get api data to update userlist
    const checkedSearchApiData = searchApiData.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          checked: event.target.checked,
        };
      }
      return user;
    });
    setData(updatedData);
    setSearchApiData(checkedSearchApiData);
  };

  //fun to delete using id
  const handleDelete = (id) => {
    const updatedData = data.filter((user) => user.id !== id);
    const updatedSearchApiData = searchApiData.filter((user) => user.id !== id);
    setData(updatedData);
    setSearchApiData(updatedSearchApiData);
  };

  //fun to edit the email, name or role.
  const handleEdit = (id) => {
    setEditingId(id);
  };

  
  const isDeleteDisabled = (id) => {
    return editingId === id;
  };

  return (
    <section className="table-container">
      <table>
        <thead>
          <tr className="header-sticky">
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAllChange}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {getUserSlice().map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(event) => handleCheckboxChange(event, item.id)} 
                />
              </td>
              {editingId === item.id ? (
                <UserRowEdit
                  data={data}
                  setData={setData}
                  item={item}
                  setSearchApiData={setSearchApiData}
                  setEditingId={setEditingId}
                  searchApiData={searchApiData}
                />
              ) : (
                <>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button className="" onClick={() => handleEdit(item.id)}>
                      {String.fromCharCode(9997)}
                    </button>{" "}
                    <button
                      className=""
                      onClick={() => handleDelete(item.id)} 
                      disabled={isDeleteDisabled(item.id)} 
                    >
                      {String.fromCharCode(10060)}
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UserTable;
