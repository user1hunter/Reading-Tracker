import React from "react";
import UserBook from "./UserBook.js";
import { useState, useEffect } from "react";
import { CardColumns, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { getBookByUserId } from "../modules/bookManager.js";
import { Button } from "reactstrap";
import "./UserBookList.css";

const UserBookList = () => {
  const [userBooks, setUserBooks] = useState([]);

  const getUserBooks = () => {
    getBookByUserId().then((b) => setUserBooks(b));
  };

  useEffect(() => {
    getUserBooks();
  }, []);

  return (
    <div style={{backgroundColor: "#0D1321"}}>
      <Link to="/books" style={{color: "#F0EBD8"}}>All Books List</Link>
        
      <CardColumns  style={{backgroundColor: "#0D1321"}, {color: "#F0EBD8"}}>
        {userBooks.length === 0
          ? `There are no Books in Your List`
          : userBooks.map((book) => (
            <ListGroupItem key={`userBook--${book.id}`} style={{backgroundColor: "#0D1321"}}><UserBook userBook={book} key={book.id} />
              <Button><Link to={`/update/${book.id}`} style={{color: "#F0EBD8"}}>Update</Link></Button>
              <Button><Link to={`/remove/${book.id}`} style={{color: "#F0EBD8"}}>Remove</Link></Button>
            </ListGroupItem>
          ))}
      </CardColumns>
    </div>
  );
};
export default UserBookList;