import { useEffect, useState } from "react"
import { apiInstance } from "../api"

export default function useGetObject(url) {
  const [ data, setData ] = useState({})

  useEffect(() => {
    async function getData() {
      const res = await apiInstance().get(url);
      setData(res.data)
    }
    getData();
  }, [url])
  return data
}
