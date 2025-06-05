import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import styles from "./FeedBack.module.css"
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
    <div className={styles.container}>
      <div className={styles.feedBackContainer}>
      <h2 className={styles.title}>My Feedbacks</h2>
      <div className={styles.feedbackList}>
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className={styles.feedbackItem}>
            <p>{feedback.message}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  </div>;
} 