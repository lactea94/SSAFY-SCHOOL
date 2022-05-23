import { useState, useEffect } from 'react';
import holidays from './holidays';

export default function Grass({ checkInList, checkOutList }) {
  const [ th, setTh ] = useState(null);
  const [ grassdata, setGrassdata ] = useState([]);
  const [ start, setStart ] = useState(null);
  const [ indata, setIndata ] = useState(null);
  const [ outdata, setOutdata ] = useState(null);
  const [ scroll, setScroll ] = useState(false);

  useEffect(()=>{
    //입퇴실 정보 받아오기
    setIndata(checkInList);
    setOutdata(checkOutList);
  },[checkInList, checkOutList])

  useEffect(()=>{
    if(indata !== null && outdata !== null){
      //기수정보받아오기 - 상위 Profile컴포넌트에 있는 학번 앞 2개 Number형 변환 후 전달
      setTh(6)
    }
  },[indata,outdata])

  useEffect(()=>{
    if(th !== null){
      //6기 2021년 7월스타트 기준
      let startyear = 2021;
      let startmonth = null;
      if(th % 2 === 0){
        //짝수기수일경우 ex)8기 => 2022년 스타트 and 무조건 7월 스타트
        startyear += parseInt((th - 6) / 2);
        startmonth = 7;
      }else{
        //홀수기수일경우 ex)9기 => 2023년 스타트 and 무조건 12월 스타트
        startyear += parseInt((th - 6 + 1) / 2);
        startmonth = 12;
      }
      let newStart = [startyear,startmonth];
      setStart(newStart);
    }
  },[th])

  useEffect(()=>{
    if(start !== null){
      //빈 잔디 생성. startyear, startmonth 참조해서 잔디 총 12개월 생성
      let amount = 0
      //현재달로부터 총12개월간 fullday 계산(윤달,윤년 계산됨.)
      for (let i = 0; i < 12; i++) {
        if(start[1] + i > 12){
          let fullday = new Date(start[0] + 1, start[1] - 12 + i, 0)
          amount += fullday.getDate()
        }else{
          let fullday = new Date(start[0], start[1] + i, 0)
          amount += fullday.getDate()
        }
      }
      //계산된 총 amountday로 빈 잔디 생성 default-value => 000 (비트연산 or 활용하려고).
      let newGrassdata = Array.from({ length:amount }, () => { return 0b000 })
      let startdate = new Date(`${start[0]}-${start[1]}-1`).getTime()

      //입실데이터 for문 => 빈잔디 해당일자에 0b001 or 연산
      for(let i in indata){
        let idx = Math.floor(
          (new Date(indata[i]).getTime() - startdate) / (1000 * 3600 * 24)
        )
        newGrassdata[idx] = newGrassdata[idx] | 0b001
      }
      
      //퇴실데이터 for문 => 빈잔디 해당일자에 0b010 or 연산
      for(let i in outdata){
        let idx = Math.floor(
          (new Date(outdata[i]).getTime() - startdate) / (1000 * 3600 * 24)
        )
        newGrassdata[idx] = newGrassdata[idx] | 0b010
      }

      //공휴일색
      for (let i = 0; i < 12; i++) {
        if(start[1] + i > 12){
          let days = holidays[start[0] + 1][start[1] - 12 + i]
          for(var j in days){
            let idx = Math.floor(
              (new Date(`${start[0] + 1}-${start[1] - 12 + i}-${days[j]}`).getTime() - startdate) / (1000 * 3600 * 24)
            )
            newGrassdata[idx] = newGrassdata[idx] | 0b100
          }
        }else{
          let days = holidays[start[0]][start[1] + i]
          for(let j in days){
            let idx = Math.floor(
              (new Date(`${start[0]}-${start[1] + i}-${days[j]}`).getTime() - startdate) / (1000 * 3600 * 24)
            )
            newGrassdata[idx] = newGrassdata[idx] | 0b100
          }
        }
      }
      setGrassdata(newGrassdata)
    }
  },[indata, outdata, start])

  useEffect(()=>{
    //grassdata길이가 0이 아닐때 즉 있을때
    if(grassdata.length!==0){
      //잔디가 들어갈 컨테이너 선택
      let container = document.querySelector('.grass-container');
      //스타트 날짜 요일 고려(잔디 시작 위치 때문.)
      //그걸 cnt로 해서 일요일(0)이면 0*(10px) 이런식으로 absolute포지션 잡을꺼임.
      let cnt = new Date(`${start[0]}-${start[1]}-1`).getDay()

      //left-absolute-position-stack
      let leftposition = 0

      let startdate = new Date(`${start[0]}-${start[1]}-1`).getTime()
      let nowdate = new Date().getTime()
      let breakidx = Math.floor(
        (nowdate - startdate) / (1000 * 3600 * 24)
        )
      const todayInfo = new Date();
      const today = {
        year: todayInfo.getFullYear(), 
        month: todayInfo.getMonth() + 1, 
        date: todayInfo.getDate()
      }
      const monthStartIdx = breakidx - today.date + 1
      const monthEndIdx = monthStartIdx + (new Date(today.year, today.month, 0)).getDate() - 1
      //잔디 포문으로 생성
      for(var i in grassdata){
        //토요일 넘어가면 일요일로 초기화
        if(cnt===7){
          cnt = 0
          leftposition += 22
        }
        let grass = document.createElement("div");
        grass.id=i
        grass.style.cssText = `
          position:absolute;
          width:19px; 
          height:19px;
          background:#f3f3f3;
          border-radius:30%;
          margin:1px;
          left:${leftposition + 5}px;
          top:${(cnt * 22) + 5}px;
        `
        if(i >= monthStartIdx && i <= monthEndIdx) {
          grass.style.backgroundColor='#dddfe0'
          if (i === breakidx){
            // let blinkEffect = `
            //   border: 2px solid tomato;
            //   left:${leftposition + 3}px;
            //   top:${(cnt*22) + 3}px;
            // `
            // grass.style.animation = `${blinkEffect} 1s step-end infinite`
            grass.style.border='2px solid tomato'
            grass.style.left=`${leftposition + 3}px`
            grass.style.top=`${(cnt*22) + 3}px`
          }
  
          if (i>breakidx) {
            container.appendChild(grass)
            cnt += 1
            continue
          }
          
          if(grassdata[i] === 0b011){
            grass.style.backgroundColor='#78cb94'
          }
  
          if(grassdata[i] === 0b001){
            grass.style.backgroundColor='#febb6c'
          }
          if(grassdata[i] === 0b010){
            grass.style.backgroundColor='#febb6c'
          }
          
          if(cnt===0 || cnt===6){
            grass.style.backgroundColor='#80caff'
          }
          if(grassdata[i] >= 0b100){
            grass.style.backgroundColor='#80caff'
          }
        }else {
          if (i === breakidx){
            grass.style.backgroundColor='#dddfe0'
            grass.style.border='2px solid tomato'
            grass.style.left=`${leftposition + 3}px`
            grass.style.top=`${(cnt * 22) + 3}px`
          }
  
          if (i>breakidx) {
            container.appendChild(grass)
            cnt += 1
            continue
          }
  
          
          if(grassdata[i] === 0b011){
            grass.style.backgroundColor='#a1e4ac'
          }
          
          if(grassdata[i] === 0b001){
            grass.style.backgroundColor='#ffd29b'
          }
          if(grassdata[i] === 0b010){
            grass.style.backgroundColor='#ffd29b'
          }
          
          if(cnt === 0 || cnt === 6){
            grass.style.backgroundColor='#bfe4ff'
          }
          if(grassdata[i] >= 0b100){
            grass.style.backgroundColor='#bfe4ff'
          }
        }

        container.appendChild(grass)
        cnt += 1
      }
      setScroll(true);
    }
  },[grassdata, start])

  useEffect(() => {
    if (scroll) {
      var objDiv = document.getElementById("grass-container");
      objDiv.scrollLeft = objDiv.scrollWidth;
      setScroll(false);
    }
  }, [scroll])

  return (
    <div
      style={{ margin: "auto 0 3rem" }}
    >
      <div
        id='grass-container'
        className='grass-container'
        style={{
          width:"100%",
          height:"180px",
          border:"1px solid gray",
          overflow:"auto",
          position:'relative'
        }}
      />
    </div>
  )
}
