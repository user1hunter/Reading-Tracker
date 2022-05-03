using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reading_Tracker.Repositories;

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
    }
}
