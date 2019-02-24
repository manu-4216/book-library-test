import React from 'react';
import Expandable from '../Expandable';
import './style.css';

// This component allows for the Books to be displayed both in:
//     1) BooksIndex > FilteredBooks
// and 2) Cart
// The action to display is passed as children
const BookLayout = ({ book, children }) => (
    <div className="Book Card" key={book.isbn}>
        <img src={book.cover} className="Book-Image" alt="book cover" />

        <div className="Book-Info">
            <div className="Book-Header">{book.title}</div>
            <div className="Book-ISBN">ISBN: {book.isbn}</div>
            <div className="Book-Price">Price: {book.price} €</div>

            <Expandable
                // Break the synopsis array into multiple paragraphs
                content={book.synopsis.map((row, key) => (
                    <p key={key}>{row}</p>
                ))}
            />

            {/* Customizable action */}
            <div className="Book-Action">{children}</div>
        </div>
    </div>
);

export default BookLayout;
