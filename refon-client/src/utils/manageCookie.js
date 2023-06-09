export const setCookies = (name, payload, expiryDate) => {
  const newDate = new Date();
  newDate.setTime(newDate.getTime() + expiryDate);
  document.cookie = `${name}=${payload}; expires=${newDate.toUTCString()};  secure`;
};

export const getCookies = (name) => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
};
