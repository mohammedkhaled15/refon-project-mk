import axios from "axios";

const BASE_URL = "https://apis.refon-loyalty.com/api";
const DB_API_URL = "http://localhost:5000/api";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const privateRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const publicDbApiRequest = axios.create({
  baseURL: DB_API_URL,
  withCredentials: true,
});

export const privateDbApiRequest = axios.create({
  baseURL: DB_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
