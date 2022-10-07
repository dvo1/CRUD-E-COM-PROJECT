import React from 'react'
import Cartitem from './Cartitem'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../features/cart/cartSlice'
import { openModal } from '../features/modal/modalSlice'



const CartContainer = () => {
    const { cartItems, amount, total } = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    if (amount < 1) {
        return (
            <section className='cart'>
                <header>
                    <h2>your bag</h2>
                    <h4 className='empty-cart'>is currently empty</h4>
                </header>
            </section>
        )
    }
    
    return (
        <section className='cart'>
            <header>
                <h2>your bag</h2>
            </header>
            <div>
                {cartItems.map((item) => {
                    
                    return <Cartitem key={item.id} {...item} />
                })}
            </div>
            <footer>
                <hr />
                <div className='cart-total'>
                    <h4 >total <span>${total.toFixed(2)}</span></h4>
                </div>
                <button
                    className='btn clear-btn'
                    onClick={() => {
                        // dispatch(clearCart())
                        dispatch((openModal()))
                    }}
                >
                    clear cart
                </button>
            </footer>
        </section>
    )
}

export default CartContainer