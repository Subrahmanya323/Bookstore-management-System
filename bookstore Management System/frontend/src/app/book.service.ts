import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Book {
  id?: number;
  name: string;
  author: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseURL = 'http://localhost:8086/api/v1/booklist'; // Update port if needed

  constructor(private httpClient: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.baseURL}`);
  }
  addBook(book:Book):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,book);
  }
  getBookById(id:number):Observable<Book>{
    return this.httpClient.get<Book>(`${this.baseURL}/${id}`);
  }
  updateBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${this.baseURL}/${book.id}`, book);
  }
  deleteBook(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
  
    }
