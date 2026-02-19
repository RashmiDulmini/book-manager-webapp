import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

type BookForm = {
  title: string;
  author: string;
  isbn: string;
  publicationDate: string; // yyyy-mm-dd for <input type="date">
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
    const payload = { ...this.formBook };

    if (this.editingId === null) {
      this.bookService.addBook(payload).subscribe({
        next: () => {
          this.resetForm();
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
          this.loadBooks();
        },
        error: (err) => {
          console.error('Failed to update book:', err);
          this.cdr.markForCheck();
        }
      });
    }
  }

  edit(book: Book) {
    this.editingId = book.id;

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

  delete(id: number) {
    if (!confirm('Are you sure you want to delete this book?')) return;

    this.bookService.deleteBook(id).subscribe({
      next: () => this.loadBooks(),
      error: (err) => {
        console.error('Failed to delete book:', err);
        this.cdr.markForCheck();
      }
    });
  }

  resetForm() {
    this.editingId = null;
    this.formBook = {
      title: '',
      author: '',
      isbn: '',
      publicationDate: ''
    };
    this.cdr.markForCheck();
  }
}