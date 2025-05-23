import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from '../book-list/book-list.component'; // Import the standalone component
import { BookService } from '../book.service';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutes } from '../app.routes';
import { AddBookComponent } from '../add-book/add-book.component';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UpdateBookComponent } from '../update-book/update-book.component';
import { BookDetailsComponent } from '../book-details/book-details.component';

@NgModule({
  imports: [
    CommonModule,  // Import necessary Angular modules
    BookListComponent, 
    AppRoutes,
    AddBookComponent,
    RouterOutlet,
    FormsModule,
    UpdateBookComponent,
    BookDetailsComponent
    
  ],
  providers: [
    BookService,
    provideHttpClient() // Provide HttpClient using the new API
  ],
})
export class BookmoduleModule {}
