import { getToken } from "./authManager"
const _apiUrl = "/api/userBook"

export const getUserBookByBookId = (id) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(`An error occurred getting User's Book`);
      }
    });
  });
};