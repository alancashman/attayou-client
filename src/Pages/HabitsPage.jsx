import Habits from "../Components/Habits/Habits";
import Nav from "../Components/Nav/Nav";
import Orb from "../Components/Orb/Orb";
import "./HabitsPage.scss";

export default function HabitsPage({
  habits,
  setHabits,
  active,
  setActive,
  dates,
  setDates,

}) {
  return (
    <main className="habits">
      {/* <Orb /> */}
      <Nav active={active} setActive={setActive} />

      <Habits
        setDates={setDates}
        dates={dates}
        habits={habits}
        setHabits={setHabits}

      />
    </main>
  );
}
