import React from 'react'
import CartContainer from './components/CartContainer'
import Navbar from './components/Navbar'
import { useEffect } from 'react'
import { calculateTotals, getCartItems } from './features/cart/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import Modal from './components/Modal'
const App = () => {
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems]);

  useEffect(() => {
    dispatch((getCartItems()))
  }, []);

  if(isLoading) {
    return (
      <div className='loading'>
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <main>
     {isOpen && <Modal />} 
      <Navbar />
      <CartContainer />

    </main>
  )
}

export default App