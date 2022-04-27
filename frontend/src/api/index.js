import axios from "axios";

const API_BASE_URL = "https://k6c202.p.ssafy.io/api/v1";

export function userInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    Headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
  return instance
}