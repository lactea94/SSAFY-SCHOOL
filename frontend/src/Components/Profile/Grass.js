import React,{useState,useEffect} from 'react'

export default function Grass() {
  const [th,setTh] = useState(null);
  const [grassdata,setGrassdata] = useState([]);
  const [start,setStart] = useState(null);

  useEffect(()=>{
    //기수정보받아오기 - 상위 Profile컴포넌트에 있는 학번 앞 2개 Number형 변환 후 전달
    setTh(9);
  },[])

  useEffect(()=>{
    if(th!==null){
      //6기 2021년 7월스타트 기준
      let startyear = 2021;
      let startmonth = null;
      if(th%2==0){
        //짝수기수일경우 ex)8기 => 2022년 스타트 and 무조건 7월 스타트
        startyear += parseInt((th-6) / 2);
        startmonth = 7;
      }else{
        //홀수기수일경우 ex)9기 => 2023년 스타트 and 무조건 12월 스타트
        startyear += parseInt((th-6+1) / 2);
        startmonth = 12;
      }
      let newStart = [startyear,startmonth];
      setStart(newStart);
    }
  },[th])

  useEffect(()=>{
    if(start!==null){
      //빈 잔디 생성. startyear, startmonth 참조해서 잔디 총 12개월 생성
      let amount = 0
      //현재달로부터 총12개월간 fullday 계산(윤달,윤년 계산됨.)
      for (let i = 0; i < 12; i++) {
        if(start[1]+i>12){
          let fullday = new Date(start[0]+1,start[1]-12+i,0)
          amount += fullday.getDate()
        }else{
          let fullday = new Date(start[0],start[1]+i,0)
          amount += fullday.getDate()
        }
      }
      //계산된 총 amountday로 빈 잔디 생성.
      let newGrassdata = Array.from({length:amount},()=>{return '000'})
      setGrassdata(newGrassdata)
    }
  },[start])

  //grassdata의 배열 map함수를 활용해 잔디 생성 후 랜더링
  const grass = grassdata.map((x)=>(
    <div style={{width:"10px",height:'10px',border:'1px solid gray'}}>

    </div>
  ))

  return (
    <div>
      <div style={{display:'flex',flexWrap:'wrap'}}>
        {grass}
      </div>
    </div>
  )
}
