export interface ProductType {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: Date;
  type: "simple" | "variable" | "grouped" | "external";
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_quantity: number;
  stock_status: "instock" | "outofstock" | "onbackorder";
  related_ids: number[];
  categories: Partial<Category>[];
  images: WooImage[];
  attributes: Attribute[];
  default_attributes: any[]; // TODO look at default attributes properties
  variations: number[];
  relatedProducts: ProductType[];
  variationsProducts: Variation[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: WooImage[];
}

export interface Collection {
  href: string;
}

export interface Dimensions {
  length: string;
  width: string;
  height: string;
}

export interface MetaDatum {
  id: number;
  key: string;
  value: string;
}

export interface Cart {
  id: number;
  total: number;
  sub_total: number;
  status: string;
  user_id: number;
  cart_count: number;
  cartItems: CartItem[] | undefined;
  shipping_cost: string;
}

export interface CartItem {
  cart_id: number | undefined;
  product_id: number;
  variation_id: number | null;
  quantity: number;
  price: string;
  image: WooImage;
  state: string;
  size: string | null;
  color: string | null;
  short_description: string;
  name: string;
  total?: number;
}

interface ShippingLine {
  id: number;
  method_title: string;
  method_id: string;
  instance_id: string;
  total: string;
  total_tax: string;
  taxes: any[];
  meta_data: any[];
}

export interface Attribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

interface DefaultAttribute {
  id: number;
  name: string;
  option: string;
}
export interface WooImage {
  id?: number;
  src: string;
  name?: string;
  alt: string;
}

export interface MetaData {
  id: number;
  key: string;
  value: string;
}

export interface Up {
  href: string;
}

export interface Customer {
  id: number;
  date_created: Date;
  date_created_gmt: Date;
  date_modified: Date;
  date_modified_gmt: Date;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  username: string;
  billing: Billing;
  shipping: Shipping;
  is_paying_customer: boolean;
  avatar_url: string;
  meta_data: MetaData[];
  _links: Links;
}

export interface Order {
  payment_method: string;
  cart_id: number;
  billing: Billing;
  shipping: Shipping;
  chain_code: any;
}

export interface Links {
  self: Self[];
  collection: Collection[];
  up: Up[];
}

export interface Billing {
  name: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  email: string;
  phone: string;
}

export interface Shipping {
  name: string;
  city: string;
  state: string;
  postal_code: string;
  address: string;
  phone: string;
  email: string;
}

export interface OrderResponse {
  orderNumber: number;
  orderDate: string;
  name: string;
  email: string;
  phone: string;
  payment_method: string;
  total: string;
  sales_tax: string;
  shipping: Shipping;
  cart: Cart;
}

export interface Variation {
  id: number;
  date_created: Date;
  description: string;
  sku: string;
  price: string;
  images: WooImage[];
  regular_price: string;
  sale_price: string;
  stock_quantity: null;
  stock_status: "instock" | "outofstock" | "onbackorder";
  attributes: DefaultAttribute[];
}

export interface Self {
  href: string;
}

export interface BillingDetailsProps {
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  email: string;
  phone: string;
  shirtForSelf: boolean;
  tagName: string;
  tagEmail: string;
  tagAddress: string;
  tagPhone: string;
  tagState: string;
  tagCity: string;
  tagPostalCode: string;
  termCheck: boolean;
  paymentMethod: string;
  code: string;
}
