import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router,Route } from '@angular/router';
import { Book, BookService } from '../book.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  id: number = 0;
  book: Book = {
    name: '',
    author: '',
    price: 0,
  };
  sourcePage: string = '';
  showPurchaseDialog: boolean = false;
  isUser: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    // Check if the current user is a regular user (not admin)
    const userRole = localStorage.getItem('role');
    this.isUser = userRole === 'user';

    // Retrieve book ID and source page
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.route.queryParams.subscribe((params) => {
      this.sourcePage = params['source'] || '';
    });

    // Fetch book details
    this.bookService.getBookById(this.id).subscribe({
      next: (data) => {
        this.book = data;
      },
      error: (error) => console.error('Error fetching book:', error),
    });
  }

  navigateBack(): void {
    // Navigate back to the respective list
    if (this.sourcePage === 'book') {
      this.router.navigate(['/book']);
    } else if (this.sourcePage === 'userbook') {
      this.router.navigate(['/userbook']);
    } else {
      console.warn('Source page not found, navigating to home.');
      this.router.navigate(['/']);
    }
  }

  buyBook(): void {
    this.showPurchaseDialog = true;
  }

  confirmPurchase(): void {
    // Here you would typically call a backend service to process the purchase
    // For now, we'll just show a success message and close the dialog
    alert('Purchase successful! Thank you for buying ' + this.book.name);
    this.showPurchaseDialog = false;
  }

  cancelPurchase(): void {
    this.showPurchaseDialog = false;
  }
}
