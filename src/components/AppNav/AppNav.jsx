import PropTypes from "prop-types";
import styles from "./AppNav.module.css";
import { NavLink } from "react-router-dom";

function AppNav() {
  return (
    <div className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
        </li>
      </ul>
    </div>
  );
}

AppNav.propTypes = {};

export default AppNav;
