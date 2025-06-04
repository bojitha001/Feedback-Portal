import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./Login.module.css";
export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        userData
      );

      const { user, token } = response.data;
      localStorage.setItem("token", token);
      console.log(user);
      navigate("/");
    } catch (error) {
      console.error(
        "Feedback submission failed:",
        error.response?.data || error.message
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    loginUser({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className={styles.main}>
      {/* <NavBar/> */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formText}>
          <p className={styles.formTextTopic}>Create an account</p>
          <p className={styles.formTextDes}>
            Please enter your details to create an account
          </p>
        </div>
        <label>Email</label>
        <input
          type="text"
          required
          placeholder="Enter your full name"
          onChange={(event) =>
            setFormData({ ...formData, email: event.target.value })
          }
        />
        <label>Password</label>
        <input
          type="text"
          required
          placeholder="Enter your email"
          onChange={(event) =>
            setFormData({ ...formData, password: event.target.value })
          }
        />
        <button className={styles.button} type="submit">
          Submit
        </button>
        <div className={styles.toSignUp}>
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              style={{ color: "#1b1b1b", cursor: "pointer", textDecoration: "underline"}}
            >
              Sign up
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
