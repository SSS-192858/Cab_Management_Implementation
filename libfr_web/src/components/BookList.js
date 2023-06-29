import React from 'react';
import { useEffect, useState } from 'react';
import BookListItem from '../common/bookListItem';
import { getBooks } from '../services/user_services';

function BooksList() {
  const [books, setBooks] = useState([]);

  const getBooksComp = async () => {
    const response = await getBooks();
    setBooks(response)
  }

  useEffect(() => {
    getBooksComp()
  },[])
    
  return (
    <ul id="remove">
      {books.map((data) => (
        <li id="space" key= {data.bookCode}><BookListItem book={data}/></li>
      ))}
    </ul>
  );
}

export default BooksList;