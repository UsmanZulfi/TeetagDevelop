import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// initialise the WooCommerceRestApi //
const api = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_BASE_URL!,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY!,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET!,
  version: "wc/v3",
});

// fetch all products from WooCommerce //
export async function fetchWooCommerceProducts() {
  try {
    const response = await api.get(
      "products/categories?per_page=50&exclude=60",
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

// fetch all products from WooCommerce //
export async function fetchWooCommerceCategories() {
  try {
    const response = await api.get(
      "products/categories?per_page=10&exclude=60",
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// fetch all products from WooCommerce //
export async function fetchWooCommerceCategoriesFilter(order: string) {
  try {
    const response = await api.get(
      `products/categories?per_page=10&exclude=60&order=${order}`,
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

// fetch all products from WooCommerce //
export async function fetchWooCommerceCategoryProducts(id: any) {
  try {
    const response = await api.get(`products?category=${id}&per_page=10`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// fetch all products from WooCommerce //
export async function fetchWooCommerceCategory(id: any) {
  try {
    const response = await api.get(`products/categories/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
