import { combineReducers } from 'redux';
import BooksReducer from './reducer_books';
import OffersReducer from './reducer_offers';
import CartReducer from './reducer_cart';

const rootReducer = combineReducers({
    books: BooksReducer,
    cartIsbns: CartReducer,
    offers: OffersReducer
});

export default rootReducer;
