import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions';

const CartReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return [].concat(state, action.payload);
        case REMOVE_FROM_CART:
            return state.filter(item => item !== action.payload);
        default:
    }
    return state;
};

export default CartReducer;
