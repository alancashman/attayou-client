import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import WelcomePage from "./Pages/WelcomePage";
import HabitsPage from "./Pages/HabitsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/habits" element={<HabitsPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
