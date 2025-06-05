import NavBar from "../components/NavBar";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={styles.container}>
      <NavBar />

      <div className={styles.textBox}>
        <p className={styles.mainTopic}>Collect. Reflect. Grow.</p>
        <p className={styles.subTopic}>
          A simple way to gather and learn from feedback — personal, team, or
          product.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
