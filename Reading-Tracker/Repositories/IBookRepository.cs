using Reading_Tracker.Models;
using System.Collections.Generic;

namespace Reading_Tracker.Repositories
{
    public interface IBookRepository
    {
        List<Book> GetAll();
        Book GetById(int id);
        List<Book> GetBookByUserId(int userId);
        void CreateBook(Book book);
        void UpdateBook(UserBook userBook);
        void EditBook(Book book);
        void RemoveBook(int id);
    }
}