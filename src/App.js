import React from "react";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CardProvider";
import Modal from "./components/UI/Modal";
import classes from "./components/Cart/Cart.module.css";
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [wereMealsOrdered, setWereMealsOrdered] = useState(false);
  const [orderContent, setOrderContent] = useState('');
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  const orderMealsFeedback = () => {
    setWereMealsOrdered(true);
    setOrderContent('You have ordered meals');
  };
  const orderMealsErrorFeedback = (errorMessage) => 
  { setWereMealsOrdered(true);
    setOrderContent(errorMessage);
  }
  const closeOrderMealsFeedback = () => {
    setWereMealsOrdered(false);
  }

  return (
    <CartProvider>
      {cartIsShown && (
        <Cart onHideCart={hideCartHandler} onOrder={orderMealsFeedback} onOrderError={orderMealsErrorFeedback} />
      )}
      {wereMealsOrdered && (
        <Modal onClick={closeOrderMealsFeedback}>
          <p style={{ textAlign: "center", fontSize: "30px" }}>
            {orderContent}
          </p>
          <div>
          <button className={`${classes["button--alt"]} ${classes.closeOrder}` } onClick={closeOrderMealsFeedback}>
          Close
        </button>
        </div>
        </Modal>
      )}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
