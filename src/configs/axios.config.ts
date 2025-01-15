import axios, { AxiosInstance } from "axios";


const axiosStage = ` http://localhost:8080`;


export const appInstance: AxiosInstance = axios.create({
  baseURL: axiosStage,
  timeout: 65000,
  headers: {
    "Content-Type": "application/json",
  },
});
