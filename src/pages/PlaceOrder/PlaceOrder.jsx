import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const [orderSuccess, setOrderSuccess] = useState(false); // State to track order success

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setOrderSuccess(true); // Show success message
  };

  return (
    <div>
      {!orderSuccess ? (
        <form className='place-order' onSubmit={handleOrderSubmit}>
          <div className="place-order-left">
            <p className="title">Deliver Information</p>
            <div className="multi-fields">
              <input type="text" placeholder='First name' required />
              <input type="text" placeholder='Last name' required />
            </div>
            <input type="email" placeholder='Email address' required />
            <input type="text" placeholder='Street' required />
            <div className="multi-fields">
              <input type="text" placeholder='City' required />
              <input type="text" placeholder='State' required />
            </div>
            <div className="multi-fields">
              <input type="text" placeholder='Zip Code' required />
              <input type="text" placeholder='Country' required />
            </div>
            <input type="text" placeholder='Phone number' required />
          </div>
          <div className="place-order-right"></div>
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </form>
      ) : (
        <div className="order-success">
          <h2>Ordered Successfully!</h2>
          <p>Thank you for your order. Your food will be delivered shortly.</p>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;