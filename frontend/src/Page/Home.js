import "./css/Home.css";
import ssafyImg from "../asset/image/ssafy.jpg";
import metaverse_logo from "../asset/image/metaverse_logo.png";
import remote_logo from "../asset/image/remote_logo.png";
import mileage_logo from "../asset/image/mileage_logo.png";
import metaverse_1 from "../asset/image/metaverse_1.png";
import metaverse_2 from "../asset/image/metaverse_2.png";
import metaverse_3 from "../asset/image/metaverse_3.png";
import remote_1 from "../asset/image/remote_1.png";
import remote_2 from "../asset/image/remote_2.png";
import remote_3 from "../asset/image/remote_3.png";
import mileage_1 from "../asset/image/mileage_1.png";
import mileage_2 from "../asset/image/mileage_2.png";
import mileage_3 from "../asset/image/mileage_3.png";
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
  SwiperCore.use([Navigation, Pagination]);
  return (
    <div>
      <header>
        <div>
          <h1>
            SSAFY SCHOOL
          </h1>
          <p>싸피 스쿨에서 즐거운 캠퍼스 라이프를 시작해 보세요!</p>
          {/* <div className="download"> */}
            <a
              className="download"
              href="/"
              target="_blank"
              rel="noopener noreferrer"
            >
              다운로드
            </a>
          {/* </div> */}
        </div>
        {/* 캐러셀이나 동영상 */}
        <img
          src="/image/banner.jpg"
          alt="banner"
          />
      </header>
      <main className="home-main">
        <div className="intro">
          <div>
            <h2>우리는 싸피에서 "함께" 성장합니다.</h2>
            <p>하지만, 대면수업을 하지 못해 아쉬움만 커져가고 있습니다.</p>
            <p>SSAFY SCHOOL의 실제 캠퍼스와 유사한 가상환경 속에서</p>
            <p>캠퍼스를 체험하고 자유롭게 소통해 보세요.</p> 
          </div>
          <img src={ssafyImg} alt="ssafy"/>
        </div>
        <div className="left-feature">
          <div className="feature-card">
            <img
              src={metaverse_logo}
              alt="metaverse_logo"
              />
            <h2>메타버스</h2>
            <p>메타버스로 즐기는 즐거운 싸피 생활!</p>
          </div>
          <Swiper
            spaceBetween={50}
            scrollbar={{ draggable: true }}
            navigation
            pagination={{ clickable: true }}
            className="feature-carousel"
          >
            <SwiperSlide>
              <img className="feature-img" src={metaverse_1} alt="metaverse"></img>
            </SwiperSlide>
            <SwiperSlide>
              <img className="feature-img" src={metaverse_2} alt="metaverse"></img>
            </SwiperSlide>
            <SwiperSlide>
              <img className="feature-img" src={metaverse_3} alt="metaverse"></img>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="right-feature">
          <Swiper
            spaceBetween={50}
            scrollbar={{ draggable: true }}
            navigation
            pagination={{ clickable: true }}
            className="feature-carousel"
          >
            <SwiperSlide>
              <img className="feature-img" src={remote_1} alt="remote_1"></img>
            </SwiperSlide>
            <SwiperSlide>
              <img className="feature-img" src={remote_2} alt="remote_2"></img>
            </SwiperSlide>
            <SwiperSlide>
              <img className="feature-img" src={remote_3} alt="remote_3"></img>
            </SwiperSlide>
          </Swiper>
          <div className="feature-card">
            <img
              src={remote_logo}
              alt="remote_logo"
            />
            <h2>원격수업</h2>
            <p>원격으로 수업을 들을 수 있어요!</p>
          </div>
        </div>
        <div className="left-feature">
          <div className="feature-card">
            <img
              src={mileage_logo}
              alt="mileage_logo"
            />
            <h2>마일리지</h2>
            <p>마일리지를 쌓아 나만의 캐릭터를 꾸며봐요!</p>
          </div>
          <Swiper
            spaceBetween={50}
            scrollbar={{ draggable: true }}
            navigation
            pagination={{ clickable: true }}
            className="feature-carousel"
          >
            <SwiperSlide>
              <img className="feature-img" src={mileage_1} alt="mileage_1"></img>
            </SwiperSlide>
            <SwiperSlide>
              <img className="feature-img" src={mileage_2} alt="mileage_2"></img>
            </SwiperSlide>
            <SwiperSlide>
              <img className="feature-img" src={mileage_3} alt="mileage_3"></img>
            </SwiperSlide>
          </Swiper>
        </div>
      </main>
    </div>
  )
};