import { authInstance } from ".";

const API = authInstance();

// 버그리포트 작성
export async function CreateTestBug(content) {
  try {
    await API.post('/report', { content: content });
  } catch (error) {
    console.log(error);
  }
};