export default function DateFormat(date) {
  const nowTime = new Date();
  const time = new Date(date);
  time.setHours(time.getHours() + 9)
  const diff = (nowTime - time) / 1000;
  if (diff < 60) {
    return (
      "방금 전"
    )
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)}분 전`
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)}시간 전`
  } else {
    return date.slice(0, 10)
  }
};
