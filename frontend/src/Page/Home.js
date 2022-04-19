export default function Home() {

  const headerStyle = {
    margin: 0,
    padding: "10rem",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  }

  const mainStyle = {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    padding: "4rem",
  }

  const articleStyle1 = {
    margin: "1rem 0",
    padding: "1rem",
    border: "1px solid black",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  }

  const articleStyle2 = {
    margin: "1rem 0",
    padding: "1rem",
    border: "1px solid black",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
  }

  const articleStyle3 = {
    margin: "1rem 0",
    padding: "1rem",
    border: "1px solid black",
    display: "grid",
  }

  const itemStyle = {
    padding: "1rem",
    border: "1px solid black",
    display: "grid",
  }

  return (
    <div>
      <header style={headerStyle}>
        <h1>
          SSAFY SCHOOL
        </h1>
        <h4>
          메타버스에서 만나는 광주 캠퍼스
        </h4>
      </header>
      <main style={mainStyle}>
        <div style={articleStyle1}>
          <div class="item">
            SSAFY 광주 캠퍼스에 방문해 보지 못한 여러분들을 위해
          </div>
        </div>
        <div style={articleStyle2}>
          <div style={itemStyle}>
            <img
              src="/image/metaverse.png"
              alt="metaverse_img"
              style={{
                width: "100%"
              }}
            />
          </div>
        </div>
        <div style={articleStyle3}>
          <div class="item">
            기능 소개
          </div>
        </div>
      </main>
    </div>
  )
};