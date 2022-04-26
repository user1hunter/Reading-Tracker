insert into UserProfile (Id, Name, Email) values (1, 'Fons Stocken', 'fstocken0@blogger.com');
insert into UserProfile (Id, Name, Email) values (2, 'Wallis Bispo', 'wbispo1@hexun.com');

insert into Book (Id, Name, Author) values (1, 'The Maze runner', 'James Dashner');
insert into Book (Id, Name, Author) values (2, 'Unwind', 'Neal Shusterman');

insert into [Type] (Id, Name) values (1, 'Novel');
insert into [Type] (Id, Name) values (2, 'Manga');
insert into [Type] (Id, Name) values (3, 'Manhwa');
insert into [Type] (Id, Name) values (4, 'Light Novel');
insert into [Type] (Id, Name) values (5, 'Poem');
insert into [Type] (Id, Name) values (6, 'Doujin');
insert into [Type] (Id, Name) values (7, 'Article');
insert into [Type] (Id, Name) values (8, 'Comic Book');
insert into [Type] (Id, Name) values (9, 'Graphic Novel');
insert into [Type] (Id, Name) values (10, 'Journal');
insert into [Type] (Id, Name) values (11, 'Encyclopedia');
insert into [Type] (Id, Name) values (12, 'Dictionary');
insert into [Type] (Id, Name) values (13, 'Religious Text');
insert into [Type] (Id, Name) values (14, 'Phone Book');
insert into [Type] (Id, Name) values (15, 'Magazine');
insert into [Type] (Id, Name) values (16, 'Textbook');
insert into [Type] (Id, Name) values (17, 'Coloring Book');
insert into [Type] (Id, Name) values (18, 'Puzzle Book');
insert into [Type] (Id, Name) values (19, 'Notebook');
insert into [Type] (Id, Name) values (20, 'Childrens Book');

insert into BookType (Id, BookId, TypeId) values (1, 1, 1);
insert into BookType (Id, BookId, TypeId) values (2, 2, 1);

insert into UserBook (Id, UserId, BookId, IsFinished, Chapter, LineNumber) values (1, 1, 1, 0, 1, 1);
insert into UserBook (Id, UserId, BookId, IsFinished, Chapter, LineNumber) values (2, 1, 2, 0, 1, 1);