import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";

import Habit from "../Habit/Habit";
import HabitsHeader from "../HabitsHeader/HabitsHeader";
import NewHabit from "../NewHabit/NewHabit";
import "./Habits.scss";

const API_URL = process.env.REACT_APP_API_URL;

function Habits() {
  //
  const [date, setDate] = useState(new Date(Date.now()));
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    getHabits();
  }, []);

  function formatDate(date) {
    return date.toISOString().slice(0, 10);
  }
  const formattedDate = formatDate(date);

  function onCalendarChange(newDate) {
    setDate(newDate);
  }

  function getHabits() {
    axios
      .get(`${API_URL}/habits`)
      .then((res) => {
        setHabits(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getDoneValue(habit, formattedDate) {
    if (habit.history.length > 0) {
      const index = habit.history.findIndex(
        (instance) => instance.date === formattedDate
      );
      if (index !== -1) {
        return habit.history[index].done;
      }
    }
    return false;
  }

  return (
    <>
      <Calendar
        value={date}
        onChange={onCalendarChange}
        className="calendar"
        calendarType="US"
      />
      <h1 className="habits__main-heading">Habits</h1>
      <div className="habits__tracker">
        <HabitsHeader date={date} />
        {habits.length > 0 &&
          habits.map((habit) => {
            return (
              <Habit
                key={habit.id}
                id={habit.id}
                name={habit.name}
                done={getDoneValue(habit, formattedDate)}
                habits={habits}
                formattedDate={formattedDate}
                getHabits={getHabits}
              />
            );
          })}

        <NewHabit habits={habits} setHabits={setHabits} />
      </div>
    </>
  );
}

export default Habits;
