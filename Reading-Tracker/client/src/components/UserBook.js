import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { Button } from "reactstrap";

const UserBook = ({userBook}) => {
    return (
        <Card style={{height:200}} >
            <CardBody>
                <CardTitle>{userBook.name}</CardTitle>
                <CardSubtitle>Author: {userBook.author}</CardSubtitle>
                <CardSubtitle>Chapter: {userBook.userBook.chapter}</CardSubtitle>
                <CardSubtitle>Line Number: {userBook.userBook.lineNumber}</CardSubtitle>
            </CardBody>
        </Card>
    )
}
export default UserBook