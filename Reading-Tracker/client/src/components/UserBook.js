import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import { Button } from "reactstrap";

const UserBook = ({userBook}) => {
    return (
        <Card style={{height:200}} key={userBook.id}>
            <CardBody>
                <CardTitle>{userBook.Book.name}</CardTitle>
                <CardSubtitle>{userBook.chapter}</CardSubtitle>
                <Button><Link to={`/update/${userBook.id}`}></Link></Button>
                <Button><Link to={`/remove/${userBook.id}`}></Link></Button>
            </CardBody>
        </Card>
    )
}
export default UserBook