import Heading3 from "@/website/components/Heading3/Heading3";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./ProductDetail.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { useAppDispatch } from "@/website/lib/hooks/hooks";
import { handleCartStatus } from "@/website/lib/networkCalls/authFunctions";
import { addToCart } from "@/website/lib/networkCalls/cartFunctions";
import {
  Cart,
  CartItem,
  ProductType,
  WooImage,
} from "@/website/lib/types/wooCommerceTypes";
import Link from "next/link";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { updateCart } from "store/features/auth/authSlice";
import { RootState } from "store/store";
import { Pagination } from "swiper";

interface ProductDetailProps {
  product: ProductType;
}

interface ProductVariantProps {
  color: string;
  size: string;
  variant_id: number;
  images: WooImage[];
  price: string;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const cart = useSelector((state: RootState) => state.auth.cart);
  // const router = useRouter();
  const [addCart, setAddCart] = useState<boolean>(false);

  const [productItem, setProductItem] = useState<CartItem>({
    product_id: product.id,
    image: { src: "", alt: "" },
    name: product.name,
    short_description: product.short_description,
    state: String(product?.categories[0].name),
    variation_id: 0,
    price: product.price,
    quantity: 1,
    color: "",
    size: "",
    cart_id: cart?.id,
  });

  const [selectedVariant, setSelectedVariant] = useState<ProductVariantProps>({
    color: "",
    size: "",
    variant_id: 0,
    images: [],
    price: "",
  });

  const [defaultVariant, setDefaultVariant] = useState<ProductVariantProps>({
    color: product.default_attributes[0]?.option,
    size: product.default_attributes[1]?.option,
    variant_id: 0,
    images: [],
    price: "",
  });

  useMemo(() => {
    if (product.type === "variable") {
      updateVariation(defaultVariant.size, defaultVariant.color);
    }
  }, []);

  useEffect(() => {
    const Cart = async () => {
      if (addCart && auth.user) {
        const response = await addToCart(productItem);
        handleCartStatus(response);
        if (response.status === 200) {
          dispatch(updateCart(response.result.cart));
        }
      } else if (addCart && !auth.user) {
        dummyCart();
      }
      setAddCart(false);
    };

    Cart();
  }, [addCart, productItem]);

  function addQuantity() {
    setProductItem((prevState) => {
      return {
        ...prevState,
        quantity: prevState.quantity + 1,
      };
    });
  }

  function removeQuantity() {
    if (productItem.quantity < 2) return;
    setProductItem((prevState) => {
      return {
        ...prevState,
        quantity: prevState.quantity - 1,
      };
    });
  }

  function dummyCart() {
    let localCart: Cart;
    if (!cart)
      localCart = {
        id: 0,
        total: 0,
        sub_total: 0,
        status: "",
        user_id: 0,
        cart_count: 0,
        cartItems: [],
        shipping_cost: "",
      };
    else localCart = { ...cart };
    localCart = {
      ...localCart,
      cart_count: 0,
      total: 0,
      cartItems: [...localCart.cartItems, productItem], // Create a new array with the updated cartItems
    };
    // localCart.cartItems?.push(productItem);
    //calculate total,cart_count,sub_total
    localCart.cartItems?.forEach((item) => {
      localCart.total += parseFloat(item.price) * item.quantity;
      localCart.cart_count += item.quantity;
    });
    localCart.sub_total = localCart.total;
    dispatch(updateCart(localCart));
    toast.success("Product added to cart");
  }

  function handleAddToCart() {
    if (product.type === "variable") {
      setProductItem((prevState) => ({
        ...prevState,
        color: selectedVariant.color,
        size: selectedVariant.size,
        image: {
          src: selectedVariant.images[0]?.src,
          alt: selectedVariant.images[0]?.alt,
        },
        variation_id: selectedVariant.variant_id,
        total: parseFloat(selectedVariant.price) * productItem.quantity,
      }));
    } else {
      setProductItem((prevState) => ({
        ...prevState,
        color: null,
        size: null,
        image: {
          src: product.images[0].src,
          alt: product.images[0].alt,
        },
        variation_id: null,
        total: parseFloat(product.price) * productItem.quantity,
      }));
    }
    setAddCart(true);
  }

  function setColor(e: React.MouseEvent<Element, MouseEvent>, color: string) {
    setDefaultVariant({ ...defaultVariant, color });
    updateVariation(defaultVariant.size, color);
  }

  function setSize(e: React.MouseEvent<Element, MouseEvent>, size: string) {
    setDefaultVariant({ ...defaultVariant, size });
    updateVariation(size, defaultVariant.color);
  }

  function handlSlideChange(
    e: React.MouseEvent<Element, MouseEvent>,
    id: number,
  ) {
    const slide = product.variationsProducts.filter(
      (product) => product.id === id,
    );

    let arr = [
      {
        src: slide[0].images[0].src,
        alt: slide[0].images[0].alt,
      },
    ];
    setSelectedVariant({
      ...selectedVariant,
      images: arr,
    });
    setColor(e, slide[0].attributes[0].option);
  }

