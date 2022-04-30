import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"

export default function EditProfile() {
  const { state } = useLocation();
  const [ user, setUser ] = useState({});

  useEffect(() => {
    setUser(state.user)
  }, [state])

  return (
    <div>{user.userId}
      <Link to="/profile" state={{user: state.user}}>뒤로</Link>
    </div>
  )
}
