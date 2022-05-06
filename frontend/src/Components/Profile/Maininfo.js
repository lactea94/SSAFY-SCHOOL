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
          <div className='available-mileage-title'>사용 가능 마일리지</div>
          <div className='mileage-number'>{user.remainMileage.toLocaleString("ko-KR")}M</div>
        </div>
        <div className='accumulated-mileage'>
          <div className='accumulated-mileage-title'>누적 마일리지</div>
          <div className='mileage-number'>{user.totalMileage.toLocaleString("ko-KR")}M</div>
        </div>
        <div className='used-mileage'>
          <div className='used-mileage-title'>사용 마일리지</div>
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
