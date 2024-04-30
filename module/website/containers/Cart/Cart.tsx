import CartListItem from "@/website/components/CartListItem/CartListItem";
import { clearCart } from "@/website/lib/networkCalls/cartFunctions";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import { updateCart } from "store/features/auth/authSlice";
import { RootState } from "store/store";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.auth.cart);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  async function handleReset() {
    // Set cart to null in the Redux store
    if (!user) dispatch(updateCart(null));
    else {
      const emptyCart = await clearCart(String(cart?.id));
      dispatch(updateCart(emptyCart.result.cart));
    }
  }

  if (!cart || cart?.cartItems.length === 0) {
    return (
      <section className="section">
        <div className="container">
          <div className="flex justify-center flex-col items-center">
            {/* <Image
              src="/assets/empty-cart.png"
              width={100}
              height={65}
              alt="empty-cart"
            /> */}
            <p className="h8 font-semibold">Cart is empty</p>
            <Link href="/" className="btn-teetag yellow">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 xl:grid-cols-1">
            {cart?.cartItems.map((cartItem) => (
              <CartListItem key={uuid()} cartItem={cartItem} />
            ))}
          </div>
          <div className="p-12 mt-16 teetag-shadow">
            <div className="flex items-center justify-between">
              <p className="uppercase font-fugaz h8">Total</p>
              <p className="uppercase font-fugaz h8">
                ${cart?.sub_total.toFixed(2).replace(/\.00$/, "")}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-0 items-stretch md:items-center md:gap-10">
            <Link
              href="/checkout"
              className="btn-teetag yellow text-center"
              onClick={() =>
                !user && localStorage.setItem("cart", JSON.stringify(cart))
              }
            >
              Checkout
            </Link>
            <button
              onClick={handleReset}
              className="btn-teetag green text-center"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </section>
    );
  }
};

export default Cart;
