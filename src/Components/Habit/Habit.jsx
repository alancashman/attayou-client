import "./Habit.scss";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Habit({
  name,
  done,
  description,
  id,
  habits,
  formattedDate,
  getHabits,
  setShowModal,
  setDeleteId,
}) {
  const API_URL = process.env.REACT_APP_API_URL;
  const [doneStatus, setDoneStatus] = useState(done);

  // Set done status (class) for each habit
  useEffect(() => {
    setDoneStatus(done);
  }, [done, habits, formattedDate]);

  // Determine done status (class) to output in className
  const doneStatusClass = doneStatus
    ? "habit__cell habit__cell--done"
    : "habit__cell habit__cell--notdone";

  function putHandler() {
    // Find habit in habits array
    const habit = habits.find((habit) => habit.id === id);
    // Find element in history array for today's date
    const dateObj = habit.history.find((habit) => habit.date === formattedDate);
    // If element is found,
    if (dateObj) {
      // Find the index for the element
      const foundIndex = habit.history.findIndex(
        (instance) => instance.date === formattedDate
      );
      // Update the done property to its inverse
      habit.history[foundIndex].done = !habit.history[foundIndex].done;
      // Set the class for the habit to its inverse
      setDoneStatus(!doneStatus);
      // Else,
    } else {
      // Add a new element to the history array for today's date, setting done = true
      habit.history.push({
        date: formattedDate,
        done: true,
      });
      // Set the class for the habit to its inverse
      setDoneStatus(() => !doneStatus);
    }
    axios
      .put(`${API_URL}/habits/${habit.id}`, habit)
      .then((res) => {
        console.log(res.data);
        getHabits();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function deleteClickHandler() {
    setDeleteId(id);
    setShowModal(true);
  }

  return (
    <div className="habit">
      <div className="habit__text">
        <h5 className="habit__subheading">{name}</h5>
        <p className="habit__description">{description}</p>
      </div>
      <button className="habit__delete-btn" onClick={deleteClickHandler}>
        🗑
      </button>
      <button
        className={doneStatusClass}
        // className="habit__cell habit__cell--done"
        onClick={putHandler}
        id={id}
      ></button>
    </div>
  );
}
