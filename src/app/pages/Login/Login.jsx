import "./Login.css";
import useAuth from "@functional/auth/useAuth";
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const isPending = false;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value, onBlur } }) => (
            <label>
              Email
              <input
                type="email"
                name="email"
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                disabled={isPending}
                placeholder="john@doe.com"
                error={errors.email?.message}
                required
              />
            </label>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value, onBlur } }) => (
            <label>
              Password
              <input
                type="password"
                name="password"
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                placeholder="password"
                disabled={isPending}
                error={errors.password?.message}
                required
              />
            </label>
          )}
        />

        <button type="submit" className="login-button" onClick={handleSubmit(handleLogin)} disabled={isPending}>
          Login
        </button>

        <p className="signup-text">
          No account yet?{" "}
          <a href="/register" disabled={isPending}>
            Sign up here!
          </a>
        </p>
        <div className="guest">Continue as guest</div>
      </form>
      <button onClick={handleLogin}>Login again</button>
    </div>
  );
};

export default Login;
