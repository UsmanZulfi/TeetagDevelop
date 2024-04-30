import { handleCartStatus } from "@/website/lib/networkCalls/authFunctions";
import { addCart, removeCart } from "@/website/lib/networkCalls/cartFunctions";
import { CartItem } from "@/website/lib/types/wooCommerceTypes";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "store/features/auth/authSlice";
import { RootState } from "store/store";
import CartQty from "../CartQty/CartQty";
import styles from "./CartListItem.module.css";

interface CartItemProps {
  cartItem: CartItem;
}

const CartListItem = ({ cartItem }: CartItemProps) => {
  const [counter, setCounter] = useState(cartItem.quantity);
  const cart = useSelector((state: RootState) => state.auth.cart);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const data = { ...cartItem };
  data.quantity = 1;

  async function addQuantity() {
    if (!user) {
      //dispatch with increasing quantity of that product id and variation id
      let cartItems = [...cart.cartItems];
      updateCartItemQuantity(cartItems, cartItem, 1);
      return;
    }

    const response = await addCart({
      cart_id: cart?.id,
      color: cartItem.color,
      image: {
        src: cartItem.image.src,
        alt: cartItem.image.alt,
      },
      name: cartItem.name,
      price: cartItem.price,
      product_id: cartItem.product_id,
      short_description: cartItem.short_description,
      size: cartItem.size,
      state: cartItem.state,
      variation_id: cartItem.variation_id,
      total: cartItem.total,
    });
    if (response.status === 200) {
      dispatch(updateCart(response.result.cart));
      setCounter((prevState) => prevState + 1);
    }
  }

  async function removeQuantity() {
    if (!user) {
      //dispatch with decreasing quantity of that product id and variation id
      let cartItems = [...cart.cartItems];
      updateCartItemQuantity(cartItems, cartItem, -1);
    }

    const response = await removeCart({
      cart_id: cart?.id,
      color: cartItem.color,
      image: {
        src: cartItem.image.src,
        alt: cartItem.image.alt,
      },
      name: cartItem.name,
      price: cartItem.price,
      product_id: cartItem.product_id,
      short_description: cartItem.short_description,
      size: cartItem.size,
      state: cartItem.state,
      variation_id: cartItem.variation_id,
      total: cartItem.total,
    });
    if (response.status === 200) {
      dispatch(updateCart(response.result.cart));
      setCounter((prevState) => prevState - 1);
    }
    if (response.status === 400) {
      handleCartStatus(response);
    }
  }

  function updateCartItemQuantity(cartItems, cartItem, quantityChange) {
    const index = cartItems.findIndex(
      (item) =>
        item.product_id === cartItem.product_id &&
        item.variation_id === cartItem.variation_id,
    );
    if (index !== -1) {
      // Create a copy of the item to make it mutable
      const updatedItem = { ...cartItems[index] };
      updatedItem.quantity += quantityChange;

      // Replace the item at the specified index with the updated item
      updatedItem.quantity === 0
        ? cartItems.splice(index, 1)
        : cartItems.splice(index, 1, updatedItem);
      //calcuate total
      updatedItem.total = updatedItem.quantity * updatedItem.price;
      //update cart quantity and total
      updateLocalCartValues(cartItems);
      return;
    }
  }

  function updateLocalCartValues(cartItems) {
    let localCart = { ...cart };
    localCart.cartItems = cartItems;
    localCart.cart_count = 0;
    localCart.total = 0;
    localCart.sub_total = 0;
    localCart.cartItems.forEach((item) => {
      localCart.cart_count += item.quantity;
      localCart.total += item.total;
      localCart.sub_total += item.total;
    });
    dispatch(updateCart(localCart));
    setCounter((prevState) => prevState - 1);
  }

  //remove cartitem
  async function handleRemoveItem() {
    if (!user) {
      //dispatch with removing that product id and variation id
      let cartItems = [...cart.cartItems];
      const index = cartItems.findIndex(
        (item) =>
          item.product_id === cartItem.product_id &&
          item.variation_id === cartItem.variation_id,
      );
      if (index !== -1) {
        cartItems.splice(index, 1);
        //update cart values with new data
        updateLocalCartValues(cartItems);
      }
      return;
    }

    const response = await removeCart({
      cart_id: cart?.id,
      product_id: cartItem.product_id,
      variation_id: cartItem.variation_id,
      clear: true,
    });
    if (response.status === 200) {
      dispatch(updateCart(response.result.cart));
    }
    if (response.status === 400) {
      handleCartStatus(response);
    }
  }

  return (
    <div
      className={
        styles.cart__item +
        " grid grid-cols-1 xl:grid-cols-12 gap-6 items-center relative"
      }
    >
      <button
        className=" flex justify-end items-end xl:col-span-12 absolute top-16 xl:top-8 right-12 xl:right-8 z-50"
        onClick={handleRemoveItem}
      >
        <Image
          src={"/assets/remove-item.png"}
          width={30}
          height={30}
          alt={"cross"}
        />
      </button>
      <div className="relative xl:col-span-2 aspect-square">
        <Image src={cartItem.image?.src} fill alt={cartItem.image?.alt} />
      </div>
      <div className="grid items-start grid-cols-12 gap-10 py-10 lg:py-20 xl:gap-2 xl:col-span-10">
        <div className="col-span-12 text-start xl:col-span-2">
          <h3 className="mb-10 uppercase font-fugaz h8 text-green-light">
            {cartItem.name}
          </h3>
          {/* Put block to see if bug is fixed*/}
          <p className="mb-5 block text-xl font-bold text-yellow-primary">
            {cartItem.state}
          </p>
          <p className="text-xl">{cartItem?.short_description}</p>
        </div>
        <div className="col-span-4 lg:text-center text-left xl:col-span-2">
          <h6 className="mb-10 uppercase font-fugaz h8 text-green-light">
            Size
          </h6>
          <p className="uppercase font-fugaz h8">
            {cartItem.size ? cartItem.size : "N/A"}
          </p>
        </div>
        <div className="col-span-4 lg:text-center text-left xl:col-span-2">
          <h6 className="mb-10 uppercase font-fugaz h8 text-green-light">
            Color
          </h6>
          <p className="uppercase font-fugaz h8">
            {cartItem.color ? cartItem.color : "N/A"}
          </p>
        </div>
        <div className="col-span-4 lg:text-center text-left xl:col-span-2">
          <h6 className="mb-10 uppercase font-fugaz h8 text-green-light">
            Price
          </h6>
          <p className="uppercase font-fugaz h8">
            ${parseFloat(cartItem.price).toFixed(2).replace(/\.00$/, "")}
          </p>
        </div>

        <div className="col-span-12 lg:text-center text-left xl:col-span-2">
          <h6 className="mb-10 uppercase font-fugaz h8 text-green-light">
            Quantity
          </h6>
          <CartQty
            quantity={counter}
            decrementFunction={removeQuantity}
            incrementFunction={addQuantity}
          />
        </div>
        {/* Removed the div having sub totals for bug fix */}
        
      </div>
    </div>
  );
};

export default CartListItem;
