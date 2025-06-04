import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

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
      console.error(
        "Feedback submission failed:",
        error.response?.data || error.message
      );
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
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          required
          onChange={(event) =>
            setFormData({ ...formData, email: event.target.value })
          }
        />
        <label>Password</label>
        <input
          type="text"
          required
          onChange={(event) =>
            setFormData({ ...formData, password: event.target.value })
          }
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
