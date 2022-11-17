export const createRandomUsername = (email: String) => {
  const username = email.split('@')[0];
  const randomNumber = Math.floor(Math.random() * 1000 + 1);

  return username + randomNumber;
};
