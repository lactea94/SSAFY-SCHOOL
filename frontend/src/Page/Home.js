import "./css/Home.css";
import banner from "../asset/image/banner.png";
import ssafyImg from "../asset/image/ssafy.jpg";
import metaverse_logo from "../asset/image/metaverse_logo.png";
import remote_logo from "../asset/image/remote_logo.png";
import mileage_logo from "../asset/image/mileage_logo.png";
import metaverse1 from "../asset/image/metaverse1.png";
import metaverse2 from "../asset/image/metaverse2.png";
import metaverse3 from "../asset/image/metaverse3.png";
import remote_1 from "../asset/image/remote_1.png";
import remote_2 from "../asset/image/remote_2.png";
import remote_3 from "../asset/image/remote_3.png";
import mileage_1 from "../asset/image/mileage_1.png";
import mileage_2 from "../asset/image/mileage_2.png";
import mileage_3 from "../asset/image/mileage_3.png";
import Loading from "../Components/Loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('accesstoken')) {
      setIsAuthenticated(true)
    }
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  return (
    <div>
      { loading ? (
        <Loading/>
      ) : (
        <>
          <header>
            <div>
              <h1>
                SSAFY SCHOOL
              </h1>
              <p>싸피 스쿨에서 즐거운 캠퍼스 라이프를 시작해 보세요!</p>
              {}
              { isAuthenticated ? (
                <a
                  className="download"
                  href="https://drive.google.com/file/d/1Tred4Ts8IqPuBbxbBqq78QFcp-mnK6eA/view"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  다운로드
                </a>
              ) : (
                <Link
                  to="login"
                  className="download"
                >
                  다운로드
                </Link>
              )}
            </div>
            <img
              src={banner}
              alt="banner"
            />
          </header>
          <main className="home-main">
            <div className="intro">
              <img src={ssafyImg} alt="ssafy"/>
              <div>
                <h2>우리는 싸피에서 "함께" 성장합니다.</h2>
                <p>하지만, 대면수업을 하지 못해 아쉬움만 커져가고 있습니다.</p>
                <p>SSAFY SCHOOL의 실제 캠퍼스와 유사한 가상환경 속에서</p>
                <p>캠퍼스를 체험하고 자유롭게 소통해 보세요.</p> 
              </div>
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
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                navigation
                pagination={{ clickable: true }}
                modules={[Autoplay, Pagination, Navigation]}
                className="feature-carousel"
              >
                <SwiperSlide>
                  <img className="feature-img" src={metaverse1} alt="metaverse"></img>
                </SwiperSlide>
                <SwiperSlide>
                  <img className="feature-img" src={metaverse2} alt="metaverse"></img>
                </SwiperSlide>
                <SwiperSlide>
                  <img className="feature-img" src={metaverse3} alt="metaverse"></img>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="right-feature">
              <Swiper
                spaceBetween={50}
                scrollbar={{ draggable: true }}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                navigation
                pagination={{ clickable: true }}
                modules={[Autoplay, Pagination, Navigation]}
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
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                navigation
                pagination={{ clickable: true }}
                modules={[Autoplay, Pagination, Navigation]}
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
        </>
      )}
    </div>
  )
};