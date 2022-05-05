using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reading_Tracker.Models;
using Reading_Tracker.Repositories;
using System.Security.Claims;

namespace Reading_Tracker.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserBookController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public UserBookController(IBookRepository bookRepository, IUserProfileRepository userProfileRepository)
        {
            _bookRepository = bookRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var book = _bookRepository.GetUserBookByBookId(id);
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
            return Ok(_bookRepository.GetUserBookByUserId(id));
        }

        [HttpPost("{id}")]
        public IActionResult Post(int id)
        {
            UserProfile user = GetCurrentUserProfile();
            _bookRepository.CreateUserBook(id, user.Id);


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
