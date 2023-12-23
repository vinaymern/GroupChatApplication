import React, { useState } from "react";
import axios from "axios";
const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   axios.post("http://localhost:5000/register", data).then((res) => {
  //     alert(res.data);
  //     setData({
  //       username: "",
  //       email: "",
  //       password: "",
  //       confirmpassword: "",
  //     });
  //   });
  // };
  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5000/register", data);
      alert(response.data.message); // Display success message
      setData({
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data); // Display the server error message
      } else if (error.request) {
        alert("No response received from the server");
      } else {
        alert("Error in sending the request");
      }
    }
  };
  
  return (
    <center>
        <form onSubmit={submitHandler}>
          <h3 style={{margin:'10px'}}>Register</h3>
          <input
            type="text"
            onChange={changeHandler}
            name="username"
            placeholder="Enter username"
            required
            style={{color:'blue',border:'1px solid blue',margin:'6px',padding:'2px',borderRadius:'8px'}}
          />
          <br />
          <input
            type="email"
            onChange={changeHandler}
            name="email"
            placeholder="Enter email"
            required
            style={{color:'blue',border:'1px solid blue',margin:'6px',padding:'2px',borderRadius:'8px'}}
          />
          <br />
          <input
            type="password"
            onChange={changeHandler}
            name="password"
            placeholder="Enter password"
            required
            style={{color:'blue',border:'1px solid blue',margin:'6px',padding:'2px',borderRadius:'8px'}}
          />
          <br />
          <input
            type="password"
            onChange={changeHandler}
            name="confirmpassword"
            placeholder="Enter confirm password"
            required
            style={{color:'blue',border:'1px solid blue',margin:'6px',padding:'2px',borderRadius:'8px'}}
          />
          <br />
          <input style={{margin:'10px',border:'1px solid blue',padding:'5px',borderRadius:'8px',borderColor:'blue',color:'blue'}} type="submit" onChange={changeHandler} value="Register" />
          <br />
        </form>
      </center>
  );
};

export default Register;
