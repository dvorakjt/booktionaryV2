import React, { useRef } from 'react';
import './style.css';
//context
import { useBookStoreContext } from '../../Utils/BookStore';

const axios = require('axios');


//scope refers to whether you are querying google books or 'my' (saved) books
function Searchbar({ scope }) {
    const [state, dispatch] = useBookStoreContext();

    const searchRef = useRef();

    async function onSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        if (scope === "google") {
            const searchTerm = searchRef.current.value;
            let searchResults = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&projection=full&key=AIzaSyBoWvSRWFtCmv6DnJkFjs5EKzzicpv7Ybg`);
            searchResults = searchResults.data.items;
            const books = searchResults.map(({ id, volumeInfo }) => {
                if (volumeInfo.imageLinks) {
                    return {
                        googleId: id,
                        authors: volumeInfo.authors,
                        description: volumeInfo.description,
                        title: volumeInfo.title,
                        imgUrl: volumeInfo.imageLinks.thumbnail,
                        link: volumeInfo.previewLink
                    }
                } else {
                    return {
                        googleId: id,
                        authors: volumeInfo.authors,
                        description: volumeInfo.description,
                        title: volumeInfo.title,
                        imgUrl: "No image available",
                        link: volumeInfo.previewLink
                    }
                }
            })
            dispatch({
                type: "UPDATE_SEARCHED_BOOKS",
                searchedBooks: books
            });
        }
        else if (scope === "mybooks") {
            const searchTerm = searchRef.current.value;
            dispatch({
                type: "UPDATE_FILTER",
                filter: searchTerm
            });
        }
    }

    return (
        <form>
            <label htmlFor="bookSearch">{scope === "google" ? "Search Google Books:" : "Search My Books:"}</label>
            <figure id="searchWrapper">
                <input type="text" id="bookSearch" name="bookSearch" ref={searchRef} />
                <button type="button" id="searchBtn"><i className="fas fa-search" onClick={onSubmit}></i></button>
            </figure>
        </form>
    )
}

export default Searchbar;