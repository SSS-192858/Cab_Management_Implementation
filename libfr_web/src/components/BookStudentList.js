import React from 'react';
import { useEffect, useState } from 'react';
import { BookStudentListItem } from '../common/BookStudentListItem';
import { getBooksStudents, getBooksStudentsByBookCode, getBooksStudentsByStudentId } from '../services/user_services';
import { getBookFromStorage, getStudentFromStorage } from '../services/localStorageHandler';

const BookStudentList = ({choice}) => {
  const [bookStudents, setBookStudents] = useState([]);
  var book = null;
  var student = null;

  const getRecords = async () => {
    if (choice === 1){
        const response = await getBooksStudents();
        setBookStudents(response);
    }else if (choice === 2){
        student = getStudentFromStorage();
        const response = await getBooksStudentsByStudentId(student.id);
        setBookStudents(response);
    }else if (choice === 3){
        book = getBookFromStorage();
        const response = await getBooksStudentsByBookCode(book.bookCode);
        setBookStudents(response);
    }
  }

  useEffect(() => {
    getRecords();
  },[])
    
  return (
    <ul id="remove">
      {bookStudents.map((data) => (
        <li id="space" key= {data.slno}><BookStudentListItem bookStudent={data}/></li>
      ))}
    </ul>
  );
}

export default BookStudentList;