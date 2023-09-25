import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import SignUp from "./components/signUp/signUp";
import SignIn from "./components/signIn/signIn";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import { MyContextProvider } from "./context/MyContext";

function App() {
  return (
    <MyContextProvider>
      <div className="container">
        <Routes>
          <Route path="/signUp" element={<SignUp />} />

          <Route path="/" element={<SignIn />} />

          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </MyContextProvider>
  );
}

export default App;
