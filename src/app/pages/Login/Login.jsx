import { useState } from "react";
import "./Login.css";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="home-container">
      <form className="login-card" onSubmit={onSubmit}>
        <h2>Login</h2>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
        </label>

        <button type="submit" className="login-button">
          Login
        </button>

        <p className="signup-text">
          No account yet? <a href="/register">Sign up here!</a>
        </p>
        <div className="guest">Continue as guest</div>
      </form>
    </div>
  );
};

export default Login;
