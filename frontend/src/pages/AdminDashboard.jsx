import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
export default function AdminDashboard() {
  const [feedBacks, setFeedBacks] = useState([]);

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
        console.log(response.data)
        setFeedBacks(response.data.feedbacks)
      } catch (error) {
        console.log(error, "Error while fetching feedbacks");
      }
    }
    fetchFeedBacks()
  }, []);
  return <div>
    <NavBar/>
    {feedBacks.map((feedBack) => (
      <div key={feedBack.id}>
      <p>{feedBack.message}</p>
      <p>{feedBack.user.email}</p>
      </div>
    ))}
  </div>;
}
