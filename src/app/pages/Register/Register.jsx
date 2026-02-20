import { registerUser } from "@core/modules/auth/api.auth";
import { API } from "@core/network/supabase/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

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
    <>
      <h1>Register</h1>
      {!!createUserError && <ErrorMessage error={createUserError} />}
      <form>
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
      </form>
      <button type="button" onClick={handleSubmit(handleRegister)} disabled={!isValid || isPending}>
        Register
      </button>
    </>
  );
};

export default Register;
