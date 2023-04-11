import "./Nav.scss";
// import { Link } from "react-router-dom";
import avatar from "../../assets/images/avatar.jpg";
import { useNavigate } from "react-router-dom";

export default function Nav({ active, setActive }) {
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/");
  }

  return (
    <nav className="nav">
      <h1 className="nav__main-heading">Attayou</h1>
      <div className="nav__user-container">
        <img src={avatar} alt="" className="nav__avatar" />
        <div className="nav__user-details">
          <h2 className="nav__username">Alan</h2>
          <p className="nav__user-text">{new Date().toLocaleDateString()}</p>
        </div>
      </div>
      <ul className="nav__list">
        <li
          className={
            active === "Dashboard" ? "nav__link nav__link--active" : "nav__link"
          }
          onClick={() => {
            setActive(() => "Dashboard");
            navigate("/habits");
          }}
        >
          Dashboard
        </li>
        <li
          className={
            active === "Trends" ? "nav__link nav__link--active" : "nav__link"
          }
          onClick={() => {
            setActive(() => "Trends");
            navigate("/trends");
          }}
        >
          Trends
        </li>
        <li className="nav__link nav__link--logout" onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </nav>
  );
}
