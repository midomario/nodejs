import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Add = () => {
  const [book, setBook] = useState({
    title: '',
    desc: '',
    cover: '',
  });

  const navigate =  useNavigate()

  const handleChange = (e) => {
    setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
    
  }

    const handleClick = async e => {
      e.preventDefault()
      try {
        await axios.post('http://localhost:8800/books', book)
        navigate('/books')
      } catch(errors) {
        console.log(errors)
      }
  }

  console.log(book)
  
  return (
    <div className="form">
      <h1>add book</h1>
      <input type="text" onChange={handleChange} name="title" placeholder='title' />
      <input type="text" onChange={handleChange} name="desc" placeholder='desc' />
      <input type="text" onChange={handleChange} name="cover" placeholder='cover' />
      <button onClick={handleClick}>Save</button>
    </div>
  );
}

export default Add;