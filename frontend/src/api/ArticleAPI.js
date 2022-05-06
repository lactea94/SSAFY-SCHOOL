import { authInstance } from ".";

const API = authInstance();

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
    console.log(error);
  }
};

// 게시글 삭제
export async function DeleteCommunity(communityId) {
  try {
    await API.delete(`/community/${communityId}`);
  } catch (error) {
    console.log(error);
  }
};

// 댓글 작성
export async function CreateComment(communityId, content) {
  try {
    await API.post(`/community/${communityId}/comment`, { content: content });
  } catch (error) {
    console.log(error);
  }
};

// 댓글 삭제
export async function DeleteComment(communityId, commentId) {
  try {
    await API.delete(`/community/${communityId}/comment/${commentId}`)
  } catch (error) {
    console.log(error);
  }
};