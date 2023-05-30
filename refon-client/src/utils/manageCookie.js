export const setCookies = (name, payload, expiryDate) => {
  const newDate = new Date();
  newDate.setTime(newDate.getTime() + expiryDate);
  document.cookie = `${name}=${payload}; expires=${newDate.toUTCString()}; httpOnly: true`;
};

export const getCookies = (name) => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
};

export default setCookies;
