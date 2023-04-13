import { useState } from "react";
import axios from "axios";
import "./NewHabit.scss";

const API_URL = process.env.REACT_APP_API_URL;

export default function NewHabit({ setHabits, habits }) {
  const [showForm, setShowForm] = useState(false);
  const [newHabit, setNewHabit] = useState("");
  const [newHabitDescription, setNewHabitDescription] = useState("");
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

  function handleNewDescriptionChange(e) {
    setNewHabitDescription(e.target.value);
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
        description: newHabitDescription,
        user_id: 1,
      };

      axios
        .post(`${API_URL}/habits`, habit)
        .then((res) => {
          console.log("res.data: ", res.data);
          setNewHabit("");
          setNewHabitDescription("");
          setShowForm((showForm) => false);
          setHabits((prevHabits) => {
            return [...prevHabits, JSON.parse(res.data)];
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
          <h5 className="new-habit__heading">Add New Habit</h5>
          <input
            type="text"
            name="name"
            id="habitName"
            placeholder={newHabitPlaceholder}
            className={newHabitInputClass}
            value={newHabit}
            onChange={handleNewHabitChange}
            maxLength={35}
          />
          <input
            type="text"
            name="description"
            id="habitDescription"
            placeholder="(Optional) Enter a description..."
            value={newHabitDescription}
            className={newHabitInputClass}
            onChange={handleNewDescriptionChange}
            maxLength={40}
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
