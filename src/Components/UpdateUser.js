import React, { useState, useEffect } from "react";
import "./AddUser.css";
import axios from "axios";
import Swal from "sweetalert2";

export const UpdateUser = ({ objectref, updateUI, render, closemodal }) => {
  // const axios = require("axios");

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobnum, setMobnum] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  // const [errormessage1, setErrormessage1] = useState("");
  const [errormessage2, setErrormessage2] = useState("");
  const [errormessage3, setErrormessage3] = useState("");
  const [errormessage4, setErrormessage4] = useState("");
  const [errormessage5, setErrormessage5] = useState("");
  const [errormessage6, setErrormessage6] = useState("");
  // const [isemail, setIsemail] = useState(false);
  const [isfname, setIsfname] = useState(false);
  const [islname, setIslname] = useState(false);
  const [isaddress, setIsaddress] = useState(false);
  const [ismobnum, setIsmobnum] = useState(false);
  const [isdob, setIsdob] = useState(false);
  // const [statusmsg, setStatusmsg] = useState("");
  // const [colorClass, setColorClass] = useState("");

  const currentDate = new Date();
 
  useEffect(() => {
    setFname(objectref.fname);
    setLname(objectref.lname);
    setMobnum(objectref.mob_num);
    setDob(objectref.date);
    setAddress(objectref.address);
  }, [objectref]);

  const isValidDate = (dateString) => {
    const selectedDate = new Date(dateString);
    return selectedDate <= currentDate;
  };
  // const Refresherror = () => {
  //   setIsemail(false);
  //   setIsfname(false);
  //   setIslname(false);
  //   setIsdob(false);
  //   setIsaddress(false);
  //   setIsmobnum(false);
  //   setColorClass("");
  //   setStatusmsg("");
  // };
  const Adduserfun = async (e) => {
    e.preventDefault();
    const obj = {
      email: objectref.email,
      fname,
      lname,
      mob_num: mobnum,
      date: dob,
      address,
      curdate: new Date(),
    };
    if (Fnamevalidation(fname)) {
      if (Lnamevalidation(lname)) {
        if (mobnumvalidation(mobnum)) {
          if (datevalidation(dob)) {
            if (Addressvalidation(address)) {
              axios
                .put(`http://localhost:8080/user/put/${objectref.email}`, obj)
                .then((res) => {
                  updateUI(!render);
                  closemodal();
                  Swal.fire({
                    title: "Updated SuccessFully !",
                    icon: "success",
                    position: "top",
                    showConfirmButton: false,
                    timer: "1000",
                  });
                })
                .catch((err) => console.log(err) + " eror");
              // setStatusmsg("Updated Successfully ..");
              // setColorClass("success");
            }
          }
        }
      }
    }
  };

  const Fnamevalidation = (val) => {
    const fnamePattern = /^[A-Za-z]+$/;
    const res =
      val.length > 0
        ? fnamePattern.test(val)
          ? (setIsfname(false), true)
          : (setIsfname(true),
            setErrormessage2("Only Alphabets to be entered *"),
            false)
        : (setIsfname(true),
          setErrormessage2("First Name shouldn't be empty *"),
          false);
    return res;
  };

  const Lnamevalidation = (val) => {
    const lnamePattern = /^[A-Za-z]+$/;
    const res =
      val.length > 0
        ? lnamePattern.test(val)
          ? (setIslname(false), true)
          : (setIslname(true),
            setErrormessage3("Only Alphabets to be entered *"),
            false)
        : (setIslname(true),
          setErrormessage3("Last Name shouldn't be empty *"),
          false);
    return res;
  };

  const Addressvalidation = (val) => {
    const res =
      val.length > 0
        ? val.length <= 50
          ? (setIsaddress(false), true)
          : (setIsaddress(true),
            setErrormessage6("Address Shouldn't exceed 50 characters *"),
            false)
        : (setIsaddress(true),
          setErrormessage6("Address field shouldn't be empty *"),
          false);
    return res;
  };

  const mobnumvalidation = (val) => {
    const mobilePattern = /^[0-9]{10}$/;
    const res =
      val.length > 0
        ? mobilePattern.test(val)
          ? (setIsmobnum(false), true)
          : (setErrormessage4("Invalid Mobile Number *"),
            setIsmobnum(true),
            false)
        : (setErrormessage4("Mobile number shouldn't be empty *"),
          setIsmobnum(true),
          false);
    return res;
  };

  const datevalidation = (val) => {
    const data = isValidDate(val);
    const res =
      val.length > 0
        ? data
          ? (setIsdob(false), true)
          : (setIsdob(true),
            setErrormessage5("DOB cannot be a future date *"),
            false)
        : (setIsdob(true), setErrormessage5("Invalid date *"), false);

    return res;
  };

  // const MessageComponent = ({ statusmsg }) => {
  //   const colorClass =
  //     statusmsg === "User Already Exist ." ? "error" : "success";

  //   return <div className={colorClass}>{statusmsg}</div>;
  // };
  let abd = dob;

  return (
    <div
      className="modal-con"
      onClick={(e) => {
        if (e.target.className === "modal-con") closemodal();
      }}
    >
      <div className="modal">
        <form>
          {/* <img className='logo' src={logo} alt="Logo" /> */}
          {/* <p className={colorClass}>{statusmsg}</p> */}
          <h2>Update your changes</h2>
          <div className="form-grp">
            <p className="idclass">{objectref.email}</p>
            {/* <p className="errormsg">{isemail && errormessage}</p> */}
          </div>

          <div className="form-grp">
            <b>First name</b>
            <input
              type="text"
              value={fname}
              onChange={(e) => {
                setFname(e.target.value);
                Fnamevalidation(e.target.value);
              }}
            />
            <p className="errormsg"> {isfname && errormessage2}</p>
          </div>
          <div className="form-grp">
            <b>Last name</b>
            <input
              type="text"
              value={lname}
              onChange={(e) => {
                setLname(e.target.value);
                Lnamevalidation(e.target.value);
              }}
            />
            <p className="errormsg">{islname && errormessage3}</p>
          </div>
          <div className="form-grp">
            <b>Mobile Number</b>
            <input
              type="text"
              value={mobnum}
              onChange={(e) => {
                setMobnum(e.target.value);
                mobnumvalidation(e.target.value);
              }}
            />
            <p className="errormsg">{ismobnum && errormessage4} </p>
          </div>
          <div className="form-grp">
            <label htmlFor="dob">Dob</label>
            <input
              type="date"
              value={dob}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setDob(e.target.value);
                abd = dob;
                datevalidation(e.target.value);
              }}
            />
            <p className="errormsg">{isdob && errormessage5}</p>
          </div>
          <div className="form-grp">
            <b> Address</b>
            <textarea
              rows={4}
              cols={20}
              value={address}
              onChange={(e) => {
                Addressvalidation(e.target.value);
                setAddress(e.target.value);
              }}
            />
            <p className="errormsg">{isaddress && errormessage6}</p>
          </div>
          <button
            onClick={(e) => {
              Adduserfun(e);
            }}
            className="btn"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
