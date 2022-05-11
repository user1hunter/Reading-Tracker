import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createBook } from "../modules/bookManager.js";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { getAllTypes } from "../modules/typeManager";
import Select from "react-select";
import "./BookForm.css";

const BookForm = () => {
    const history = useHistory();
    const newBook = {
      name: "",
      author: "",
      types: [],
    }
    const [book, setBook] = useState(newBook);
    const [types, setTypes] = useState([]);
    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;
    
        const bookCopy = { ...book };
    
        bookCopy[key] = value;
        setBook(bookCopy);
    };
    const handleMultiSelectInputChange = (evt) => {
      const value = evt.map((option) => {
        return { 
          id: parseInt(option.value),
          name: option.label
        }
      })
      const bookCopy = { ...book };

      bookCopy.types = value;
      setBook(bookCopy);
    }
    
    const handleSave = (evt) => {
        evt.preventDefault();
        createBook(book).then((b) => {
        history.push("/books");
        });
    }

    const options = 
      types.map((type) => {
         return { value: `${type.id}`, label: `${type.name}` }
      })
    

  const getTypes = () => {
    getAllTypes().then((t) => setTypes(t));
  };

  useEffect(() => {
    getTypes();
  }, []);

    return (
        <Form>
            <FormGroup>
                <Label for="title" style={{color: "#F0EBD8"}}>Book Name:</Label>
                <Input type="text" 
                name="name" 
                id="name" 
                placeholder="Book Name" 
                style={{backgroundColor: "#748CAB"}}
                value={book.name} 
                onChange={handleInputChange}/>
            </FormGroup>
            <FormGroup>
                <Label for="title" style={{color: "#F0EBD8"}}>Author Name:</Label>
                <Input type="text" 
                name="author" 
                id="author" 
                placeholder="Author Name" 
                style={{backgroundColor: "#748CAB"}}
                value={book.author} 
                onChange={handleInputChange}/>
            </FormGroup>
            <FormGroup>
                <Label for="description" style={{color: "#F0EBD8"}}>Book Type:</Label>
                <Select isMulti 
                className="basic-multi-select" 
                classNamePrefix="select" 
                name="types" 
                placeholder="Book Type" 
                style={{backgroundColor: "#748CAB"}}
                defaultValue={[options[0]]} 
                options={options} 
                onChange={handleMultiSelectInputChange}>
                </Select>
            </FormGroup>
            <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
            <Button onClick={(e) => history.push(`/books`)}>Cancel</Button>
        </Form>
    )
}
export default BookForm