import { authInstance } from ".";

const API = authInstance();

// 공지사항 작성
export async function CreateNotice(title, content) {
  try {
    await API.post('/notice', {
      title: title,
      content: content,
    });
  } catch (error) {
    console.log(error);
  }
};

// 공지사항 수정
export async function UpdateNotice(noticeId, title, content) {
  try {
    await API.put(`/notice/${noticeId}`, {
      title: title,
      content: content,
    });
  } catch (error) {
    console.log(error);
  }
};

// 공지사항 삭제
export async function DeleteNotice(noticeId) {
  try {
    await API.delete(`/notice/${noticeId}`);
  } catch (error) {
    console.log(error);
  }
};