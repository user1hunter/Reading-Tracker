using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Reading_Tracker.Utils;
using System;
using System.Collections.Generic;
using Reading_Tracker.Models;

namespace Reading_Tracker.Repositories
{
    public class TypeRepository : BaseRepository, ITypeRepository
    {
        public TypeRepository(IConfiguration configuration) : base(configuration) { }
        public List<Models.Type> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT Id, Name
                             FROM Type
                         ORDER BY Name
                        ";

                    var reader = cmd.ExecuteReader();

                    var type = new List<Models.Type>();
                    while (reader.Read())
                    {
                        type.Add(new Models.Type()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        });
                    }
                    reader.Close();

                    return type;

                }
            }
        }
    }
}
