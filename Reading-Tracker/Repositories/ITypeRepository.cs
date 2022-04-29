using System;
using System.Collections.Generic;

namespace Reading_Tracker.Repositories
{
    public interface ITypeRepository
    {
        List<Models.Type> GetAll();
    }
}