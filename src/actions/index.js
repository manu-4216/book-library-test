import axios from 'axios';

export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_OFFERS = 'FETCH_OFFERS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const ROOT_URL = `http://henri-potier.xebia.fr`;

export const fetchBooks = () => {
    const url = `${ROOT_URL}/books`;
    const request = axios.get(url);

    return {
        type: FETCH_BOOKS,
        payload: request
    };
};

export const fetchOffers = cartIsbns => {
    const url =
        `${ROOT_URL}/books/` + cartIsbns.join(',') + '/commercialOffers';
    const request = axios.get(url);

    return {
        type: FETCH_OFFERS,
        payload: request
    };
};

export const addToCart = isbn => {
    return {
        type: ADD_TO_CART,
        payload: isbn
    };
};
export const removeFromCart = isbn => {
    return {
        type: REMOVE_FROM_CART,
        payload: isbn
    };
};
