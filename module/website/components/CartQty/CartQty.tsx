import { BiMinus, BiPlus } from "react-icons/bi";
import styles from "./CartQty.module.css";
interface CartQtyProps {
  quantity: number;
  decrementFunction: (event: React.MouseEvent<HTMLButtonElement>) => void;
  incrementFunction: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const CartQty = ({
  quantity,
  decrementFunction,
  incrementFunction,
}: CartQtyProps) => {
  return (
    <div className="flex items-center justify-center gap-6">
      <button
        className={styles.product__counter_btn}
        onClick={decrementFunction}
      >
        <BiMinus />
      </button>
      <div className={styles.product__counter_text + " font-fugaz"}>
        {quantity}
      </div>

      <button
        className={styles.product__counter_btn}
        onClick={incrementFunction}
      >
        <BiPlus />
      </button>
    </div>
  );
};

export default CartQty;
