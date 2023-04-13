import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import WelcomePage from "./Pages/WelcomePage";
import HabitsPage from "./Pages/HabitsPage";
import TrendsPage from "./Pages/TrendsPage";

function App() {
  const [active, setActive] = useState("Dashboard");
  const [dates, setDates] = useState([]);
  const [habits, setHabits] = useState([]);

  const percentages = dates.map((date) => {
    const doneHabits = habits.filter((habit) =>
      habit.history.find((day) => day.date === date && day.done)
    ).length;
    const totalHabits = habits.length;
    const percentage = (doneHabits / totalHabits) * 100;
    return { date, percentage };
  });

  console.log(percentages);

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
              percentages={percentages}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
