import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book, BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent implements OnInit {
  id: number=0; // Holds the book ID from the route
  book: Book = {
    name: '',
    author: '',
    price: 0,
  };

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router // To navigate after updating
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']; // Get the book ID from route parameters
    this.bookService.getBookById(this.id).subscribe({
      next: (data) => {
        this.book = data; // Populate the form with book data
      },
      error: (error) => console.log('Error fetching book:', error),
    });
  }

  onSubmit(): void {
    this.bookService.updateBook(this.book).subscribe({
      next: (data) => {
        console.log('Book updated successfully:', data);
        this.router.navigate(['/book']); // Navigate back to the book list
      },
      error: (error) => console.log('Error updating book:', error),
    });
  }
}
