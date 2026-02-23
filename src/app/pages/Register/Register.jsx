import "@style/theme.css";
import "./Register.css";
import { registerUser } from "@core/modules/auth/api.auth";
import { API } from "@core/network/supabase/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { Link } from "react-router";
import { Box } from "lucide-react";
import ErrorMessage from "@design/Alert/ErrorMessage";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password requires at least 6 characters").required("Password is required"),
});

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    mutate: createUser,
    error: createUserError,
    isPending,
  } = useMutation({
    mutationFn: async (data) => {
      const { email, password } = data;
      const res = await registerUser(data);

      if (!res.session) {
        const { data, error } = await API.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        return data;
      }

      return res;
    },
  });

  const handleRegister = (data) => {
    createUser(data);
  };

  return (
    <div className="register">
      {/* Left panel — form */}
      <div className="register__panel register__panel--left">
        <div className="register__form-wrapper">
          <Link to="/" className="register__brand">
            <Box className="register__brand-icon" />
            <span className="register__brand-name">RoomCraft</span>
          </Link>

          <div className="register__header">
            <h2 className="register__title">Create Account</h2>
            <p className="register__subtitle">Start designing your dream space today</p>
          </div>

          {!!createUserError && <ErrorMessage error={createUserError} />}

          <form className="register__form" onSubmit={handleSubmit(handleRegister)}>
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

            <button className="register__submit" type="submit" disabled={!isValid || isPending}>
              {isPending ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="register__footer">
            Already have an account?{" "}
            <Link to="/login" className="register__footer-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right panel — decorative */}
      <div className="register__panel register__panel--right">
        <div className="register__panel-content">
          <h1 className="register__panel-title">Start Creating</h1>
          <p className="register__panel-subtitle">
            Design beautiful rooms with our intuitive 3D configurator. No experience needed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
