import { registerUser } from "@core/modules/auth/api.auth";

const Register = () => {
  const handleRegister = () => {
    registerUser({
      email: "pizza@gmail.com",
      password: "test1234",
    }).then(() => {});
  };

  return (
    <>
      <h1>Register</h1>
      <button type="button" onClick={handleRegister}>
        Register
      </button>
    </>
  );
};

export default Register;
