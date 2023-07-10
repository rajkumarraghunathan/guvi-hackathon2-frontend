export const addToCart = (product) => {
    return {
        type: 'ADD_TO_CART',
        data: product
    }
}

export const removeFromCart = (product) => {
    return {
        type: 'REMOVE_FROM_CART',
        data: product
    }
};

export const emptyCart = () => {
    return {
        type: 'EMPTY_CART'
    }
}