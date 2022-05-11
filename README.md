# Reading-Tracker
<b style="font-size: 20px;"><i>A Virtual Bookmark!</i></b>
### Application Overview

Reading-Tracker is a web-app that lets a user create a list of books they are reading and keep up with where they last left off. A lot like a Virtual Bookmark!

# ERD

![ERD](/Reading-Tracker/client/public/Reading--Tracker.png)


# WireFrame

![WireFrame](https://github.com/user1hunter/Reading-Tracker/blob/main/Reading-Tracker/client/public/Back-End%20WireFrame.jpg)


## Purpose & Motivation
The purpose of this final capstone is to display all the things I have learned about in NSS, and just like my front end capstone I chose a something that was simple enough to complete on a time constraint but also complex enough that I continue to learn while working on it. This Project is also something I personally might use, as I enjoy reading books on my phone and I often lose my place in the book when I accidently close the tab the book was open on.

## How does this application work?
I used the React library, as well as ReactStrap, to create the client side of the application and C# using the .NET framework to create the server side of the application. Users are able to create, read, update, and delete data in the client by accessing the database through various Http requests that my server side controllers and repositories handle.

## How to install and run
Steps to run my project, after having cloned this repo from GitHub:
1. Run both of the SQL setup scripts found in the SQL directory, setup before seed data
2. Run the server through Visual Studio
3. Run 'npm start' in the client directory in your terminal
4. Log in as an existing user in the database
