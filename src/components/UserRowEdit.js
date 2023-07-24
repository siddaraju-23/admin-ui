import React, { useState } from "react";

const UserRowEdit = ({
  data,
  setData,
  item,
  setSearchApiData,
  setEditingId,
  searchApiData,
}) => {
  //useState fun
  const [saveEditData, setSaveEditData] = useState({ ...item });

  //fun handleInputchange
  const handleInputChange = (field, value) => {
    setSaveEditData((prevData) => {
      return { ...prevData, [field]: value };
    });
  };
  //use key to data
  const validateInput = () => {
    for (let key in saveEditData) {
      if (saveEditData[key] === "") {
        return false;
      }
    }
    return true;
  };

 
  const handleUpdate = (id) => {
    if (validateInput() === false) {
      alert("Input fields should not be empty");
    } else {
      //use map to udate userdata in the list
      const updatedData = data.map((userData) => {
        if (userData.id === id) {
          return saveEditData;
        }
        return userData;
      });

      const updatedSearchApiData = searchApiData.map((userData) => {
        if (userData.id === id) {
          return saveEditData;
        }
        return userData;
      });

      setData(updatedData);
      setSearchApiData(updatedSearchApiData);
    }

    setEditingId(null);
    
  };

  return (
    <>
      <td>
        <input
          type="text"
          value={saveEditData.name}
          onChange={(e) => handleInputChange("name", e.target.value)} 
        />
      </td>
      <td>
        <input
          type="text"
          value={saveEditData.email}
          onChange={(e) => handleInputChange("email", e.target.value)} 
        />
      </td>
      <td>
        <input
          type="text"
          value={saveEditData.role}
          onChange={(e) => handleInputChange("role", e.target.value)} 
        />
      </td>
      <td>
        <button className="" onClick={() => handleUpdate(item.id)}>
          {String.fromCharCode(9989)}
        </button>
      </td>
    </>
  );
};

export default UserRowEdit;
