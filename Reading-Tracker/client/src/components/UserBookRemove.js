import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { removeBook, getBookById } from "../modules/bookManager";
import { useHistory, useParams } from "react-router-dom";
 

const UserBookRemove = () => {
  

  const [userBook, setUserBook] = useState({});
  const history = useHistory();
  const {id} = useParams();


  useEffect(() => {
    getBookById(id).then((book) => setUserBook(book));
  }, [id]);

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;

    const copy = { ...userBook };

    copy[key] = value;
    setUserBook(copy);
  };

  const handleDelete = (evt) => {
    evt.preventDefault();

    removeBook(id).then(() => {
      history.push("/");
    });
  };

  return (  
    <div>
    <h2 key={userBook.id} style={{color: "#F0EBD8"}}>Are you sure you would like to remove "{userBook.name}" from your Reading List?</h2>
    <Button disabled={!userBook.name} className="btn btn-primary" onClick={handleDelete}>
      Remove
    </Button>
    <Button onClick={(e) => history.push(`/`)}>Cancel</Button>
  </div>
  );
};

export default UserBookRemove;
