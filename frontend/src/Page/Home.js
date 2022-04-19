import './Home.css';

export default function Home() {

  return (
    <div>
      <header style={{
        backgroundImage: `url("/image/banner.jpg")`,
      }}>
      </header>
      <main>
        <button>다운로드</button>
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