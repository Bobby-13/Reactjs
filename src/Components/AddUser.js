import React, { useState } from "react";
import "./AddUser.css";
import axios from "axios";
import Swal from "sweetalert2";

export const Adduser = ({ updateUI, render, closemodal }) => {
  // const axios = require("axios");

  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobnum, setMobnum] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [errormessage1, setErrormessage1] = useState("");
  const [errormessage2, setErrormessage2] = useState("");
  const [errormessage3, setErrormessage3] = useState("");
  const [errormessage4, setErrormessage4] = useState("");
  const [errormessage5, setErrormessage5] = useState("");
  const [errormessage6, setErrormessage6] = useState("");
  const [isemail, setIsemail] = useState(false);
  const [isfname, setIsfname] = useState(false);
  const [islname, setIslname] = useState(false);
  const [isaddress, setIsaddress] = useState(false);
  const [ismobnum, setIsmobnum] = useState(false);
  const [isdob, setIsdob] = useState(false);
  const [statusmsg, setStatusmsg] = useState("");
  const [colorClass, setColorClass] = useState("");

  const currentDate = new Date();

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
  //   // data(false);
  //   setColorClass("");
  //   setStatusmsg("");

  // };
  const Adduserfun = async (e) => {
    //  Refresherror();
   
    e.preventDefault();
//     const dateObject = new Date(dob);
// const year = String(dateObject.getFullYear()).padStart(4, '0'); // Format the year with leading zeros
// const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Format the month with leading zeros
// const day = String(dateObject.getDate()).padStart(2, '0'); // Format the day with leading zeros

// const formattedDate = `${month}/${day}/${year}`;

    const obj = {
      email,
      fname,
      lname,
      mob_num: mobnum,
      date: dob,
      address,
      curdate: new Date(),
    };

  

    if (emailvalidation(email)) {
      if (Fnamevalidation(fname)) {
        if (Lnamevalidation(lname)) {
          if (mobnumvalidation(mobnum)) {
            if (datevalidation(dob)) {
              if (Addressvalidation(address)) {
                const ab = await uservalidation(obj.email);
                if (!ab.apiResponse) {
                  console.log(dob)
                  axios
                    .post("http://localhost:8080/user/post", obj)
                    .then((res) => {
                      updateUI(!render);
                        closemodal();
                        Swal.fire({title:'Added SuccessFully !',
                        icon: 'success',
                        position:'top',
                        showConfirmButton:false,
                       timer:"1000"});
                    })
                    .catch((err) => console.log(err));
                  // setStatusmsg("Successfully Added ..");
                  // setColorClass("success");
                } else {
                  setStatusmsg("User Already Exist .");
                  setColorClass("error");
                }
              }
            }
          }
        }
      }
    }
  };

  const uservalidation = async (ref) => {
    const res = await axios.get(`http://localhost:8080/user/getbyid/${ref}`);
    console.log(res.data);
    return { apiResponse: res.data };
  };

  const emailvalidation = (val) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const res =
      val.length > 0
        ? emailPattern.test(val)
          ? (setIsemail(false), true)
          : (setErrormessage1("Invalid email *"), setIsemail(true), false)
        : (setErrormessage1("E-mail id shouldn't be empty *"),
          setIsemail(true),
          false);
    return res;
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

  return (
    <div
      className="modal-con"
      onClick={(e) => {
        if (e.target.className === "modal-con") closemodal();
      }}
    >
      <div className="modal">
        <form>
          <p className={colorClass}>{statusmsg}</p>
          <h2>Add User..</h2>
          <div className="form-grp">
            <b>Email</b>
            <input
              type="text"
              onChange={(e) => {
                setStatusmsg("");
                emailvalidation(e.target.value.toLowerCase());
                // emailval(e.target.value)
                setEmail(e.target.value.toLowerCase());
                // Refresherror();
              }}
            />
            <p className="errormsg">{isemail && errormessage1}</p>
          </div>
          <div className="form-grp">
            <b>First name</b>
            <input
              type="text"
              onChange={(e) => {
                Fnamevalidation(e.target.value);
                setFname(e.target.value);
                // Refresherror();
              }}
            />
            <p className="errormsg"> {isfname && errormessage2}</p>
          </div>
          <div className="form-grp">
            <b>Last name</b>
            <input
              type="text" 
              onChange={(e) => {
                Lnamevalidation(e.target.value);
                setLname(e.target.value);
                // Refresherror();
              }}
            />
            <p className="errormsg">{islname && errormessage3}</p>
          </div>
          <div className="form-grp">
            <b>Mobile Number</b>
            <input
              type="text"
              onChange={(e) => {
                mobnumvalidation(e.target.value);
                setMobnum(e.target.value);
                // Refresherror();
              }}
            />
            <p className="errormsg">{ismobnum && errormessage4} </p>
          </div>
          <div className="form-grp">
            <b>Dob</b>
            <input
              type="date"
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                datevalidation(e.target.value);
                setDob(e.target.value);
                // Refresherror();
              }}
            />
            <p className="errormsg">{isdob && errormessage5}</p>
          </div>
          <div className="form-grp">
            <b> Address</b>
            <textarea 
              rows={4}
              cols={20}
              onChange={(e) => {
                Addressvalidation(e.target.value);
                // Refresherror();
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
