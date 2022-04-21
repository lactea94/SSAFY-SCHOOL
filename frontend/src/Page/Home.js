import "./Home.css";
import ssafyImg from "../asset/image/ssafy.jpg";

export default function Home() {
  return (
    <div>
      <header>
        <div>
          <h1>
            SSAFY SCHOOL
          </h1>
          <p>싸피 스쿨에서 즐거운 캠퍼스 라이프를 시작해 보세요!</p>
          <button>시작하기</button>
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
        <div className="features">
          <div>
            <img
              src="/image/metaverse.png"
              alt="metaverse"
              style={{
                width: "100%"
              }}
            />
            <h2>메타버스</h2>
            <p>메타버스로 즐기는 즐거운 싸피 생활!</p>
          </div>
          <div>
            <img
              src="/image/education.png"
              alt="education"
              style={{
                width: "100%"
              }}
            />
            <h2>원격수업</h2>
            <p>원격으로 수업을 들을 수 있어요!</p>
          </div>
          <div>
            <img
              src="/image/shopping.png"
              alt="shopping"
              style={{
                width: "100%"
              }}
            />
            <h2>마일리지</h2>
            <p>마일리지를 쌓아 나만의 캐릭터를 꾸며봐요!</p>
          </div>
        </div>
        <div className="function">
          <div>
            기능 소개
          </div>
        </div>
      </main>
    </div>
  )
};