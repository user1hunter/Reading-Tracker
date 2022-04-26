using Reading_Tracker.Models;
using System.Collections.Generic;

namespace Reading_Tracker.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile user);
        List<UserProfile> GetAll();
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetById(int id);
    }
}