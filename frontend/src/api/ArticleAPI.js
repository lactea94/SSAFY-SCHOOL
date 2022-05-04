import { apiInstance } from ".";

const API = apiInstance();

// 게시글 작성
export async function CreateCommunity(title, content, isNotice) {
  try {
    await API.post('/community', {
      title: title,
      content: content,
      isNotice: isNotice,
    });
  } catch (error) {
    console.log(error);
  }
};

// 게시글 수정
export async function UpdateCommunity(communityId, title, content) {
  try {
    await API.put(`/community/${communityId}`, {
      title: title,
      content: content,
      isNotice: false,
    });
  } catch (error) {
    console.log(error)
  }
};

// 게시글 삭제
export async function DeleteCommunity(communityId) {
  await API.delete(`/community/${communityId}`);
};