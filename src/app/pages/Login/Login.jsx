import React from "react";

const Login = () => {
  return (
    <div className="home-container">
      <form className="login-card">
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
    </div>
  );
};

export default Login;
