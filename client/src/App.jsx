import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Nav";
import Register from "./Register";
import Login from "./Login";
import MyProfile from "./MyProfile";

export const store = createContext();
const App = () => {
  const [token,setToken] = useState(null)
  return (
    <store.Provider value={[token,setToken]}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/register" Component={Register} />
          <Route path="/login" Component={Login} />
          <Route path="/myprofile" Component={MyProfile} />
        </Routes>
      </BrowserRouter>
    </store.Provider>
  );
};

export default App;
