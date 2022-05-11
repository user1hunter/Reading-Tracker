import React from "react";
import Book from "./Book.js";
import { useState, useEffect } from "react";
import { CardColumns, Button, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { getAllBooks} from "../modules/bookManager.js";
import { getUserBookByUserId } from "../modules/userBookManager.js";
import { addUserBook } from "../modules/userBookManager.js";
import "./BookList.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);

  const getBooks = () => {
    getAllBooks().then((b) => setBooks(b));
  };
  const getUserBooks = () => {
    getUserBookByUserId().then((ub) => setUserBooks(ub));
  }

  const handleSave = (bookId) => {
    addUserBook(bookId).then((b) => {
    getUserBooks();
    });
}

  useEffect(() => {
    getBooks();
  }, []);
  useEffect(() => {
    getUserBooks();
  }, []);

  return (
    <div style={{backgroundColor: "#0D1321"}}>
      <Link to="/create" style={{color: "#F0EBD8"}}>Add New Book</Link>
        
      <CardColumns style={{backgroundColor: "#0D1321"}, {color: "#F0EBD8"}}>
        {books.length === 0
          ? `There are no Books in the Database. Please add some.`
          : books.map((book) => (
            <ListGroupItem key={`book--${book.id}`} style={{backgroundColor: "#0D1321"}}>
              <Book book={book} key={book.id} />
              {userBooks.find((ub) => book.id === ub.bookId)
              ? null
              : <Button className="btn btn-primary" onClick={() => handleSave(book.id)}>Start Reading</Button>
              }   
            </ListGroupItem>
          ))}
      </CardColumns>
    </div>
  );
};
export default BookList;