import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
export default function MyFeedback() {
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
  async function fetchFeedbacks() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3001/feedback", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setFeedbacks(response.data.feedbacks)
    } catch (error) {
      console.log(error, "Error while fetching feedbacks");
    }
  }

  fetchFeedbacks();
}, []);

  return <div>
    <NavBar/>
    {feedbacks.map((feedback) => (
      <p key={feedback.id}>{feedback.message}</p>
    ))}
  </div>;
} 