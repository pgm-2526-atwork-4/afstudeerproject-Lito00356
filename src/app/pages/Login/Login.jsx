import "@style/theme.css";
import "./Login.css";
import useAuth from "@functional/auth/useAuth";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router";
import { Box } from "lucide-react";
import ErrorMessage from "@design/Alert/ErrorMessage";
import useToast from "@functional/Toast/useToast";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const { mutate, error, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      addToast("Logged in successfully!", "success");
      navigate("/collection");
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleLogin = (data) => {
    mutate(data);
  };

  return (
    <div className="login">
      <div className="login__panel login__panel--left">
        <div className="login__panel-content">
          <h1 className="login__panel-title">Welcome Back</h1>
          <p className="login__panel-subtitle">
            Continue creating amazing room designs and bring your interior vision to life.
          </p>
        </div>
      </div>

      <div className="login__panel login__panel--right">
        <div className="login__form-wrapper">
          <Link to="/" className="login__brand">
            <Box className="login__brand-icon" />
            <span className="login__brand-name">RoomCraft</span>
          </Link>

          <div className="login__header">
            <h2 className="login__title">Sign In</h2>
            <p className="login__subtitle">Welcome back to your design workspace</p>
          </div>

          {!!error && <ErrorMessage error={error} />}

          <form className="login__form" onSubmit={handleSubmit(handleLogin)}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value, onBlur } }) => (
                <div className="form-field">
                  <label className="form-field__label" htmlFor="email">
                    Email
                  </label>
                  <input
                    className={`form-field__input${errors.email ? " form-field__input--error" : ""}`}
                    id="email"
                    type="email"
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    disabled={isPending}
                    placeholder="you@example.com"
                    required
                  />
                  {errors.email && <span className="form-field__error">{errors.email.message}</span>}
                </div>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value, onBlur } }) => (
                <div className="form-field">
                  <label className="form-field__label" htmlFor="password">
                    Password
                  </label>
                  <input
                    className={`form-field__input${errors.password ? " form-field__input--error" : ""}`}
                    id="password"
                    type="password"
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    placeholder="••••••••"
                    disabled={isPending}
                    required
                  />
                  {errors.password && <span className="form-field__error">{errors.password.message}</span>}
                </div>
              )}
            />

            <button className="btn btn--primary login__submit" type="submit" disabled={isPending}>
              {isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="login__footer">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="login__footer-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
