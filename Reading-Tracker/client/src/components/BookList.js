import React from "react";
import Book from "./Book.js";
import { useState, useEffect } from "react";
import { CardColumns } from "reactstrap";
import { Link } from "react-router-dom";
import { getAllBooks} from "../modules/bookManager.js";

const BookList = () => {
  const [books, setBooks] = useState([]);

  const getBooks = () => {
    getAllBooks().then((b) => setBooks(b));
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div>
      <Link to="/create">Add New Book</Link>
        
      <CardColumns>
        {books.length === 0
          ? `There are no Books in Your List`
          : books.map((book) => <Book book={book} key={book.id}/>)}
      </CardColumns>
    </div>
  );
};
export default BookList;