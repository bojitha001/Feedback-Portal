import { NavLink } from "react-router-dom";
import styles from "../components/NavBar.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

function NavBar() {
  const [isLoggedIn, setIsLoogedIn] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setIsLoogedIn(true);

    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        if (response.data && response.data.user) {
          setisAdmin(response.data.user.isAdmin);
        }
        // console.log(isAdmin)
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <NavLink to="/my-feedback">See Feedbacks</NavLink>
            </li>
            <li>
              <NavLink to="/submit">Submit Feedback</NavLink>
            </li>
            {isAdmin && (
              <>
                <li>
                  <NavLink to="/admin">DashBoard</NavLink>
                </li>
              </>
            )}
            <li>
              <button className={styles.logout}
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
              >
                Logout
              </button>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li >
              <NavLink to="/login">Login</NavLink>
            </li>
            <li >
              <NavLink className={styles.signUp} to="/register">Signup</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
