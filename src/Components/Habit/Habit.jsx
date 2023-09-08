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
  const [history, setHistory] = useState([]);

  // Set done status (class) for each habit
  useEffect(() => {
    getHistory();
  }, []);

  useEffect(() => {
    let hasDoneEntry = false;
    history.forEach((historyObj) => {
      if (historyObj.date === formattedDate && historyObj.done) {
        hasDoneEntry = true;
      }
    });

    setDoneStatus(hasDoneEntry);
  }, [history, formattedDate]);

  function getHistory() {
    axios
      .get(`${API_URL}/habits/${id}`)
      .then((response) => {
        setHistory(response.data);
      })
      .catch((err) => {
        console.error(`Error setting history, ${err}`);
      });
  }

  // Determine done status (class) to output in className
  const doneStatusClass = doneStatus
    ? "habit__cell habit__cell--done"
    : "habit__cell habit__cell--notdone";

  function adjustHistory() {
    const updatedDoneStatus = !doneStatus;
    setDoneStatus(updatedDoneStatus);
    console.log("History: ", history);
    const today = history.find(
      (historyObj) => historyObj.date === formattedDate
    );
    console.log("Today:", today);
    if (!today) {
      axios
        .post(`${API_URL}/habits/${id}`, {
          habit_id: id,
          date: formattedDate,
          done: true,
        })
        .then((response) => {
          console.log(response.data);
        });
    } else {
      axios
        .put(`${API_URL}/habits/${id}`, {
          habit_id: id,
          date: formattedDate,
          done: updatedDoneStatus,
        })
        .then((response) => {
          console.log(response.data);
        });
    }
    getHabits();
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
        onClick={adjustHistory}
        id={id}
      ></button>
    </div>
  );
}
