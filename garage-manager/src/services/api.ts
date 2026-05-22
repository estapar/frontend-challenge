import axios from "axios";

const api = axios.create({
  baseURL: "https://mock.apidog.com/m1/1022746-1009361-default",
});

export const { get, post, put, delete: destroy } = api;
