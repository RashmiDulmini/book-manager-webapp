namespace BookManagementBackend.Models
{
    public class Book
    {
        public int Id { get; set; }                 // id
        public string Title { get; set; } = "";     // title
        public string Author { get; set; } = "";    // author
        public string Isbn { get; set; } = "";      // isbn
        public DateTime PublicationDate { get; set; } // publicationDate
    }
}