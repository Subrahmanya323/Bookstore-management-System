
package net.javaguides.springboot.model;

import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name = "booklist")
public class Book {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "Name")
	private String Name;

	@Column(name = "Author")
	private String Author;
	
	@Column(name = "Price", precision = 10, scale = 2)
	private BigDecimal Price;
	
	public Book() {
		
	}
	
	public Book(String Name, String Author, BigDecimal Price) {
		super();
		this.Name = Name;
		this.Author = Author;
		this.Price = Price;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return Name;
	}
	public void setName(String Name) {
		this.Name = Name;
	}
	public String getAuthor() {
		return Author;
	}
	public void setAuthor(String Author) {
		this.Author = Author;
	}
	public BigDecimal getPrice() {
		return Price;
	}
	public void setPrice(BigDecimal Price) {
		this.Price = Price;
	}
}
