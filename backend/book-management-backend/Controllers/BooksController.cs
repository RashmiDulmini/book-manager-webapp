using Microsoft.AspNetCore.Mvc;
using BookManagementBackend.Models;
using BookManagementBackend.Data;

namespace BookManagementBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        // GET: api/books
        [HttpGet]
        public ActionResult<List<Book>> GetAll()
        {
            return Ok(BookStore.Books);
        }

        // GET: api/books/5
        [HttpGet("{id}")]
        public ActionResult<Book> GetById(int id)
        {
            var book = BookStore.Books.FirstOrDefault(b => b.Id == id);
            if (book == null) return NotFound();
            return Ok(book);
        }

        // POST: api/books
        [HttpPost]
        public ActionResult<Book> Create(Book newBook)
        {
            newBook.Id = BookStore.NextId;
            BookStore.Books.Add(newBook);
            return CreatedAtAction(nameof(GetById), new { id = newBook.Id }, newBook);
        }

        // PUT: api/books/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, Book updatedBook)
        {
            var book = BookStore.Books.FirstOrDefault(b => b.Id == id);
            if (book == null) return NotFound();

            book.Title = updatedBook.Title;
            book.Author = updatedBook.Author;
            book.Isbn = updatedBook.Isbn;
            book.PublicationDate = updatedBook.PublicationDate;

            return NoContent();
        }

        // DELETE: api/books/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var book = BookStore.Books.FirstOrDefault(b => b.Id == id);
            if (book == null) return NotFound();

            BookStore.Books.Remove(book);
            return NoContent();
        }
    }
}