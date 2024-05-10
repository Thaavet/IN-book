import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [newBook, setNewBook] = useState({
    _id: '',
    title: '',
    author: '',
    category: '',
    img: '',
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/books');
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setNewBook({
      _id: book._id,
      title: book.title,
      author: book.author,
      category: book.category,
      img: book.img,
    });
  };

  const handleBookCreate = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/v1/books', newBook);
      setBooks([...books, res.data]);
      setNewBook({
        _id: '',
        title: '',
        author: '',
        category: '',
        img: '',
      });
    } catch (err) {
      console.error(err) 
      ;
      if (err.response.status === 401) alert('Failed to create book, you are not an admin', err);
    }
  };

  const handleBookUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/v1/books/${selectedBook._id}`, newBook);
      setBooks(
        books.map((book) =>
          book._id === selectedBook._id ? { ...book, ...newBook } : book
        )
      );
      setSelectedBook(null);
      setNewBook({
        _id: '',
        title: '',
        author: '',
        category: '',
        img: '',
      });
    } catch (err) {
      console.error(err);
      if (err.response.status === 401) alert('Failed to update book, you are not an admin', err);
    }
  };

  const handleBookDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/books/${selectedBook._id}`);
      setBooks(books.filter((book) => book._id !== selectedBook._id));
      setSelectedBook(null);
    } catch (err) {
      console.error(err);
      if (err.response.status === 401) alert('Failed to delete book, you are not an admin', err);
    }
  };

  return (
    <div className='book-pgtitle '>
      <h1>Book Dashboard</h1>

  <div className="filter-container">
  <h2>Create a new book:</h2>
  <form onSubmit={(e) => {
    e.preventDefault();
    handleBookCreate();
  }}>
    <input
      type="text"
      placeholder="Title"
      value={newBook.title}
      onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
    />
    <input
      type="text"
      placeholder="Author"
      value={newBook.author}
      onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
    />
    <input
      type="text"
      placeholder="Category"
      value={newBook.category}
      onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
    />
    <input
      type="text"
      placeholder="Image URL"
      value={newBook.img}
      onChange={(e) => setNewBook({ ...newBook, img: e.target.value })}
    />
    <button className='info-btn' type="submit">Create</button>
  </form>
</div>

  {selectedBook && (
        <div className='filter-container'>
          <h2>Edit book:</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleBookUpdate();
          }}>
            <input
              type="text"
              placeholder="Title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Author"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              value={newBook.category}
              onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newBook.img}
              onChange={(e) => setNewBook({ ...newBook, img: e.target.value })}
            />
            
            <button className='info-btn' type="submit">Update</button>
          </form>
          <button className='close-btn' onClick={handleBookDelete}>Delete</button>
        

        </div>
      )}

  <h2>Books:</h2>
      
  <div className='book-list'>
     
        {books.map((book) => (
          <div className="bookcard">
         <div key={book._id} onClick={() => handleBookSelect(book)}>
            {book.title} by {book.author}

          </div>
          </div>
        ))}
    
    </div>


    </div>
  )
}

export default Dashboard