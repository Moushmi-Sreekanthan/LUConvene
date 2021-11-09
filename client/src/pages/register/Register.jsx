import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./register.css";
import { useHistory } from "react-router";
import Select from 'react-select'

const options = [
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
  { value: 'Chemical Engineering', label: 'Chemical Engineering' }
]

export default function Register() {
  const [selectedOption, setSelectedOption] = useState('');


  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        department: selectedOption.value,
        password: password.current.value,
      };
      console.log(user);
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChange = (selectedOption) =>{
    setSelectedOption(selectedOption)
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">LUConvene</h3>
          <span className="loginDesc">
          Connect with your friends and students of Lamar University.
          </span>
        </div>
        <div className="loginRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <Select 
            options={options} 
            value={selectedOption}
            onChange={handleChange}/>

            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link className="loginRegisterButtonLink"
        to={`/login`}
        >
            <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
