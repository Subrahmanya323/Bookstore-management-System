import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book, BookService } from '../book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userbook-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userbook-list.component.html',
  styleUrls: ['./userbook-list.component.css'],
})
export class UserbookListComponent implements OnInit {
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
        this.filteredBooks = [...this.books]; // Initialize filteredBooks with all books
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

  bookDetails(id: number): void {
    this.router.navigate(['book-details', id], {
      queryParams: { source: 'userbook' },
    });
  }
}
