import EachMonthAttendance from "./EachMonthAttendance"
import Grass from "./Grass"
import "./css/Attendance.css"

export default function Attendance() {

  return (
    <div className="attendance">
      <EachMonthAttendance />
      <Grass />
    </div>
  )
}
