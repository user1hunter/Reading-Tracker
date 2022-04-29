import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { Button } from "reactstrap";

const Book = ({book}) => {
    return (
        <Card style={{height:200}} >
            <CardBody>
                <CardTitle>{book.name}</CardTitle>
                <CardSubtitle>Author: {book.author}</CardSubtitle>
                <Button><Link to={`/edit/${book.id}`}></Link>Edit</Button>
                <Button>Add To Your List</Button>
            </CardBody>
        </Card>
    )
}
export default Book