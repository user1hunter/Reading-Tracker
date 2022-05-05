import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { Button } from "reactstrap";

const Book = ({book, userBooks}) => {
    return (
        <Card style={{height:200}} >
            <CardBody>
                <CardTitle>{book.name}</CardTitle>
                <CardSubtitle>Author: {book.author}</CardSubtitle>
            </CardBody>
        </Card>
    )
}
export default Book