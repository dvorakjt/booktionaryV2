import React from 'react';
import './style.css';
import { Link } from "react-router-dom";

//context
import { useBookStoreContext } from '../../Utils/BookStore';

//determine the correct port
let PORT = process.env.PORT || 'http://localhost:3001';
if (process.env.PORT) { PORT = "" };

const axios = require('axios');

function BookTable({ books, myBooks }) {
    const [state, dispatch] = useBookStoreContext();

    async function handleAdd(bookIndex) {
        try {
            const post = await axios.post(PORT + '/api/addbook', { ...books[bookIndex], authors: books[bookIndex].authors.join(", ") });
            const response = await axios.get(PORT + '/api/getbooks');
            dispatch({
                type: "UPDATE_MY_BOOKS",
                myBooks: response.data
            });
        } catch (error) {
            console.error(error);
        }

    }

    async function handleDelete(bookIndex) {
        try {
            const deletion = await axios.delete(PORT + `/api/delete/${books[bookIndex].googleId}`);
            const response = await axios.get(PORT + '/api/getbooks');
            dispatch({
                type: "UPDATE_MY_BOOKS",
                myBooks: response.data
            });
        } catch (error) {
            console.error(error);
        }

    }

    function handleView(bookIndex) {
        dispatch({
            type: "UPDATE_CURRENT_BOOK",
            currentBook: books[bookIndex]
        });
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Authors</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => {
                    return (
                        <tr key={index.toString()}>
                            <td><a href={book.link} target="_blank"><img src={book.imgUrl} alt={`Cover of ${book.title}`} /></a></td>
                            <td><a href={book.link} target="_blank">{book.title}</a></td>
                            <td>{book.authors}</td>
                            <td><Link to="/viewbook"><button type="button" className="viewBtn" onClick={() => { handleView(index) }} title="View this book."><i className="fas fa-eye"></i></button></Link></td>
                            <td>
                                {(() => {
                                    let bookAdded = false;
                                    if (myBooks.length > 0) {
                                        myBooks.forEach(({ googleId }) => {
                                            if (googleId === book.googleId) {
                                                bookAdded = true;
                                            }
                                        })
                                    }
                                    if (!bookAdded) {
                                        return <button className="addBtn" onClick={() => { handleAdd(index) }} title="Add this book."><i className="fas fa-plus"></i></button>
                                    } else {
                                        return <button className="deleteBtn" title="Remove this book." onClick={() => { handleDelete(index) }}><i className="fas fa-times"></i></button>
                                    }
                                })()}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default BookTable;