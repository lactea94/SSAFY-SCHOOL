import { useEffect, useState } from "react";
import { apiInstance } from "../api";

export default function useGetList(url) {
  const [ data, setData ] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await apiInstance().get(url);
        setData(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getData();
  }, [url])
  return data
}