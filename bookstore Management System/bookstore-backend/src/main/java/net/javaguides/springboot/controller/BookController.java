package net.javaguides.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Book;
import net.javaguides.springboot.repository.BookRepository;

@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:58714"})
@RestController
@RequestMapping("/api/v1/")

public class BookController {

	@Autowired
	private BookRepository bookRepository;
	
	// get all employees
	@GetMapping("/booklist")
	public List<Book> getAllBooks(){
		return bookRepository.findAll();
	}		
	
	// create employee rest api
	@PostMapping("/booklist")
	public Book addBook(@RequestBody Book book) {
		return bookRepository.save(book);
	}
	
	// get employee by id rest api
	@GetMapping("/booklist/{id}")
	public ResponseEntity<Book> getBookById(@PathVariable Long id) {
		Book book =bookRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Book is not exist with id :" + id));
		return ResponseEntity.ok(book);
	}
	
	// update employee rest api
	
	@PutMapping("/booklist/{id}")
	public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails){
		Book book = bookRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Book is not exist with id :" + id));
		
		book.setName(bookDetails.getName());
		book.setAuthor(bookDetails.getAuthor());
		book.setPrice(bookDetails.getPrice());
		
		Book updatedBook = bookRepository.save(book);
		return ResponseEntity.ok(updatedBook);
	}
	
	// delete employee rest api
	@DeleteMapping("/booklist/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteBook(@PathVariable Long id){
		Book book = bookRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Book is not exist with id :" + id));
		
		bookRepository.delete(book);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
}
