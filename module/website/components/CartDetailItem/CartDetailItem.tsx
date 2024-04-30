import { CartItem } from "@/website/lib/types/wooCommerceTypes";
import Image from "next/image";

interface CartDetailItemProps {
  cart: CartItem;
}
const CartDetailItem = ({ cart }: CartDetailItemProps) => {
  return (
    <div className="grid grid-cols-1 gap-10 mb-12 md:grid-cols-12">
      <div className="flex flex-col items-start gap-12 md:flex-row md:items-center md:col-span-7">
        <div className="image-container basis-2/4 shrink-0">
          <Image
            src={cart.image.src}
            fill
            alt={cart.image.alt}
            className="teetag-image-shadow"
          />
        </div>
        <div className="basis-2/4">
          <p className="text-xl uppercase text-green-light font-fugaz">
            {cart.name}
          </p>
          {cart.size && (
            <p className="text-xl uppercase text-green-light font-fugaz">
              size:<span className="ml-2 text-white">{cart.size}</span>
            </p>
          )}
          {cart.color && (
            <p className="text-xl uppercase text-green-light font-fugaz">
              color:<span className="ml-2 text-white">{cart.color}</span>
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-between w-full item-center md:items-end md:justify-start md:flex-col md:col-span-5">
        <p className="flex items-center justify-center w-16 h-16 mb-0 text-xl text-white md:mb-12 font-fugaz teetag-shadow">
          {cart.quantity}
        </p>
        <p className="text-xl text-white font-fugaz">
          ${parseFloat(cart.price).toFixed(2).replace(/\.00$/, "")}
        </p>
      </div>
    </div>
  );
};

export default CartDetailItem;
