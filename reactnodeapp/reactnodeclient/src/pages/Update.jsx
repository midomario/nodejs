import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


const Update = () => {
  let old = {
    title : "",
    desc : "",
    cover : ""
  }


  const getMyBook = async (myBookId) => {
       try {
         const result = await axios.get('http://localhost:8800/books/' + myBookId)
        console.log("result : " + JSON.stringify(result.data))
         
         old = result.data[0]
         console.log("old : " + JSON.stringify(old))
          // setBook(old)
         
      } catch(errors) {
        console.log(errors)
      }
  }

  const [book, setBook] = useState({
    title: old.title,
    desc:  old.desc,
    cover:  old.cover,
  });

  


  const navigate = useNavigate()
  const bookId = useLocation().pathname.split('/')[2]

  getMyBook(bookId)

  

  const handleChange = (e) => {
    setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
    
  }

    const handleClick = async e => {
      e.preventDefault()
      try {
        await axios.put('http://localhost:8800/books/'+bookId, book)
        navigate('/books')
      } catch(errors) {
        console.log(errors)
      }
  }

  console.log(book)
  
  return (
    <div className="form">
      <h1>Update book</h1>
      <input type="text" onChange={handleChange} name="title" placeholder='title' />
      <input type="text" onChange={handleChange} name="desc" placeholder='desc' />
      <input type="text" onChange={handleChange} name="cover" placeholder='cover' />
      <button onClick={handleClick}>Update</button>
    </div>
  );
}

export default Update;