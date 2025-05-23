import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../book.service';
import { Router } from '@angular/router';


// Book model
export interface Book {

  name: string;
  author: string;
  price: number;
}

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  // Initialize book object with default values, including id
  book: Book = {
          // Default id value (can be updated as needed)
    name: '',
    author: '',
    price: 0
  };

  constructor( private bookService:BookService,
               private router:Router) {}

  ngOnInit(): void {
    // Additional initialization logic can go here
  }
  saveBook(){
    this.bookService.addBook(this.book).subscribe(data =>{
      console.log(data);
      this.goToBookList();
    },
    error =>console.log(error)
    );
    
  
  }
  goToBookList(){
    this.router.navigate(['/book']);
  }

  onSubmit() {
    console.log('Book Details:', this.book);
    this.saveBook();
    // Submit logic (e.g., sending the book data to a backend)
  }
}
