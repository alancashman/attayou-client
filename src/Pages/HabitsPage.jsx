import Habits from "../Components/Habits/Habits";
import Nav from "../Components/Nav/Nav";
import "./HabitsPage.scss";

export default function HabitsPage() {
  return (
    <main className="habits">
      <Nav />
      <Habits />
    </main>
  );
}
