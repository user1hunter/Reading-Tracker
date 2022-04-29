import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import UserBookList from "./UserBookList";
import BookList from "./BookList";
import BookForm from "./BookForm";
import UserBookRemove from "./UserBookRemove";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <UserBookList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/books" exact>
          {isLoggedIn ? <BookList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/create" exact>
          {isLoggedIn ? <BookForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/remove/:id(\d+)" exact>
          {isLoggedIn ? <UserBookRemove /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
}
