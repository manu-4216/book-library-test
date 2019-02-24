import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import BooksList from '../BooksList';
import './style.css';

class BooksIndex extends Component {
    // Handle 'searchQuery' lifecycle localy, since only BooksList needs to know about it
    state = { searchQuery: '' };

    render() {
        const { searchQuery } = this.state;
        return (
            <div className="Book-Index">
                <Input
                    className="Search-Input"
                    icon="search"
                    placeholder="Search..."
                    onChange={(e, data) => {
                        this.setState({ searchQuery: data.value });
                    }}
                />
                <BooksList searchQuery={searchQuery} />
            </div>
        );
    }
}

export default BooksIndex;
