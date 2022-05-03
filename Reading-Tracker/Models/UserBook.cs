﻿namespace Reading_Tracker.Models
{
    public class UserBook
    {
        public int Id { get; set; }
        public UserProfile UserProfile { get; set; }
        public int UserId { get; set; }
        public Book Book { get; set; }
        public int BookId { get; set; }
        public bool IsFinished { get; set; }
        public string Chapter { get; set; }
        public int LineNumber { get; set; }
    }
}
