import React from "react";
import UserBook from "./UserBook.js";
import { useState, useEffect } from "react";
import { CardColumns } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { getBookByUserId } from "../modules/bookManager.js";

const UserBookList = () => {
  const [userBooks, setUserBooks] = useState([]);
  const { id } = useParams();

  const getUserBooks = () => {
    getBookByUserId(id).then((l) => setUserBooks(l));
  };

  useEffect(() => {
    getUserBooks();
  }, [id]);

  return (
    <div>
      <Link to="/books">All Books List</Link>
        
      <CardColumns>
      {userBooks.length === 0
        ? `There are no Books on Your List.`
        : userBooks.map((book) => <UserBook userBook={book} key={`userBook--${book.userProfileId}`} />)}
      </CardColumns>
    </div>
  );
};
export default UserBookList;