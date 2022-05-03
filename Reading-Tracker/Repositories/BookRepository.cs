using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Reading_Tracker.Models;
using Reading_Tracker.Utils;
using System;
using System.Collections.Generic;

namespace Reading_Tracker.Repositories
{
    public class BookRepository : BaseRepository, IBookRepository
    {
        public BookRepository(IConfiguration configuration) : base(configuration) { }
        public List<Book> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT Id, Name, Author
                             FROM Book
                         ORDER BY Name
                        ";

                    var reader = cmd.ExecuteReader();

                    var book = new List<Book>();
                    while (reader.Read())
                    { 
                        book.Add(new Book()
                         {
                             Id = DbUtils.GetInt(reader, "Id"),
                             Name = DbUtils.GetString(reader, "Name"),
                             Author = DbUtils.GetString(reader, "Author"),
                         });
                    }
                    reader.Close();

                    return book;

                } 
            }
        }
        public Book GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT b.Id AS BookId, b.Name AS BookName, b.Author AS BookAuthor, 
                                    ub.UserId AS BookUserProfileId, ub.Id AS UserBookId,
                                    ub.BookId AS UserBookBookId, ub.IsFinished, ub.Chapter, ub.LineNumber,
                                    up.Name AS UserProfileName, up.id AS UserProfileId,
                                    bt.Id AS BookTypeId, bt.BookId AS BookTypeBookId, bt.TypeId AS BookTypeTypeId,
                                    t.id AS TypeId, t.Name AS TypeName
                            FROM Book b
                                 LEFT JOIN UserBook ub ON b.Id = ub.BookId
                                 LEFT JOIN UserProfile up ON ub.UserId = up.Id
                                 LEFT JOIN BookType bt ON b.Id = bt.BookId
                                 LEFT JOIN Type t ON bt.TypeId = t.Id
                           WHERE b.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        Book book = null;
                        if (reader.Read())
                        {
                            book = NewBookFromReader(reader);
                        }

                        return book;
                    }
                }
            }
        }

        public UserBook GetUserBookByBookId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT Id, IsFinished, Chapter, BookId, UserId, LineNumber
                             FROM UserBook
                         WHERE Id = @Id
                        ";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();

                    UserBook userBook = null;
                    if (reader.Read())
                    {
                        userBook = new UserBook()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            IsFinished = (bool)reader.GetSqlBoolean(reader.GetOrdinal("IsFinished")),
                            Chapter = DbUtils.GetString(reader, "Chapter"),
                            BookId = DbUtils.GetInt(reader, "BookId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            LineNumber = DbUtils.GetInt(reader, "LineNumber"),
                        };
                    }
                    reader.Close();

                    return userBook;
                }
            }
        }

        public List<Book> GetBookByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT b.Id AS BookId, b.Name AS BookName, b.Author AS BookAuthor, 
                                    ub.UserId AS BookUserProfileId, ub.Id AS UserBookId,
                                    ub.BookId AS UserBookBookId, ub.IsFinished, ub.Chapter, ub.LineNumber,
                                    up.Name AS UserProfileName, up.id AS UserProfileId,
                                    bt.Id AS BookTypeId, bt.BookId AS BookTypeBookId, bt.TypeId AS BookTypeTypeId,
                                    t.id AS TypeId, t.Name AS TypeName
                            FROM Book b
                                 LEFT JOIN UserBook ub ON b.Id = ub.BookId
                                 LEFT JOIN UserProfile up ON ub.UserId = up.Id
                                 LEFT JOIN BookType bt ON b.Id = bt.BookId
                                 LEFT JOIN Type t ON bt.TypeId = t.Id
                           WHERE ub.UserId = @userId";

                    cmd.Parameters.AddWithValue("@userId", id);
                    var reader = cmd.ExecuteReader();

                    var book = new List<Book>();

                    while (reader.Read())
                    {
                        book.Add(NewBookFromReader(reader));
                    }

                    reader.Close();

                    return book;
                }
            }
        }

        public void CreateBook(Book book)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Book (Name, Author)
                                        OUTPUT INSERTED.ID
                                        VALUES (@name, @author)
                                        ";
                    DbUtils.AddParameter(cmd, "@name", book.Name);
                    DbUtils.AddParameter(cmd, "@author", book.Author);

                    book.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void CreateBookType(int bookId, int typeId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO BookType (BookId, TypeId)
                                        VALUES (@bookId, @typeId)
                                        ";
                    DbUtils.AddParameter(cmd, "@bookId", bookId);
                    DbUtils.AddParameter(cmd, "@typeId", typeId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void RemoveBook(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM UserBook
                                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateBook(UserBook userBook)
        {
            using (SqlConnection con = Connection)
            {
                con.Open();
                using (SqlCommand cmd = con.CreateCommand())
                {
                    cmd.CommandText += @"UPDATE UserBook
                                        SET
                                            IsFinished = @isFinished,
                                            Chapter = @chapter,
                                            LineNumber = @lineNumber
                                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@isFinished", userBook.IsFinished);
                    cmd.Parameters.AddWithValue("@chapter", userBook.Chapter);
                    cmd.Parameters.AddWithValue("@lineNumber", userBook.LineNumber);
                    cmd.Parameters.AddWithValue("@id", userBook.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        //public void EditBook(Book book)
        //{
        //    using (SqlConnection con = Connection)
        //    {
        //        con.Open();
        //        using (SqlCommand cmd = con.CreateCommand())
        //        {
        //            cmd.CommandText += @"UPDATE Book
        //                                SET
        //                                    Name = @name,
        //                                    Author = @author,
        //                                    TypeId = @typeId
        //                                WHERE Id = @id";
        //            cmd.Parameters.AddWithValue("@name", book.Name);
        //            cmd.Parameters.AddWithValue("@author", book.Author);
        //            cmd.Parameters.AddWithValue("@typeId", book.BookType.TypeId);

        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}

        private Book NewBookFromReader(SqlDataReader reader)
        {
            var book = new Book()
            {
                Id = DbUtils.GetInt(reader, "BookId"),
                Name = DbUtils.GetString(reader, "BookName"),
                Author = DbUtils.GetString(reader, "BookAuthor"),
                UserBook = new UserBook()
                {
                    Id = DbUtils.GetInt(reader, "UserBookId"),
                    UserId = DbUtils.GetInt(reader, "BookUserProfileId"),
                    BookId = DbUtils.GetInt(reader, "UserBookBookId"),
                    Chapter = DbUtils.GetString(reader, "Chapter"),
                    LineNumber = DbUtils.GetInt(reader, "LineNumber"),
                },
                Types = new List<Models.Type>()
            };

            return book;
        }
    }
}
