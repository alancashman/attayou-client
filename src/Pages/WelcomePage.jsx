import "./WelcomePage.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function WelcomePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameClass, setUsernameClass] = useState(
    "welcome__input welcome__user-input"
  );
  const [passwordClass, setPasswordClass] = useState(
    "welcome__input welcome__user-input"
  );
  const [usernamePlaceholder, setUsernamePlaceholder] = useState("Username");
  const [passwordPlaceholder, setPasswordPlaceholder] = useState("Password");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (username !== "Alan") {
      setUsernameClass(
        "welcome__input welcome__user-input welcome__user-input--invalid"
      );
      setUsernamePlaceholder(`We couldn't find that user`);
      return;
    } else if (password === "") {
      setPasswordClass(
        "welcome__input welcome__user-input welcome__user-input--invalid"
      );
      setPasswordPlaceholder("Please input a password");
      return;
    }
    navigate("/habits");
  }

  function handleUserChange(e) {
    setUsername(e.target.value);
    setUsernameClass("welcome__input welcome__user-input");
    setUsernamePlaceholder("Username");
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setPasswordClass("welcome__input welcome__user-input");
    setPasswordPlaceholder("Password");
  }

  //   function handle
  return (
    <main className="welcome">
      <h1 className="welcome__heading">Attayou</h1>
      <div className="welcome__login">
        <form action="/" onSubmit={handleSubmit} className="welcome__form">
          <h3 className="welcome__subheading">Welcome! Please log in...</h3>
          <input
            type="text"
            placeholder="Username"
            name="user"
            className={usernameClass}
            onChange={handleUserChange}
          />
          <label htmlFor="user" className="welcome__label">
            {usernamePlaceholder}
          </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            className={passwordClass}
            onChange={handlePasswordChange}
          />
          <label htmlFor="password" className="welcome__label">
            {passwordPlaceholder}
          </label>
          <button className="welcome__button">Login</button>
        </form>
      </div>
    </main>
  );
}
