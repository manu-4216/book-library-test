import React, { Fragment } from 'react';
import BookLayout from '../BookLayout';
import { Button, Icon } from 'semantic-ui-react';
import { addToCart } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.css';

const FilteredBooks = ({
    filteredBooks,
    isFilterActive,
    cartIsbns,
    addToCart,
    removeFromCart
}) => (
    <Fragment>
        {isFilterActive && (
            <div className="Books-Filtered-Number">
                {filteredBooks.length} results found
            </div>
        )}
        <ul className="List-Books">
            {filteredBooks.map((book, key) => (
                <BookLayout book={book} key={key}>
                    {/* Visual feedback for added to cart book */}
                    {cartIsbns.includes(book.isbn) ? (
                        <Fragment>
                            <div className="Books-Filtered-Confirmation">
                                <Icon name="checkmark" color="green" />Added to
                                cart
                            </div>
                            <Link to="/cart">
                                <Button color="green">Proceed to cart</Button>
                            </Link>
                        </Fragment>
                    ) : (
                        /* Call to action to add the item to the cart */
                        <Button
                            basic
                            color="green"
                            onClick={() => addToCart(book.isbn)}
                        >
                            Add to Cart
                        </Button>
                    )}
                </BookLayout>
            ))}
        </ul>
    </Fragment>
);
const mapStateToProps = state => ({ cartIsbns: state.cartIsbns });
export default connect(mapStateToProps, { addToCart })(FilteredBooks);
