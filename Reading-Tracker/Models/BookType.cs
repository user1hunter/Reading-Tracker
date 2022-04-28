namespace Reading_Tracker.Models
{
    public class BookType
    {
        public int Id { get; set; }
        public Book Book { get; set; }
        public int BookId { get; set; }
        public Type Type { get; set; }
        public int TypeId { get; set; }
    }
}
