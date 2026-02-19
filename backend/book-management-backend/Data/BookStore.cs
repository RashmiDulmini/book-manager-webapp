using BookManagementBackend.Models;

namespace BookManagementBackend.Data
{
    public static class BookStore
    {
        // In-memory list (static means it stays while app is running)
        public static List<Book> Books { get; } = new List<Book>
        {
            new Book { Id = 1, Title = "Clean Code", Author = "Robert C. Martin", Isbn = "9780132350884", PublicationDate = new DateTime(2008, 8, 1) },
            new Book { Id = 2, Title = "The Pragmatic Programmer", Author = "Andrew Hunt", Isbn = "9780201616224", PublicationDate = new DateTime(1999, 10, 30) }
        };

        public static int NextId => Books.Count == 0 ? 1 : Books.Max(b => b.Id) + 1;
    }
}