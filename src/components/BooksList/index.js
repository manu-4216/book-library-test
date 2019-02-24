import React, { Component } from 'react';
import FilteredBooks from '../FilteredBooks';
import { fetchBooks } from '../../actions';
import { connect } from 'react-redux';
import { withLoadingAndError } from '../HOC';

const FilteredBooksWithLoadingAndError = withLoadingAndError(FilteredBooks);

const getFilteredBooks = (books, searchQuery) => {
    // Return only the books matching the book title
    return books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
};

class BooksList extends Component {
    // Handle loading and error state locally. No need to use the global redux store for it
    state = {
        isLoading: false,
        error: null
    };

    componentDidMount() {
        // Only fetch the books if they haven't been already fetched before
        if (!this.props.books.length) {
            this.setState({ isLoading: true });
            this.props
                .fetchBooks()
                .catch(error => {
                    this.setState({ error: 'Could not get the data' });
                })
                .finally(() => {
                    this.setState({ isLoading: false });
                });
        }
    }

    render() {
        const { isLoading, error } = this.state;
        const { books, searchQuery } = this.props;

        return (
            <FilteredBooksWithLoadingAndError
                isLoading={isLoading}
                error={error}
                isFilterActive={searchQuery !== ''}
                filteredBooks={getFilteredBooks(books, searchQuery)}
            />
        );
    }
}

const mapStateToProps = state => ({ books: state.books });

export default connect(mapStateToProps, { fetchBooks })(BooksList);
