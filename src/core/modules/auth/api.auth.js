import { API } from "@core/network/supabase/api";

export const registerUser = (user) => {
  const { email, password, ...rest } = user;
  return API.auth.signUp({
    email,
    password,
    options: {
      data: {
        ...rest,
      },
    },
  });
};
