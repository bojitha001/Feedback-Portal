import React, { useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import styles from "./SubmitFeedback.module.css";
export default function SubmitFeedback() {
  const [formData, setFormData] = useState({
    message: "",
  });

  const addFeeddBack = async (feedBacks) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/feedback",
        feedBacks,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { feedback } = response.data;
      console.log(feedback);
    } catch (error) {
      console.log("Error while submitting data");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    addFeeddBack({
      message: formData.message,
    });
    setFormData({...formData,message:""})
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="feedback" className={styles.label}>
            Submit your Feedback
          </label>
          <input
            id="feedback"
            type="text"
            className={styles.input}
            value={formData.message}
            onChange={(event) =>
              setFormData({ ...formData, message: event.target.value })
            }
            placeholder="Type your feedback here..."
            required
          />
          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
