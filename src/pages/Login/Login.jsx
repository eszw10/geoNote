import PropTypes from "prop-types";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import PageNav from "../../components/PageNav/PageNav";
import { useAuth } from "../../contexts/FakeAuthContext";
import { replace, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
function Login() {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          if (email && password) login(email, password);
        }}
      >
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button>Login</Button>
        </div>
      </form>
    </main>
  );
}

Login.propTypes = {};

export default Login;
