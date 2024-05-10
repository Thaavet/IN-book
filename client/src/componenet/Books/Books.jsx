import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './books.css';

const BookDetails = ({ book, onClose }) => {
  return (
    <div className="book-details">
      <p>{book.author}</p>
      <p>{book.category}</p>
      <button onClick={onClose} className="close-btn">Close</button>
    </div>
  );
};

const Books = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [authorFilter, setAuthorFilter] = useState('');
  const [titleFilter, setTitleFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/books')
      .then((res) => {
        setBooks(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInfoClick = (book) => {
    if (selectedBook === book) {
      setSelectedBook(null); // Deselect the book if clicked again
    } else {
      setSelectedBook(book); // Select the clicked book
    }
  };

  const applyFilters = (book) => {
    if (authorFilter && !book.author.toLowerCase().includes(authorFilter.toLowerCase())) {
      return false;
    }
    if (titleFilter && !book.title.toLowerCase().includes(titleFilter.toLowerCase())) {
      return false;
    }
    if (categoryFilter && book.category.toLowerCase() !== categoryFilter.toLowerCase()) {
      return false;
    }
    return true;
  };

  const filteredBooks = books.filter(applyFilters);

  return (
    <>
      <div className="book-pgtitle">
        <h1>Our Books</h1>
        <div className='filter-container'>
          <input
            type="text"
            placeholder="Filter by Title"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by Author"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
          />
          <select id="category-filter" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="">All categories</option>
            <option value="Pedagogia">Pedagogia</option>
            <option value="Psicologia ">Psicologia</option>
            <option value="Riviste">Riviste</option>
            <option value="Sport">Sport</option>
            <option value="Biografia">Biografia</option>
            <option value="Romanzo">Romanzo</option>
          </select>
        </div>
      </div>
      <div className="book-list">
        {filteredBooks.map((book) => (
          <div key={book._id}>
            <div className="bookcard">
              <img src="https://cdn-icons-png.flaticon.com/512/5402/5402751.png" alt="book cover" />
              <div className="book-info">
                <h3>{book.title}</h3>
                {selectedBook === book && (
                  <BookDetails book={selectedBook} onClose={() => setSelectedBook(null)} />
                )}
              </div>
              <div className="book-actions">
                <button onClick={() => handleInfoClick(book)} className="info-btn">Info</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Books;