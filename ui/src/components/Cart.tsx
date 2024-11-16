import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { formatCurrency } from '../utils';

type Props = {};

const Cart: React.FC<Props> = () => {
  const { items } = useContext(CartContext);
  return (
    <div>
      <h1>Cart</h1>
      {items.length > 0 ? (
        <>
          {items.map((item) => (
            <div key={item.itemId}>
              <h2>
                {item.product.productName}: {item.itemName}
              </h2>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {formatCurrency(item.quantity * item.itemPrice)}</p>
            </div>
          ))}
          <hr />
          <form action="http://localhost:8080/create-checkout-session" method="POST">
            <button type="submit">Checkout</button>
          </form>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
