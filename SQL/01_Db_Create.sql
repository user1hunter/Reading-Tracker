USE [master]
GO

IF db_id('ReadingTracker') IS NOT NULL
BEGIN
  ALTER DATABASE [ReadingTracker] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
  DROP DATABASE [ReadingTracker]
END
GO

CREATE DATABASE [ReadingTracker]
GO

USE [ReadingTracker]
GO

DROP TABLE IF EXISTS UserProfile
DROP TABLE IF EXISTS Book
DROP TABLE IF EXISTS [Type]
DROP TABLE IF EXISTS UserBook
DROP TABLE IF EXISTS BookType

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY,
  [Name] nvarchar(40) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FirebaseUserId] nvarchar(255)
)
GO

CREATE TABLE [Book] (
  [Id] int PRIMARY KEY,
  [Name] nvarchar(255) NOT NULL,
  [Author] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Type] (
  [Id] int PRIMARY KEY,
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [UserBook] (
  [Id] int PRIMARY KEY,
  [UserId] int NOT NULL,
  [BookId] int NOT NULL,
  [IsFinished] bit DEFAULT (0),
  [Chapter] nvarchar(255) NOT NULL,
  [LineNumber] int
)
GO

CREATE TABLE [BookType] (
  [Id] int PRIMARY KEY,
  [BookId] int NOT NULL,
  [TypeId] int NOT NULL
)
GO

ALTER TABLE [BookType] ADD FOREIGN KEY ([BookId]) REFERENCES [Book] ([Id])
GO

ALTER TABLE [BookType] ADD FOREIGN KEY ([TypeId]) REFERENCES [Type] ([Id])
GO

ALTER TABLE [UserBook] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [UserBook] ADD FOREIGN KEY ([BookId]) REFERENCES [Book] ([Id])
GO
