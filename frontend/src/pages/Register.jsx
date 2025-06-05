import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./Login.module.css";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const addUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/signup",
        userData
      );

      const { user, token } = response.data;

      localStorage.setItem("token", token);
      console.log(user);
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Something went wrong";
      setError(errorMessage);
      console.error("Signup failed:", errorMessage);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    addUser({
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
          type="email"
          required
          onChange={(event) =>
            setFormData({ ...formData, email: event.target.value })
          }
        />
        <p>{error && <p className={styles.error}>{error}</p>}</p>
        <label>Password</label>
        <input
          type="password"
          required
          onChange={(event) =>
            setFormData({ ...formData, password: event.target.value })
          }
        />
        <button className={styles.button} type="submit">
          Submit
        </button>
        <div className={styles.toSignUp}>
          <p className={styles.toSignUp}>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{
                color: "#1b1b1b",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Log In
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
