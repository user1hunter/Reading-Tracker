import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

const Book = ({book, userBooks}) => {
    return (
        <Card style={{height:85}, 
                    {backgroundColor: "#1D2D44"}
                    } >
            <CardBody style={{fontWeight: "bold"},
                            {color: "#F0EBD8"}}>
                <CardTitle style={{fontWeight: "bold"}}>{book.name}</CardTitle>
                <CardSubtitle>Author: {book.author}</CardSubtitle>
            </CardBody>
        </Card>
    )
}
export default Book