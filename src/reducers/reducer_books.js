import { FETCH_BOOKS } from '../actions';

const BooksReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_BOOKS:
            return action.payload.data;
        default:
    }
    return state;
};

export default BooksReducer;
