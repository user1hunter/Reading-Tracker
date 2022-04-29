import React from "react";
import UserBook from "./UserBook.js";
import { useState, useEffect } from "react";
import { CardColumns, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { getBookByUserId } from "../modules/bookManager.js";
import { Button } from "reactstrap";

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
          : userBooks.map((book) => (
            <ListGroupItem key={`userBook--${book.id}`}><UserBook userBook={book} key={book.id} />
              <Button><Link to={`/update/${book.id}`}>Update</Link></Button>
              <Button><Link to={`/remove/${book.id}`}>Remove</Link></Button>
            </ListGroupItem>
          ))}
      </CardColumns>
    </div>
  );
};
export default UserBookList;