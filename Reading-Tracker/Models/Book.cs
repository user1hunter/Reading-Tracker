using System.Collections.Generic;

namespace Reading_Tracker.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public List<Type> Types { get; set; }
        public UserBook UserBook { get; set; }
    }
}
