import { authInstance } from ".";

const API = authInstance();

// 공지사항 작성
export async function CreateNotice(title, content) {
  try {
    const res = await API.post('/notice', {
      title: title,
      content: content,
    });
    console.log(res)
  } catch (error) {
    console.log(error);
  }
};