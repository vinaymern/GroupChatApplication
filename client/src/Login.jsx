import React, { useContext, useState } from "react";
import axios from "axios";
import { store } from "./App";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [token, setToken] = useContext(store);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:5000/login", data)
  //     .then(res => setToken(res.data.token));
  // };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", data);
      setToken(response.data.token);
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

  if(token){
    return <Navigate to="/myprofile" />;
  }
  return (
    <div>
      <center>
        <form onSubmit={submitHandler} autoComplete="off">
          <h3 style={{margin:'10px'}}>Login</h3>
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
          <input style={{margin:'10px',border:'1px solid blue',width:'80px',padding:'5px',borderRadius:'8px',borderColor:'blue',color:'blue'}} type="submit" onChange={changeHandler} value="Login" />
          <br />
        </form>
      </center>
    </div>
  );
};

export default Login;
