import React, { useContext, useEffect, useState } from "react";
import { store } from "./App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
const MyProfile = () => {
  const [data, setData] = useState(null);
  const [token, setToken] = useContext(store);
  const navigate = useNavigate();
  const [allmsgs, setAllmsgs] = useState([]);
  const [newmsg, setNewmsg] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/myprofile", {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/getmsg", {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => setAllmsgs(res.data))
      .catch((err) => console.log(err));
  }, []);
  if (!token) {
    navigate("/login");
    return null;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/addmsg",
        { text: newmsg },
        {
          headers: {
            "x-token": token,
          },
        }
      )
      .then((res) => {
        setAllmsgs(res.data);
        setNewmsg("");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {data && (
        <center>
          <br />
          <span
            style={{ textAlign: "center", fontSize: "1.2rem", margin: "10px" }}
          >
            Welcome to Dashboard {data.username} !!{" "}
          </span>
          <button
            onClick={() => setToken(null)}
            style={{
              color: "red",
              outline: "none",
              margin: "6px",
              padding: "5px",
              borderRadius: "8px",
              border: "1px solid red",
            }}
          >
            Logout
          </button>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              style={{
                margin: "10px",
                padding: "5px",
                borderRadius: "8px",
                border: "1px solid blue",
                width: "220px",
                color: "blue",
              }}
              name="msg"
              placeholder="Enter a message"
              onChange={(e) => setNewmsg(e.target.value)}
            />
            <input
              type="submit"
              style={{
                marginTop: "10px",
                padding: "5px",
                borderRadius: "8px",
                border: "1px solid green",
                color: "green",
              }}
              value="send message"
            />
          </form>
          <br />
          {allmsgs.length >= 1 ? (
            allmsgs.map((msg) => {
              const { text, username, index, date } = msg;
              return (
                <article
                  key={index}
                  style={{
                    border: "1px solid black",
                    maxWidth: "350px",
                    borderRadius: "16px",
                    marginTop: "10px",
                  }}
                >
                  <h3 style={{ color: "red", marginRight: "60px" }}>
                    {username}{" "}
                    <Moment style={{ fontSize: "12px", color: "grey" }}>
                      {date}
                    </Moment>
                  </h3>
                  <p style={{ color: "blue" }}>{text}</p>
                </article>
              );
            })
          ) : (
            <h1>Messages Loading...</h1>
          )}
        </center>
      )}
    </div>
  );
};

export default MyProfile;
