import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiInstance } from "../../api";
import Grass from "./Grass";
import Maininfo from "./Maininfo";

export default function ProfileInfo() {
  const { state } = useLocation();
  const [ checkInList, setCheckInList ] = useState([]);
  const [ checkOutList, setCheckOutList ] = useState([]);

  useEffect(() => {
    async function saveCheckIn() {
      const res = await apiInstance().get(`/users/indate`)
      setCheckInList(res.data.map(data => data.checkIndate))
    };
  
    async function saveCheckOut() {
      const res = await apiInstance().get(`/users/outdate`)
      setCheckOutList(res.data.map(data => data.checkOutDate))
    };

    saveCheckIn();
    saveCheckOut();
  }, [])

  return (
    <div>
      <Maininfo
        user={state.user}
        checkInList={checkInList}
        checkOutList={checkOutList}
      />
      <Grass
        checkInList={checkInList}
        checkOutList={checkOutList}
      />
    </div>
  )
}
