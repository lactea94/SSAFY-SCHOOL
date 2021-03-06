import { authInstance } from ".";

const API = authInstance();

// 게시글 수정
export async function UpdateCommunity(communityId, title, content, isNotice) {
  try {
    await API.put(`/admin/community/${communityId}`, {
      title: title,
      content: content,
      isNotice: isNotice,
    });
  } catch (error) {
    console.log(error);
  }
};

// 게시글 삭제
export async function DeleteCommunity(communityId) {
  try {
    await API.delete(`/admin/community/${communityId}`)
  } catch (error) {
    console.log(error);
  }
};

// 댓글 삭제
export async function DeleteComment(communityId, commentId) {
  try {
    await API.delete(`/admin/community/${communityId}/comment/${commentId}`)
  } catch (error) {
    console.log(error);
  }
};