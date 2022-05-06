import { apiInstance } from ".";
import CheckEmailForm from "../Utils/CheckEmailForm";

const userAPI = apiInstance();

// 아이디 중복 체크
export async function duplicateId(userId, Toast, setCheckId) {
  if (!userId) {
    Toast.fire({
      icon: "question",
      title: "아이디를 입력하세요."
    });
    return
  };
  try {
    await userAPI.post('users/check/id', { id: userId});
    setCheckId(true);
    Toast.fire({
      icon: "success",
      title: "사용 가능한 아이디 입니다."
    });
  } catch (error) {
    if (error.response.status === 409) {
      Toast.fire({
        icon: "error",
        title: "이미 존재하는 아이디 입니다."
      });
      return
    }
  };
};

// 닉네임 중복 체크
export async function duplicateNickname(nickname, Toast, setCheckNickname) {
  if (!nickname) {
    Toast.fire({
      icon: "question",
      title: "닉네임을 입력하세요."
    });
    return
  };
  try {
    await userAPI.post('users/check/nickname', { nickname: nickname});
    setCheckNickname(true);
    Toast.fire({
      icon: "success",
      title: "사용 가능한 닉네임 입니다."
    });
  } catch (error) {
    if (error.response.status === 409) {
      Toast.fire({
        icon: "error",
        title: "이미 존재하는 닉네임 입니다."
      });
    }
  };
}

// 이메일 중복 체크
export async function duplicateEmail(email, Toast, setCheckEmail) {
  if (!email) {
    Toast.fire({
      icon: "question",
      title: "이메일을 입력하세요."
    });
    return
  };

  if (!CheckEmailForm(email)) {
    Toast.fire({
      icon: "error",
      title: "올바른 이메일 형식을 입력하세요."
    });
    return
  };

  try {
    await userAPI.post('users/check/email', { email: email});
    setCheckEmail(true);
    Toast.fire({
      icon: "success",
      title: "사용 가능한 이메일 입니다."
    });
  } catch (error) {
    if (error.response.status === 409) {
      Toast.fire({
        icon: "error",
        title: "이미 존재하는 이메일 입니다."
      });
    }
  };
};