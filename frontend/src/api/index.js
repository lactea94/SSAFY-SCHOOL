import axios from "axios";

const API_BASE_URL = "https://k6c202.p.ssafy.io/api/v1";

// 권한 필요 없을 때
export function apiInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    Headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
  return instance
};

// 권한 필요할 때(token)
export function authInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Credentials": true,
      Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
    },
  })
  return instance
};