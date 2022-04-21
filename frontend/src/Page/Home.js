import './Home.css';

export default function Home() {

  return (
    <div>
      <header style={{
        backgroundImage: `url("/image/banner.jpg")`,
      }}>
      </header>
      <main className="home-main">
        <p className="pjtIntro">우리는 싸피에서 "함께" 성장합니다. 하지만, 펜더믹 사태가 장기화되면서 대면수업의 가능성은 멀어지고, 아쉬움이 점점 커져만 가고 있습니다. 싸피스쿨은 이러한 아쉬움을 해결하고자, 실제 캠퍼스와 유사한 가상환경 속에서 캠퍼스를 간접적으로 체험하고, 타 교육생들과 자유롭게 만나고 소통할 수 있는 환경을 제공합니다.</p>
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