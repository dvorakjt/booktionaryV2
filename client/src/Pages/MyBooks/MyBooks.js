import React, { useEffect } from 'react';

//Components
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';
import Header from '../../Components/Header/Header';
import Searchbar from '../../Components/Searchbar/Searchbar';
import BookTable from '../../Components/BookTable/BookTable';
import Footer from '../../Components/Footer/Footer';

import { useBookStoreContext } from '../../Utils/BookStore';

const axios = require('axios');

//determine the correct port
let PORT = process.env.PORT || 'http://localhost:3001';
if (process.env.PORT) { PORT = "" };

function MyBooks() {
    const [state, dispatch] = useBookStoreContext();

    useEffect(() => {
        async function fetchData() {
            if (state.myBooks.length < 1) {
                try {
                    const response = await axios.get(PORT + '/api/getbooks');
                    dispatch({
                        type: "UPDATE_MY_BOOKS",
                        myBooks: response.data
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <Header />
            <Breadcrumb />
            <Searchbar scope="mybooks" />
            <BookTable books={state.myBooks.filter(book => book.title.includes(state.filter))} myBooks={state.myBooks} />
            <Footer />
        </>
    )
}

export default MyBooks;