import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

type BookForm = {
  title: string;
  author: string;
  isbn: string;
  publicationDate: string; 
};

@Component({
  selector: 'app-book-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.css']
})
export class BookManagerComponent implements OnInit {
  books: Book[] = [];

  formBook: BookForm = {
    title: '',
    author: '',
    isbn: '',
    publicationDate: ''
  };

  editingId: number | null = null;
  loading = false;
  showForm = false;
  showDeleteConfirm = false;
  deleteBookId: number | null = null;
  deleteBookTitle = '';
  showSuccess = false;
  successMessage = '';
  successType: 'add' | 'update' | 'delete' = 'add';
  formErrors: { [key: string]: string } = {};
  formSubmitted = false;

  constructor(private bookService: BookService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.loading = true;
    this.cdr.markForCheck();
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load books:', err);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  submit() {
    this.formSubmitted = true;
    
    if (!this.validateForm()) {
      this.cdr.markForCheck();
      return;
    }

    const payload = { ...this.formBook };
    const bookTitle = payload.title;

    if (this.editingId === null) {
      this.bookService.addBook(payload).subscribe({
        next: () => {
          this.resetForm();
          this.showSuccessMessage(`"${bookTitle}" has been added to your collection!`, 'add');
          this.loadBooks();
        },
        error: (err) => {
          console.error('Failed to add book:', err);
          this.cdr.markForCheck();
        }
      });
    } else {
      this.bookService.updateBook(this.editingId, payload).subscribe({
        next: () => {
          this.resetForm();
          this.showSuccessMessage(`"${bookTitle}" has been updated successfully!`, 'update');
          this.loadBooks();
        },
        error: (err) => {
          console.error('Failed to update book:', err);
          this.cdr.markForCheck();
        }
      });
    }
  }

  validateForm(): boolean {
    this.formErrors = {};
    let isValid = true;

    if (!this.formBook.title || this.formBook.title.trim() === '') {
      this.formErrors['title'] = 'Book title is required';
      isValid = false;
    }

    if (!this.formBook.author || this.formBook.author.trim() === '') {
      this.formErrors['author'] = 'Author name is required';
      isValid = false;
    }

    if (!this.formBook.isbn || this.formBook.isbn.trim() === '') {
      this.formErrors['isbn'] = 'ISBN is required';
      isValid = false;
    }

    if (!this.formBook.publicationDate) {
      this.formErrors['publicationDate'] = 'Publication date is required';
      isValid = false;
    }

    return isValid;
  }

  clearFieldError(field: string) {
    if (this.formErrors[field]) {
      delete this.formErrors[field];
      this.cdr.markForCheck();
    }
  }

  showSuccessMessage(message: string, type: 'add' | 'update' | 'delete') {
    this.successMessage = message;
    this.successType = type;
    this.showSuccess = true;
    this.cdr.markForCheck();
  }

  closeSuccess() {
    this.showSuccess = false;
    this.successMessage = '';
    this.cdr.markForCheck();
  }

  edit(book: Book) {
    this.editingId = book.id;
    this.showForm = true;

    const dateOnly = book.publicationDate
      ? book.publicationDate.substring(0, 10)
      : '';

    this.formBook = {
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publicationDate: dateOnly
    };
    this.cdr.markForCheck();
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
    this.cdr.markForCheck();
  }

  delete(book: Book) {
    this.deleteBookId = book.id;
    this.deleteBookTitle = book.title;
    this.showDeleteConfirm = true;
    this.cdr.markForCheck();
  }

  confirmDelete() {
    if (this.deleteBookId === null) return;

    const deletedTitle = this.deleteBookTitle;
    this.bookService.deleteBook(this.deleteBookId).subscribe({
      next: () => {
        this.cancelDelete();
        this.showSuccessMessage(`"${deletedTitle}" has been deleted successfully!`, 'delete');
        this.loadBooks();
      },
      error: (err) => {
        console.error('Failed to delete book:', err);
        this.cancelDelete();
        this.cdr.markForCheck();
      }
    });
  }

  cancelDelete() {
    this.showDeleteConfirm = false;
    this.deleteBookId = null;
    this.deleteBookTitle = '';
    this.cdr.markForCheck();
  }

  resetForm() {
    this.editingId = null;
    this.showForm = false;
    this.formSubmitted = false;
    this.formErrors = {};
    this.formBook = {
      title: '',
      author: '',
      isbn: '',
      publicationDate: ''
    };
    this.cdr.markForCheck();
  }
}