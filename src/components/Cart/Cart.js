import { useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = item => {
    cartCtx.addItem({...item, amount: 1});
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
 
  const submitOrderedMeals = async () => {
    try {
      const orderedMealsList = cartCtx.items;
      console.log(orderedMealsList)
      const response = await fetch('https://react-http-36eb5-default-rtdb.firebaseio.com/orderedMeals.json', {
        method: 'POST',
        body: JSON.stringify(orderedMealsList),
        headers: {
          'Content-Type': 'application/json'
        }   
      });
      if(!response.ok) {
        throw new Error('We could not accept your order, please try again');
      }
      cartCtx.clearCart();
      props.onOrder();
      props.onHideCart();
      
    }
    catch(err) {
      props.onOrderError(err.message);
      props.onHideCart();
    }
 
  }

  return (
    <Modal onClick={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItems && <button onClick={submitOrderedMeals} className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
