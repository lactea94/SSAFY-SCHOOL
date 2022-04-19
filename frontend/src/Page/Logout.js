import { useEffect } from "react";
import {useNavigate} from "react-router-dom"

export default function Logout() {
  const router = useNavigate();
  useEffect(() => {

    // 로그아웃 로직 추가 예정

    router("/");
  }, [])
  return null;
}