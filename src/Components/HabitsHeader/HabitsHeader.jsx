import "./HabitsHeader.scss";

export default function HabitsHeader({ date }) {
  return (
    <div className="habits__header">
      <h3 className="habits__heading">Habit</h3>
      <h3 className="habits__heading">{date.toLocaleDateString("en-us")}</h3>
    </div>
  );
}