import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";

//checking response from back end
function App() {
  useEffect(() => {
    fetch("/api/users/log-in", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email: "aree@ross.com", password: "password123" }),
    })
      .then((res) => res.json())
      .then((result) => console.log("im the result", result));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p></p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
