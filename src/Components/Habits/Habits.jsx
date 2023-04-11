import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState, useEffect } from "react";

import Habit from "../Habit/Habit";
import HabitsHeader from "../HabitsHeader/HabitsHeader";
import NewHabit from "../NewHabit/NewHabit";
import DeleteHabitModal from "../DeleteHabitModal/DeleteHabitModal";
import "./Habits.scss";

const API_URL = process.env.REACT_APP_API_URL;

function Habits({ habits, setHabits, dates, setDates }) {
  const [date, setDate] = useState(new Date(Date.now()));

  const [percentage, setPercentage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const formattedDate = formatDate(date);

  const completedHabits = habits.filter((habit) => {
    const today = habit.history.find((data) => {
      return data.date === formattedDate && data.done;
    });
    return today ? today : false;
  });

  useEffect(() => {
    setPercentage(Math.floor((completedHabits.length / habits.length) * 100));
  }, [completedHabits, habits, formattedDate]);

  useEffect(() => {
    getHabits();
    setPercentage(0);
  }, []);

  function getDates(habits) {
    const datesArray = habits.map((habit) =>
      habit.history.map((item) => item.date)
    );
    const flattenedDates = datesArray.reduce((acc, val) => acc.concat(val), []);
    const uniqueDates = Array.from(new Set(flattenedDates));
    uniqueDates.sort((a, b) => new Date(a) - new Date(b));
    console.log(uniqueDates);
    setDates(uniqueDates);
    return uniqueDates;
  }

  function formatDate(date) {
    return date.toISOString().slice(0, 10);
  }

  function onCalendarChange(newDate) {
    setDate(newDate);
  }

  function getHabits() {
    axios
      .get(`${API_URL}/habits`)
      .then((res) => {
        setHabits(res.data);
        getDates(res.data);

        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function deleteHandler() {
    const habit = habits.find((habit) => habit.id === deleteId);
    console.log("habit: ", habit);
    if (habit) {
      axios
        .delete(`${API_URL}/habits/${habit.id}`)
        .then((res) => {
          console.log(res);
          getHabits();
          setShowModal(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
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
    <section className="habits__section">
      <div className="habits__subsection">
        <div className="habits__tracker">
          <HabitsHeader
            date={date}
            formattedDate={formattedDate}
            formatDate={formatDate}
          />
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
                  setShowModal={setShowModal}
                  setDeleteId={setDeleteId}
                />
              );
            })}

          <NewHabit habits={habits} setHabits={setHabits} />
        </div>
        <div className="habits__visuals">
          <Calendar
            value={date}
            onChange={onCalendarChange}
            className="calendar"
            calendarType="US"
          />
          <div className="habits__progress-bar">
            <h3 className="habits__progress-heading">Today's Progress</h3>
            <CircularProgressbar
              className="progress-bar"
              value={percentage}
              text={`${percentage}%`}
              styles={buildStyles({
                pathColor: "rgb(156, 222, 156)",
                textColor: "rgb(156,222,156)",
              })}
            />
          </div>
        </div>
      </div>
      {showModal && (
        <DeleteHabitModal
          deleteId={deleteId}
          deleteHandler={deleteHandler}
          setShowModal={setShowModal}
        />
      )}
    </section>
  );
}

export default Habits;
