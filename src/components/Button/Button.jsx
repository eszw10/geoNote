import styles from "./Button.module.css";
import PropTypes from "prop-types";

function Button({ children, onClick, type = "primary" }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default Button;
