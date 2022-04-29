import React from "react";
import UserBook from "./UserBook.js";
import { useState, useEffect } from "react";
import { CardColumns } from "reactstrap";
import { Link } from "react-router-dom";
import { getBookByUserId } from "../modules/bookManager.js";

const UserBookList = () => {
  const [userBooks, setUserBooks] = useState([]);

  const getUserBooks = () => {
    getBookByUserId().then((b) => setUserBooks(b));
  };

  useEffect(() => {
    getUserBooks();
  }, []);

  return (
    <div>
      <Link to="/books">All Books List</Link>
        
      <CardColumns>
        {userBooks.length === 0
          ? `There are no Books in Your List`
          : userBooks.map((book) => <UserBook userBook={book} key={book.id}/>)}
      </CardColumns>
    </div>
  );
};
export default UserBookList;