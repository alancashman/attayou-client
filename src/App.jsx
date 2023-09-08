import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import WelcomePage from "./Pages/WelcomePage";
import HabitsPage from "./Pages/HabitsPage";
import TrendsPage from "./Pages/TrendsPage";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [active, setActive] = useState("Dashboard");
  const [dates, setDates] = useState([]);
  const [habits, setHabits] = useState([]);
  // const [percentages, setPercentages] = useState([])
  const [history, setHistory] = useState([]);

  // const percentages = dates.map((date) => {
  //   const doneHabits = habits.filter((habit) =>
  //     habit.history.find((day) => day.date === date && day.done)
  //   ).length;
  //   const totalHabits = habits.length;
  //   const percentage = (doneHabits / totalHabits) * 100;
  //   return { date, percentage };
  // });

  // const percentages = dates.map(date => {
  //   const history = makeAxiosCall(`${API_URL}/habits/history`)

  // })

  //   const uniqueNames = [];
  // const uniqueObjects = dataArray.filter(obj => {
  //   if (!uniqueNames.includes(obj.name)) {
  //     uniqueNames.push(obj.name);
  //     return true;
  //   }
  //   return false;
  // });

  useEffect(() => {
    axios.get(`${API_URL}/habits/history`).then((response) => {
      console.log(response.data);
      setHistory(response.data);
      console.log(`History: ${history}`);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route
          path="/habits"
          element={
            <HabitsPage
              active={active}
              setActive={setActive}
              setDates={setDates}
              dates={dates}
              habits={habits}
              setHabits={setHabits}
            />
          }
        ></Route>
        <Route
          path="/trends"
          element={
            <TrendsPage
              active={active}
              setActive={setActive}
              dates={dates}
              // percentages={percentages}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
