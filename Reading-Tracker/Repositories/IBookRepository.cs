using Reading_Tracker.Models;
using System.Collections.Generic;

namespace Reading_Tracker.Repositories
{
    public interface IBookRepository
    {
        List<Book> GetAll();
        Book GetById(int id);
        List<Book> GetBookByUserId(int id);
        List<UserBook> GetUserBookByUserId(int id);
        UserBook GetUserBookByBookId(int id);
        void CreateBook(Book book);
        void CreateUserBook(int bookId, int userId);
        void UpdateBook(UserBook userBook);
        void RemoveBook(int id);
        void CreateBookType(int bookId, int typeId);
    }
}