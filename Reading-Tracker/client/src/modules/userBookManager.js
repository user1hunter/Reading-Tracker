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
export const addUserBook = (bookId) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/${bookId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return;
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error(
          "An unknown error occurred while trying to create a UserBook"
        );
      }
    });
  });
};
export const getUserBookByUserId = () => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/home`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(`An error occurred getting User's Books`);
      }
    });
  });
};