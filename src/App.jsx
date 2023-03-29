import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Welcome from "./Components/Welcome/Welcome";
import Habits from "./Components/Habits/Habits";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/habits" element={<Habits />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
