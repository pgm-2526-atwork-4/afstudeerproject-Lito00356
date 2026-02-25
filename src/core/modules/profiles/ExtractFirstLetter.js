export const ExtractFirstLetter = (user) => {
  const { email } = user;
  const toCapital = email[0].toUpperCase();
  return toCapital;
};
