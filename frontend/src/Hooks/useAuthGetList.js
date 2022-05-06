import { useEffect, useState } from "react";
import { authInstance } from "../api";

export default function useAuthGetList(url) {
  const [ data, setData ] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await authInstance().get(url);
      setData(res.data)
    }
    getData();
  }, [url])
  return data
}
