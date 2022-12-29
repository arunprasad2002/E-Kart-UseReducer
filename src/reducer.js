const reducer = (state, action) => {
  if (action.type === 'ADD_TO_CART') {
    // if cart is empty the add product
    const searchItem = state.cart.some((item) => item.id === action.payload.id)
    if (state.cart.length === 0 || searchItem === false) {
      return { ...state, cart: [...state.cart, action.payload] }
    }

    return {
      ...state,
      cart: [...state.cart].map((product) => {
        if (product.id === action.payload.id) {
          return { ...product, qty: product.qty + 1 }
        }
        return product
      }),
    }
  }
  if (action.type === 'GET_TOTALS') {
    let totalPrice = 0
    let totalQty = 0
    state.cart.map((product) => {
      const price = product.price * product.qty
      totalPrice += price
      totalQty += product.qty
    })

    return { ...state, amount: totalQty, total: totalPrice }
  }

  return state
}

export default reducer