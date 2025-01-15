import axios, { AxiosInstance } from "axios";

// const axiosStage = `https://67862e2af80b78923aa5bd1a.mockapi.io/megabite-crm`;
const axiosStage = ` http://localhost:8080`;


export const appInstance: AxiosInstance = axios.create({
  baseURL: axiosStage,
  timeout: 65000,
  headers: {
    "Content-Type": "application/json",
  },
});
