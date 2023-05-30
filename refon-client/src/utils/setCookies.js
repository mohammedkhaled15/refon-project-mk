export const setCookies = (payload, expiryDate) => {
  const newDate = new Date();
  newDate.setTime(newDate.getTime() + expiryDate);
  document.cookie = `serverAccessToken=${payload}; expires=${newDate.toUTCString()}; httpOnly: true`;
};

export default setCookies;
