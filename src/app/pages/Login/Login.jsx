import "./Login.css";
import useAuth from "@functional/auth/useAuth";
import { Router, useNavigate } from "react-router";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login({
      email: "pizza@gmail.com",
      password: "test1234",
    }).then(() => navigate("/collection"));
  };

  return (
    <div className="home-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Login</h2>
        <label>
          Email
          <input type="email" name="email" required />
        </label>

        <label>
          Password
          <input type="password" name="password" required />
        </label>

        <button type="submit" className="login-button">
          Login
        </button>

        <p className="signup-text">
          No account yet? <a href="/register">Sign up here!</a>
        </p>
        <div className="guest">Continue as guest</div>
      </form>
      <button onClick={handleLogin}>Login again</button>
    </div>
  );
};

export default Login;
