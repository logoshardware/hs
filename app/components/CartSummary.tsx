interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  // ...inne pola jeśli masz
}

interface CartSummaryProps {
  cart: CartItem[];
}

export default function CartSummary({ cart }: CartSummaryProps) {
  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {/* tutaj renderujesz produkty */}
        </ul>
      )}
    </div>
  );
}
