set identity_insert [UserProfile] on
insert into UserProfile (Id, Name, Email, FirebaseUserId) values (1, 'Hunter Pruett', 'h@p.com', '1BHfmmAi5JS4tfcrOU3UvRZl4li2');
set identity_insert [UserProfile] off
set identity_insert [UserProfile] on
insert into UserProfile (Id, Name, Email, FirebaseUserId) values (2, 'Jury Byrd', 'j@b.com', 'FVMyJ0EyrvM2hMb3X5B8t9ugm1P2');
set identity_insert [UserProfile] off

set identity_insert [Book] on
insert into Book (Id, Name, Author) values (1, 'The Maze runner', 'James Dashner');
set identity_insert [Book] off
set identity_insert [Book] on
insert into Book (Id, Name, Author) values (2, 'Unwind', 'Neal Shusterman');
set identity_insert [Book] off

set identity_insert [Type] on
insert into [Type] (Id, Name) values (1, 'Novel');
set identity_insert [Type] off
set identity_insert [Type] on
insert into [Type] (Id, Name) values (2, 'Manga');
set identity_insert [Type] off
set identity_insert [Type] on
insert into [Type] (Id, Name) values (3, 'Manhwa');
set identity_insert [Type] off
set identity_insert [Type] on
insert into [Type] (Id, Name) values (4, 'Light Novel');
set identity_insert [Type] off
set identity_insert [Type] on
insert into [Type] (Id, Name) values (5, 'Poem');
set identity_insert [Type] off
set identity_insert [Type] on
insert into [Type] (Id, Name) values (6, 'Doujin');
set identity_insert [Type] off
set identity_insert [Type] on
insert into [Type] (Id, Name) values (7, 'Article');
set identity_insert [Type] off
set identity_insert [Type] on
insert into [Type] (Id, Name) values (8, 'Comic Book');
set identity_insert [Type] off
set identity_insert [Type] on
insert into [Type] (Id, Name) values (9, 'Graphic Novel');
set identity_insert [Type] off
set identity_insert [Type] on
insert into [Type] (Id, Name) values (10, 'Journal');
set identity_insert [Type] off
set identity_insert [Type] on
insert into [Type] (Id, Name) values (11, 'Encyclopedia');
set identity_insert [Type] off
set identity_insert [Type] on
insert into [Type] (Id, Name) values (12, 'Dictionary');
set identity_insert [Type] off
set identity_insert [Type] on
insert into [Type] (Id, Name) values (13, 'Religious Text');
set identity_insert [Type] off
set identity_insert [Type] on
insert into [Type] (Id, Name) values (14, 'Phone Book');
set identity_insert [Type] off
set identity_insert [Type] on
insert into [Type] (Id, Name) values (15, 'Magazine');
set identity_insert [Type] off
set identity_insert [Type] on
insert into [Type] (Id, Name) values (16, 'Textbook');
set identity_insert [Type] off
set identity_insert [Type] on
insert into [Type] (Id, Name) values (17, 'Coloring Book');
set identity_insert [Type] off
set identity_insert [Type] on
insert into [Type] (Id, Name) values (18, 'Puzzle Book');
set identity_insert [Type] off
set identity_insert [Type] on
insert into [Type] (Id, Name) values (19, 'Notebook');
set identity_insert [Type] off
set identity_insert [Type] on
insert into [Type] (Id, Name) values (20, 'Childrens Book');
set identity_insert [Type] off

set identity_insert [BookType] on
insert into BookType (Id, BookId, TypeId) values (1, 1, 1);
set identity_insert [BookType] off
set identity_insert [BookType] on
insert into BookType (Id, BookId, TypeId) values (2, 2, 1);
set identity_insert [BookType] off

set identity_insert [UserBook] on
insert into UserBook (Id, UserId, BookId, IsFinished, Chapter, LineNumber) values (1, 1, 1, 0, 1, 1);
set identity_insert [UserBook] off
set identity_insert [UserBook] on
insert into UserBook (Id, UserId, BookId, IsFinished, Chapter, LineNumber) values (2, 1, 2, 0, 1, 1);
set identity_insert [UserBook] off