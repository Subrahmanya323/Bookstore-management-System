import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book, BookService } from '../book.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  errorMessage: string = '';

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        console.log('Books fetched successfully:', data);
        this.books = data;
        this.filteredBooks = [...data]; // Initialize filtered books with all books
      },
      error: (error) => {
        console.error('Error fetching books:', error);
        this.errorMessage = 'Failed to load books. Please try again later.';
      },
    });
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredBooks = this.books.filter(book => 
      book.name.toLowerCase().includes(searchTerm) || 
      book.author.toLowerCase().includes(searchTerm)
    );
  }

  addBook() {
    this.router.navigate(['/add-Book']); // Navigate to add-book route
  }

  bookDetails(id: number): void {
    this.router.navigate(['book-details', id], {
      queryParams: { source: 'book' },
    });
  }

  updateBook(id: number): void {
    this.router.navigate(['update-book', id]);
  }

  deleteBook(id: number): void {
    // Show confirmation dialog before proceeding with delete
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    
    if (confirmDelete) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          console.log(`Book with ID ${id} deleted successfully.`);
          this.fetchBooks(); // Reload books after deletion
        },
        error: (error) => console.error('Error deleting book:', error),
      });
    } else {
      console.log('Book deletion cancelled.');
    }
  }

  getUniqueAuthors(): number {
    return new Set(this.books.map(book => book.author)).size;
  }

  getTotalValue(): number {
    return this.books.reduce((total, book) => total + book.price, 0);
  }
}
