import "./Login.css";
import useAuth from "@functional/auth/useAuth";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  const { login } = useAuth();

  const { mutate, error, isPending } = useMutation({
    mutationFn: login,
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
    <div className="home-container">
      <form className="login-card">
        <h2>Login</h2>
        {!!error && <ErrorMessage error={error} />}
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
    </div>
  );
};

export default Login;
