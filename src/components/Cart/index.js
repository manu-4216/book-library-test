import React, { Component, Fragment } from 'react';
import BookLayout from '../BookLayout';
import TotalPrice from './TotalPrice';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './style.css';
import { fetchOffers, removeFromCart } from '../../actions';
import { withLoadingAndError } from '../HOC';

class Cart extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
            error: null
        };

        this.triggerFetch = this.triggerFetch.bind(this);
    }

    componentDidMount() {
        this.triggerFetch();
    }

    componentDidUpdate(prevProps, prevState) {
        // Get the new best offer when the cart has an item removed
        if (prevProps.cartIsbns.length > this.props.cartIsbns.length) {
            this.triggerFetch();
        }
    }

    triggerFetch() {
        const { cartIsbns, fetchOffers } = this.props;
        if (!cartIsbns.length) {
            return;
        }

        this.setState({ isLoading: true });
        fetchOffers(cartIsbns)
            .catch(error => {
                this.setState({ error: 'Could not get the data' });
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    handleRemove(isbn) {
        const { removeFromCart } = this.props;

        removeFromCart(isbn);
    }

    render() {
        const { isLoading, error } = this.state;
        const { booksInCart, bestOffer } = this.props;

        return (
            <div className="Cart-Body">
                {!booksInCart.length ? (
                    <div>Your cart is empty</div>
                ) : (
                    <Fragment>
                        {booksInCart.map((book, key) => (
                            <BookLayout book={book} key={key}>
                                <Button
                                    basic
                                    color="red"
                                    onClick={() => this.handleRemove(book.isbn)}
                                >
                                    Remove from Cart
                                </Button>
                            </BookLayout>
                        ))}

                        <div className="Price-Group-Container">
                            <TotalPriceWithLoadingAndError
                                isLoading={isLoading}
                                error={error}
                                bestOffer={bestOffer}
                            />
                        </div>

                        <Link to="/payment">
                            <Button color="blue">Payment</Button>
                        </Link>
                    </Fragment>
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ books, cartIsbns, offers }) => {
    const booksInCart = books.filter(book => cartIsbns.includes(book.isbn));

    return {
        booksInCart,
        cartIsbns,
        offers,
        bestOffer: getBestOffer(
            booksInCart.reduce((total, book) => total + book.price, 0),
            offers
        )
    };
};

// Return the best (lowest) final calculated price from the available offers
const getBestOffer = (totalPrice, offers) => {
    // Define the starting values of the best offer (original price if none)
    let bestOffer = {
        priceWithOffer: totalPrice,
        originalPrice: totalPrice,
        offeredPriceCut: 0,
        offer: null
    };

    offers.forEach(offer => {
        let priceWithOffer;

        // Update the best offer details for each available offer type
        const updateBestOffer = () => {
            const round = number => Math.round(number * 100) / 100;

            if (priceWithOffer < totalPrice) {
                bestOffer.priceWithOffer = priceWithOffer;
                bestOffer.offer = offer;
                bestOffer.offeredPriceCut = round(totalPrice - priceWithOffer);
            }
        };

        switch (offer.type) {
            case 'percentage':
                priceWithOffer = totalPrice * (100 - offer.value) * 0.01;
                break;
            case 'minus':
                priceWithOffer = totalPrice - offer.value;
                break;
            case 'slice':
                const numberOfSlices = Math.floor(
                    totalPrice / offer.sliceValue
                );
                priceWithOffer = totalPrice - numberOfSlices * offer.value;
                break;
            default:
        }

        updateBestOffer(priceWithOffer);
    });

    return bestOffer;
};

const TotalPriceWithLoadingAndError = withLoadingAndError(TotalPrice);

export default connect(mapStateToProps, { fetchOffers, removeFromCart })(Cart);
