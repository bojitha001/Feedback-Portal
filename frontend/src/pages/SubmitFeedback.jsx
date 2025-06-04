import React, { useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
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
  };

  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit}>
        <label htmlFor="">FeedBack</label>
        <input
          type="text"
          onChange={(event) =>
            setFormData({ ...formData, message: event.target.value })
          }
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
