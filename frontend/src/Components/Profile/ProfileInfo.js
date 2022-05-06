import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuthGetList from "../../Hooks/useAuthGetList";
import Grass from "./Grass";
import Maininfo from "./Maininfo";

export default function ProfileInfo() {
  const { state } = useLocation();
  const [ checkInList, setCheckInList ] = useState([]);
  const [ checkOutList, setCheckOutList ] = useState([]);

  const checkInObject = useAuthGetList('/users/indate');
  const checkOutObject = useAuthGetList('/users/outdate');

  useEffect(() => {
    setCheckInList(checkInObject.map(data => data.checkIndate))
    setCheckOutList(checkOutObject.map(data => data.checkOutDate))
  }, [checkInObject, checkOutObject])

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
