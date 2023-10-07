import React from 'react'
import { useEffect, useState } from "react";
import   axios    from "axios";
import { Link } from 'react-router-dom'

const Books = () => {
  const [books , setBooks] = useState([])

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const result = await axios.get('http://localhost:8800/books')
        console.log(result)
        setBooks(result.data)
      } catch (error) {
        console.log('error : ' + error)
      }
    }
    fetchAllBooks();
  }, []);// const Books

  return (
    <div className='all'>
      <h1>All books</h1>
     <div className="Books">
        {books.map(book => (
              <div className="flex-1" key={book.id}>
                  {book.cover && <img src={book.cover} alt={book.title} />}
                  <h3 className="underline">{  book.title }</h3>
            <p>{book.desc}</p>
          </div>
          ))
        }

       
      </div>

       <button>
          <Link to="/add">Add new BOOK</Link>
        </button>
    </div>
  );
}

export default Books;