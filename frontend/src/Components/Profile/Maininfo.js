import EachMonthAttendance from './EachMonthAttendance';
import './css/Maininfo.css';

export default function Maininfo({ user, checkInList, checkOutList }) {
  return (
    <div className='main-info'>
      <div className='mileage-info'>
        <div className='mileage-title'>
          나의 마일리지
        </div>
        <hr/>
        <div className='available-mileage'>
          <h5>사용 가능한 마일리지</h5>
          <div className='mileage-number'>{user.remainMileage.toLocaleString("ko-KR")}M</div>
        </div>
        <div className='accumulated-mileage'>
          <h5>누적 마일리지</h5>
          <div className='mileage-number'>{user.totalMileage.toLocaleString("ko-KR")}M</div>
        </div>
        <div className='used-mileage'>
          <h5>사용한 마일리지</h5>
          <div className='mileage-number'>{(user.totalMileage - user.remainMileage).toLocaleString("ko-KR")}M</div>
        </div>
      </div>
      <EachMonthAttendance
        checkInList={checkInList}
        checkOutList={checkOutList}
      />
    </div>
  )
};
