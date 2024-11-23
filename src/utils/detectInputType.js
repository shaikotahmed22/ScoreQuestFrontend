export const detectInputType = (input) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^(?:\+?88)?01[3-9]\d{8}$/; // Adjust this pattern based on your phone number format

  if (phonePattern.test(input)) {
    return "phone";
  } else if (emailPattern.test(input)) {
    return "email";
  } else {
    return "invalid";
  }
};
