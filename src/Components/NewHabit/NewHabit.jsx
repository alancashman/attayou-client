import { useState } from "react";
import axios from "axios";
import "./NewHabit.scss";

const API_URL = process.env.REACT_APP_API_URL;

export default function NewHabit({ setHabits, habits }) {
  const [showForm, setShowForm] = useState(false);
  const [newHabit, setNewHabit] = useState("");
  const [newHabitInputClass, setNewHabitInputClass] =
    useState("new-habit__input");
  const [newHabitPlaceholder, setNewHabitPlaceholder] =
    useState("Enter a habit...");
  // Show form on button click
  function addNewHandler() {
    setShowForm((showForm) => !showForm);
  }

  // Control loop for newHabit input
  function handleNewHabitChange(e) {
    setNewHabit(e.target.value);
    setNewHabitInputClass("new-habit__input");
  }

  // Post newHabit to API
  function postHabit(e) {
    e.preventDefault();
    if (!newHabit) {
      setNewHabitInputClass("new-habit__input new-habit__input--error");
      setNewHabitPlaceholder("Please enter a habit you wish to track.");
      return;
    } else {
      const habit = {
        name: newHabit,
        history: {
          date: new Date(Date.now()).toISOString().slice(0, 10),
          done: false,
        },
        user_id: 1,
      };

      axios
        .post(`${API_URL}/habits`, habit)
        .then((res) => {
          console.log("res.data: ", res.data);
          setNewHabit("");
          setShowForm((showForm) => false);
          setHabits((prevHabits) => {
            return [...prevHabits, res.data];
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <div className="new-habit">
      {showForm && (
        <form action="submit" className="new-habit__form" onSubmit={postHabit}>
          <input
            type="text"
            id="habitName"
            placeholder={newHabitPlaceholder}
            className={newHabitInputClass}
            value={newHabit}
            onChange={handleNewHabitChange}
          />
          <div className="new-habit__btns">
            <button className="new-habit__btn new-habit__btn--submit">
              Submit
            </button>
            {showForm && (
              <button
                className="new-habit__btn new-habit__btn--cancel"
                onClick={addNewHandler}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}
      {showForm || (
        <button className="new-habit__add-btn" onClick={addNewHandler}>
          + Add New
        </button>
      )}
    </div>
  );
}
