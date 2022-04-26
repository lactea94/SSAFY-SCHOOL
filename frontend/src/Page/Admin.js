import { Admin as ReactAdmin } from "react-admin";

export default function Admin() {
  const userList = [
    {
      id: 0,
      user_id: 'ssafy1',
      nickname: '김싸피',
      name: '김싸피',
      gender: true,
      email: 'ssafy@ssafy.com'
    }
  ]
  return (
    <ReactAdmin></ReactAdmin>
  )
}