  function updateVariation(size: string, color: string) {
    for (let variation of product.variationsProducts) {
      let isSizeFound = false;
      let isColorFound = false;
      for (let attributes of variation.attributes) {
        if (attributes.name === "Colors") {
          if (attributes.option === color) {
            isColorFound = true;
          }
        } else if (attributes.name === "Sizes") {
          if (attributes.option === size) {
            isSizeFound = true;
          }
        }
        if (isColorFound && isSizeFound) break;
      }
      if (isColorFound && isSizeFound) {
        let arr = [
          {
            src: variation.images[0].src,
            alt: variation?.images[0].alt,
          },
        ];
        setSelectedVariant({
          images: arr,
          price: variation.price,
          variant_id: variation.id,
          color,
          size,
        });
        setDefaultVariant({
          images: arr,
          price: variation.price,
          variant_id: variation.id,
          color,
          size,
        });
        break;
      }
    }
  }
  return (
    <>
      <Toaster />
      <style>{`
        .swiper-pagination-bullet{
            width: 16px ;
            height: 16px ;
            border-radius: 50% ;
            background: #000000 ;
            border: 1px solid #00FFCC ;
            opacity:1 !important;
        }

        .swiper-slide:hover{
            cursor:grabbing;
        }

        .swiper{
            padding-bottom:50px;
        }

        .swiper-slide{
            aspect-ratio:1;
        }

        .swiper-pagination-bullet-active{
            background:#ffff00;
        }
            
        `}</style>
      <section
        className="section"
        style={{ paddingTop: "30px", paddingBottom: "50px" }}
      >
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-36">
            <div className="col-span-2">
              <div className={styles.image__thumb}>
                {product.type === "variable" ? (
                  selectedVariant.images[0]?.src ? (
                    <Image
                      src={
                        selectedVariant.images[0]?.src ??
                        "/assets/placeholder-large.png"
                      }
                      alt={selectedVariant.images[0]?.alt ?? "placeholder"}
                      fill
                      className="mx-auto"
                    />
                  ) : (
                    <Image
                      src={
                        defaultVariant.images[0]?.src ??
                        "/assets/placeholder-large.png"
                      }
                      alt={defaultVariant.images[0]?.alt ?? "placeholder"}
                      fill
                      className="mx-auto"
                    />
                  )
                ) : (
                  <Image
                    src={
                      product.images[0].src ?? "/assets/placeholder-large.png"
                    }
                    alt={product.images[0].alt ?? "placeholder"}
                    fill
                    className="mx-auto"
                  />
                )}
              </div>

              {product.type === "variable" ? (
                <div className="relative">
                  <div className={styles.image__slider}>
                    <Swiper
                      modules={[Pagination]}
                      slidesPerView={6}
                      spaceBetween={10}
                    >
                      {product.variationsProducts?.map((variant) => (
                        <SwiperSlide
                          key={variant.id}
                          onClick={(e) => handlSlideChange(e, variant.id)}
                        >
                          <Image
                            src={
                              variant.images[0]?.src ??
                              "/assets/placeholder-large.png"
                            }
                            fill
                            alt={variant.images[0]?.alt ?? "placeholder"}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="product__description col-span-3">
              <p className="text-2xl text-yellow-primary">
                {product.categories.map((cat) => cat.name)}
              </p>
              <h3 className="uppercase h4 font-fugaz text-green-light">
                {product?.name}
              </h3>
              {product?.short_description && (
                <p className="max-w-5xl py-6 text-xl">
                  {product.short_description}
                </p>
              )}

              <p className="text-yellow-primary h5 font-fugaz">
                {product.type === "variable" ? (
                  <>
                    $
                    {parseFloat(selectedVariant.price)
                      .toFixed(2)
                      ?.replace(/\.00$/, "") ??
                      parseFloat(defaultVariant.price)
                        .toFixed(2)
                        .replace(/\.00$/, "")}
                  </>
                ) : (
                  <>
                    ${parseFloat(product.price).toFixed(2).replace(/\.00$/, "")}
                  </>
                )}
              </p>
              <div className="mt-4">
                {product.type === "variable" && (
                  <>
                    <div>
                      <p className="mb-8 text-xl uppercase font-fugaz text-green-light">
                        Colors:
                      </p>
                      <div className="flex flex-wrap items-center gap-6 mb-10 variation_flex">
                        {product.attributes[0]?.options.map((option) => (
                          <button
                            key={option}
                            className={
                              styles.product_variant_size +
                              ` font-fugaz ${
                                defaultVariant.color === option ? "active" : ""
                              }`
                            }
                            onClick={(e) => setColor(e, option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-8 text-xl uppercase font-fugaz text-green-light">
                        Sizes:
                      </p>
                      <div className="flex flex-wrap items-center gap-6 mb-8 variation_flex">
                        {product.attributes[1]?.options.map((option) => (
                          <button
                            key={option}
                            className={
                              styles.product_variant_size +
                              ` font-fugaz ${
                                defaultVariant.size === option ? "active" : ""
                              }`
                            }
                            onClick={(e) => {
                              setSize(e, option);
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                <p className="mb-4 text-lg uppercase font-fugaz text-green-light">
                  quantity:
                </p>
                <div className="flex items-center justify-start gap-6 mb-6">
                  <button
                    className={styles.product__counter_btn}
                    onClick={removeQuantity}
                  >
                    <BiMinus />
                  </button>
                  <div className={styles.product__counter_text + " font-fugaz lg:w-full"}>
                    {productItem.quantity}
                  </div>

                  <button
                    className={styles.product__counter_btn}
                    onClick={addQuantity}
                  >
                    <BiPlus />
                  </button>
                </div>
                <div className="flex items-start justify-center flex-col px-4 md:px-0 gap-6 mb-6">
                  <button
                    className="block w-full text-center btn-teetag yellow"
                    onClick={handleAddToCart}
                  >
                    add to cart
                  </button>
                  <Link
                    className="block w-full text-center btn-teetag green"
                    href="/checkout"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 mt-8"></div>
          <div className="mt-36">
            <Heading3 title="Description" />
            <div className="mt-12">
              <div
                dangerouslySetInnerHTML={{
                  __html: product?.description ? product?.description : "N/A",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
