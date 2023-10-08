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


  const deleteHandler = async (id) => {
       try {
        const result = await axios.delete('http://localhost:8800/books/'+id)
         console.log(result)
         window.location.reload()
      } catch (error) {
        console.log('error : ' + error)
      }
  }


  return (
    <div className='all'>
      <h1>All books</h1>
     <div className="Books">
        {books.map(book => (
              <div className="flex-1" key={book.id}>
                  {book.cover && <img src={book.cover} alt={book.title} />}
                  <h3 className="underline">{  book.title }</h3>
            <p>{book.desc}</p>
             <button className='btn'>
               <Link to={`/update/${book.id}`}>EDIT</Link>
            </button>
            <button onClick={()=>deleteHandler(book.id)} className='btn'>
              DELETE
            </button>
          </div>
          ))
        }
       
      </div>
       <button className='add'>
          <Link to="/add">Add new BOOK</Link>
        </button>
    </div>
  );
}

export default Books;