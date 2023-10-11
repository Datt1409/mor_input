export const isValidEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

// export const isValidNumber = (number) => {
//   const numberRegex =
//     /^[-+]?(\d+(\.\d*)?|\.\d+|(\d+)?e\d+(\.\d*)?|\d+(\.\d*)?e\d+)$/;
//   return numberRegex.test(number);
// };
