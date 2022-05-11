import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input} from "reactstrap";
import { getUserBookByBookId } from "../modules/userBookManager";
import { updateBook } from "../modules/bookManager";
import { useHistory, useParams } from "react-router-dom";
 

const UserBookUpdate = () => {
  
  const newUserBook = {
    chapter: "",
    lineNumber: "",
    isFinished: "",
  }
  const [userBook, setUserBook] = useState(newUserBook);
  const history = useHistory();
  const {id} = useParams();


  useEffect(() => {
    getUserBookByBookId(id).then((book) => setUserBook(book));
  }, [id]);

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;

    const copyUserBook = { ...userBook };

    copyUserBook[key] = value;
    setUserBook(copyUserBook);
  };

  const handleCheckboxChange = (evt) => {
    const value = evt.target.checked;
    const key = evt.target.id;

    const copyUserBook = { ...userBook };

    copyUserBook[key] = value;
    setUserBook(copyUserBook);
  }

  const handleSave = (evt) => {
    evt.preventDefault();

    updateBook(userBook).then(() => {
      history.push("/");
    });
  };

  return (  
    <Form>
      <FormGroup>
        <Label for="chapter" style={{color: "#F0EBD8"}}>Chapter</Label>
        <Input
          type="text"
          name="chapter"
          id="chapter"
          style={{backgroundColor: "#748CAB"}}
          value={`${userBook.chapter}`}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="lineNumber" style={{color: "#F0EBD8"}}>Line Number(Optional)</Label>
        <Input
          type="text"
          name="lineNumber"
          id="lineNumber"
          style={{backgroundColor: "#748CAB"}}
          value={userBook.lineNumber}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="isFinished" style={{color: "#F0EBD8"}}>Check if You've Finished the Book</Label>
        <Input
          type="checkbox"
          name="isFinished"
          id="isFinished"
          style={{backgroundColor: "#748CAB"}}
          checked={userBook.isFinished}
          onChange={handleCheckboxChange}
        />
      </FormGroup>
      <Button className="btn btn-primary" onClick={handleSave}>
        Submit
      </Button>
      <Button onClick={(e) => history.push(`/`)}>Cancel</Button>
  </Form>
  );
};

export default UserBookUpdate;