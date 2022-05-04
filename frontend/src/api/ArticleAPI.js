import { apiInstance } from ".";

const API = apiInstance();

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