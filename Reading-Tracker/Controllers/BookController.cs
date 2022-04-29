using System;
using Microsoft.AspNetCore.Mvc;
using Reading_Tracker.Repositories;
using Reading_Tracker.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Reading_Tracker.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public BookController(IBookRepository bookRepository, IUserProfileRepository userProfileRepository)
        {
            _bookRepository = bookRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_bookRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var book = _bookRepository.GetById(id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpGet("home")]
        public IActionResult GetUserBooks(int id)
        {
            UserProfile user = GetCurrentUserProfile();
            id = user.Id;
            return Ok(_bookRepository.GetBookByUserId(id));
        }

        [HttpPost]
        public IActionResult Post(Book book)
        {
            _bookRepository.CreateBook(book);
            
            foreach (var type in book.Types)
            {
                _bookRepository.CreateBookType(book.Id, type.Id);
            }

            return CreatedAtAction("Get", new { id = book.Id }, book);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, UserBook userBook)
        {
            if (id != userBook.Id)
            {
                return BadRequest();
            }

            _bookRepository.UpdateBook(userBook);
            return NoContent();
        }

        //[HttpPut("{id}")]
        //public IActionResult Put(int id, Book book)
        //{
        //    if (id != book.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _bookRepository.EditBook(book);
        //    return NoContent();
        //}

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _bookRepository.RemoveBook(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        private string GetCurrentUserProfileId()
        {
            string id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return id;
        }
    }
}