import React from 'react';

//Components
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

import { useBookStoreContext } from '../../Utils/BookStore';

import './style.css';

function ViewBook() {
    const [state, dispatch] = useBookStoreContext();
    const book = state.currentBook;

    return (
        <>
            <Header />
            <Breadcrumb />
            <div className="viewDiv">
                <h1>{book.title}</h1>
                <p>{book.authors}</p>
                <img src={book.imgUrl} alt={`Cover of ${book.title}`} />
                <p>{book.description}</p>
                <a href={book.link} target="_blank">{`View ${book.title} on Google books.`}</a>
            </div>
            <Footer />
        </>
    )
}

export default ViewBook;