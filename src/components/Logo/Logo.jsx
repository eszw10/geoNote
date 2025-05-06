import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/" className={styles.logoLink}>
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
      <p className={styles.logoText}>GeoNote</p>
    </Link>
  );
}

export default Logo;
