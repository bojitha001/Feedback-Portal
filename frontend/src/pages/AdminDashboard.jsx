import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import styles from "./Dashboard.module.css";
export default function AdminDashboard() {
  const [feedBacks, setFeedBacks] = useState([]);
  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    async function fetchFeedBacks() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3001/admin/feedback",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setFeedBacks(response.data.feedbacks);
      } catch (error) {
        console.log(error, "Error while fetching feedbacks");
      }
    }
    fetchFeedBacks();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Call your backend API to delete the feedback
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:3001/feedback", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { id },
      });

      setFeedBacks((prev) => prev.filter((fb) => fb.id !== id));
    } catch (error) {
      console.error("Failed to delete feedback:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <h2 className={styles.title}>See User Feedbacks</h2>
        <div className={styles.feedbackList}>
          {feedBacks.map((feedBack) => (
            <div key={feedBack.id} className={styles.feedbackCard}>
              <p className={styles.message}>“{feedBack.message}”</p>
              <p className={styles.email}>— {feedBack.user.email}</p>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(feedBack.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
