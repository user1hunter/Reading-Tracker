using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Reading_Tracker.Models;
using Reading_Tracker.Utils;
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

        public List<Book> GetBookByUserId(int userProfileId)
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

                    cmd.Parameters.AddWithValue("@userId", userProfileId);
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
                                        VALUES (@name, @author);
                                        INSERT INTO BookType (BookId, TypeId)
                                        VALUES (@bookId, @typeId)
                                        ";

                    DbUtils.AddParameter(cmd, "@name", book.Name);
                    DbUtils.AddParameter(cmd, "@author", book.Author);
                    DbUtils.AddParameter(cmd, "@bookId", book.BookType.BookId);
                    DbUtils.AddParameter(cmd, "@typeId", book.BookType.TypeId);

                    book.Id = (int)cmd.ExecuteScalar();
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

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void EditBook(Book book)
        {
            using (SqlConnection con = Connection)
            {
                con.Open();
                using (SqlCommand cmd = con.CreateCommand())
                {
                    cmd.CommandText += @"UPDATE Book
                                        SET
                                            Name = @name,
                                            Author = @author,
                                            TypeId = @typeId
                                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@name", book.Name);
                    cmd.Parameters.AddWithValue("@auhtor", book.Author);
                    cmd.Parameters.AddWithValue("@typeId", book.BookType.TypeId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

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
                },
                BookType = new BookType()
                {
                    Id = DbUtils.GetInt(reader, "BookTypeId"),
                    BookId = DbUtils.GetInt(reader, "BookTypeBookId"),
                    TypeId = DbUtils.GetInt(reader, "BookTypeTypeId"),
                }
            };

            return book;
        }
    }
}
