import { CartIcon } from "../../CartIcon/CartIcon";

export default function MiniShoppingCart({ totalItems, size }) {
  const numericSize = parseFloat(size);
  const unit = size.replace(/[0-9.]/g, '');
  const fontSize = `${numericSize / 3}${unit}`;

  return (
    <div className="miniShoppingCard  inline-flex-row">
      <CartIcon count={totalItems} size={size} />
      <p style={{ 
        fontSize: `${fontSize}`,
        display: "flex",
        alignItems: "center",
        color: "white",
        }}
      >
        Cart
      </p>
    </div>
  );
};