import React, { useEffect, useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./UserDetails.css";
import axios from "axios";
import { Table } from "antd";
import { UpdateUser } from "./UpdateUser";
import Swal from "sweetalert2";

export const Userdetails = ({ updateUI, render }) => {
  const [user, setUser] = useState([]);
  const [objref, setObjref] = useState("");

  const colums = [
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "First Name",
      dataIndex: "fname",
    },
    {
      title: "Last Name",
      dataIndex: "lname",
    },
    {
      title: "Mobile Number",
      dataIndex: "mob_num",
    },
    {
      title: "Date Of Birth",
      dataIndex: "date",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Options",
      render: (res) => (
        <span className="actions">
          <BsFillTrashFill
            onClick={() => handleDelete(res)}
            className="delete-btn"
          />
          <BsFillPencilFill
            onClick={() => {
              setEditbtn(true);
              setObjref(res);
            }}
          />
        </span>
      ),
    },
  ];

  const [editbtn, setEditbtn] = useState(false);

  const [searchbtn, setSearchbtn] = useState(false);
  // const[searchobj,setSearchobj] = useState([]);
  useEffect(() => {
    fetchuser();
  }, [render]);
  // function modifyDate(user.date) {
  //   const modifiedData = data.split("-");
  //   console.log(modifiedData, "modifiedData");
  //   let dateformat = `${modifiedData[2]}-${modifiedData[1]}-${modifiedData[0]}`;
    
  // }
  const fetchuser = async () => {
    const obj = await axios.get("http://localhost:8080/user/get");
    setUser(obj.data);
  };

  function handleDelete(data) {
    Swal.fire({
      title: "Delete",
      html: `Are you sure you want to Delete this User <b> ${data.email}</b>`,
      icon: "warning",
      position: "top",
      timer: "3000",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your item has been deleted.",
          icon: "success",
          position: "top",
          showConfirmButton: false,
          timer: "1000",
        });
        axios
          .delete(`http://localhost:8080/user/delete/${data.email}`)
          .then((res) => {
            updateUI(!render);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(null);

  let query = "";
  const handleSearch = async (Q) => {
    // try {
    console.log(query);
    if (Q.length < 1) {
      query = "";
      setSearchResults([]);
      setSearchbtn(false);
    } else {
      // setEditbtn(true);
      setSearchbtn(true);
      const response = await axios.get(
        `http://localhost:8080/user/search?query=${query}`
      );
      console.log(response.data);
      const searchData = response.data;
      setSearchResults(searchData);
      // setSearchError(null);
    }
  };

  return (
    <div className="fixbox">
      <div className="search">
        <input className="searchbox"
          type="text"
          placeholder="Search"
          // value={searchTerm}
          onChange={(e) => {
            query = e.target.value;
            handleSearch(e.target.value);
            // setSearchTerm(e.target.value);
          }}
        />
      </div>
      <div>
        <Table
          columns={colums}
          dataSource={(searchbtn) ? (searchResults):( user.sort((a, b) => (a.curdate < b.curdate ? 1 : -1)))}
        />

        {editbtn && (
          <UpdateUser
            objectref={objref}
            updateUI={updateUI}
            render={render}
            closemodal={() => {
              setEditbtn(false);
            }}
          />
        )}
      </div>
    </div>
  );
};
