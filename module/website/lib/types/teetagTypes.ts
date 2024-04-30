import { Billing, Cart, Shipping, WooImage } from "./wooCommerceTypes";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: null;
  state: string;
  state_id: null;
  city: string;
  postcode: string;
  role: string;
  img: null;
  description: null;
  provider: string;
  email_verified: boolean;
  phone_verified: boolean;
  password: string;
  accessToken: string;
  cart: Cart;
  to_verify: string | null;
}
export interface CartItemWithoutQuantity {
  cart_id: number | undefined;
  product_id: number;
  variation_id: number | null;
  price: string;
  image: WooImage;
  state: string;
  size: string | null;
  color: string | null;
  short_description: string;
  name: string;
  total?: number;
}

export interface RemovedItem {
  cart_id: number | undefined;
  product_id: number;
  variation_id: number | null;
  clear: boolean;
}
export interface SignUpProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface SignInProps {
  login: string;
  password: string;
}

export interface ErrorResponse {
  status: number;
  message: string;
  data?: User;
}

export interface ApiResponse {
  status: number;
  message: string;
  data: any;
  result?: any;
}

export interface ResultResponse {
  status: number;
  message: string;
  result: any;
}

export interface FileUploadResponse {
  status: number;
  message: string;
  result: {
    url: string;
  };
}
export interface FilesUploadResponse {
  status: number;
  message: string;
  result: {
    urls: string[];
  };
}

export interface CartApiResponse {
  status: number;
  message: string;
  result: {
    cart: Cart;
  };
}

export interface Contribute {
  amount: number;
  payment_method: string;
  billing: {
    city: string;
    state: string;
  };
}

export interface OrderApiResponse {
  status: number;
  message: string;
  result: OrderResult;
}

export interface OrderResult {
  id: string;
  url: string;
}

export interface ContactProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Minion {
  name: string;
  phone: string;
  email: string;
  state: string;
  age: string;
  reason: string;
  story: string;
  image: string;
}

export interface SingleMinion {
  name: string;
  image: string;
  state: string;
  total_tags: string;
}

export interface SingleInfluencer {
  name: string;
  image: string;
  state: string;
  total_tags: string;
}

export interface ScholarShip {
  name: string;
  email: string;
  phone: string;
  state: string;
  reason: string;
  age: string;
  image: WooImage;
  story_document: string[];
  proof_document: string[];
}

export interface BulkOrder {
  name: string;
  phone: string;
  email: string;
  state: string;
  objective: string;
  quantity: number;
  plate_phrase: string;
  due_date: string;
  note: string;
  images: string[];
}

export interface Tagee {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  shirt_color: string;
  shirt_size: string;
  plate_design: string;
}

export interface PayloadResponse {
  signature: string;
  payload: Payload;
}

export interface Payload {
  webCheckoutDetails: WebCheckoutDetails;
  storeId: string;
  scopes: string[];
  chargePermissionType: string;
}

export interface WebCheckoutDetails {
  checkoutReviewReturnUrl?: string;
  checkoutResultReturnUrl?: string;
  amazonPayRedirectUrl?: string;
  checkoutCancelUrl?: string;
}

export interface CheckoutSessionConfigType {
  payloadJSON: Payload | string;
  signature: string;
}

export interface estimatedOrderAmountType {
  amount: string;
  currencyCode: string;
}

export interface AmazonPayButtonSettingType {
  merchantId: string;
  publicKeyId: string;
  ledgerCurrency: string;
  sandbox: boolean;
  checkoutLanguage: string;
  productType: string;
  placement: string;
  buttonColor: string;
  estimatedOrderAmount: estimatedOrderAmountType;
  createCheckoutSessionConfig: CheckoutSessionConfigType;
}

export interface AmazonOrderType {
  user_id: number;
  cart_id: number;
  billing: Billing;
  shipping: Shipping;
  amazonCheckoutSessionId: string;
  total: number;
}

export interface AmazonPayReveiwProps {
  checkoutSessionId: string;
  webCheckoutDetails: WebCheckoutDetails;
  paymentPreferences: string;
}

export interface AmazonProps {
  bindChangeAction?: any;
  bindUpgradeAction?: any;
  initCheckout?: any;
  renderButton?: any;
  signout?: any;
}
export interface LeaderBoardProps {
  name: string;
  count: string;
}
