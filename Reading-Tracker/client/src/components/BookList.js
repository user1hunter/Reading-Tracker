import React from "react";
import Book from "./Book.js";
import { useState, useEffect } from "react";
import { CardColumns, Button, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { getAllBooks} from "../modules/bookManager.js";
import { getUserBookByUserId } from "../modules/userBookManager.js";
import { addUserBook } from "../modules/userBookManager.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BookList = () => {
  const history = useHistory();
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
    <div>
      <Link to="/create">Add New Book</Link>
        
      <CardColumns>
        {books.length === 0
          ? `There are no Books in Your List`
          : books.map((book) => (
            <ListGroupItem key={`book--${book.id}`}>
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