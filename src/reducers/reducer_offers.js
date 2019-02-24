import { FETCH_OFFERS } from '../actions';

const BooksReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_OFFERS:
            return action.payload.data.offers;
        default:
    }
    return state;
};

export default BooksReducer;
