import { getToken } from "./authManager"
const _apiUrl = "/api/book"

export const getAllBooks = () => {
    return getToken().then((token) => {
      return fetch(_apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("An error occurred getting Books");
        }
      });
    });
  };

  export const getBookById = (id) => {
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
          throw new Error("An error occurred getting Book");
        }
      });
    });
  };
  export const getBookByUserId = () => {
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
  export const createBook = (book) => {
    return getToken().then((token) => {
      return fetch(_apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else if (resp.status === 401) {
          throw new Error("Unauthorized");
        } else {
          throw new Error(
            "An unknown error occurred while trying to create a Book"
          );
        }
      });
    });
  };
  export const updateBook = (book) => {
    return getToken().then((token) => {
      return fetch(`${_apiUrl}/update/${book.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else if (resp.status === 401) {
          throw new Error("Unauthorized");
        } else {
          throw new Error(
            "An unknown error occurred while trying to update Book"
          );
        }
      });
    });
  };
  export const editBook = (book) => {
    return getToken().then((token) => {
      return fetch(`${_apiUrl}/${book.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else if (resp.status === 401) {
          throw new Error("Unauthorized");
        } else {
          throw new Error(
            "An unknown error occurred while trying to edit Book"
          );
        }
      });
    });
  };
  export const deleteBook = (id) => {
    return getToken().then((token) => {
      return fetch(`${_apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        if (resp.ok) {
          return resp.ok;
        } else {
          throw new Error("An error occurred deleting Book");
        }
      });
    });
  };
  