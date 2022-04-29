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
    public class TypeController : ControllerBase
    {
        private readonly ITypeRepository _typeRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public TypeController(ITypeRepository typeRepository, IUserProfileRepository userProfileRepository)
        {
            _typeRepository = typeRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_typeRepository.GetAll());
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
