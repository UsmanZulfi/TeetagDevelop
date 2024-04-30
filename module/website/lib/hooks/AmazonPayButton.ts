import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPayload } from "../networkCalls/storeFunctions";
import {
  AmazonPayButtonSettingType,
  CheckoutSessionConfigType,
  PayloadResponse,
} from "../types/teetagTypes";
import { RootState } from "./../../../../store/store";

interface AmazonProps {
  bindChangeAction?: any;
  bindUpgradeAction?: any;
  initCheckout?: any;
  renderButton?: any;
  signout?: any;
}

export const useRenderAmazonPayButton = () => {
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.auth.cart);
  const [amazonPay, setAmazonPay] = useState<AmazonProps>(null);

  const _window = window as any;
  const amazonApi = _window?.amazon?.Pay;

  if (amazonApi) {
    // set only if amazon pay is not set
    if (!amazonPay) {
      setAmazonPay({ ...amazonApi });
    }
  }

  useEffect(() => {
    const renderAmazonPayButton = async (cart_id?: number): Promise<void> => {
      const response: PayloadResponse = await getPayload(cart_id);
      const { payload, signature } = response;
      const createCheckoutSessionConfig: CheckoutSessionConfigType = {
        payloadJSON: JSON.stringify(payload),
        signature: signature,
      };

      const amazonPaySetting: AmazonPayButtonSettingType = {
        merchantId: process.env.NEXT_PUBLIC_AMAZON_PAY_MERCHANT_ID,
        publicKeyId: process.env.NEXT_PUBLIC_AMAZON_PAY_PUBLIC_KEY_ID,
        ledgerCurrency: "USD",
        sandbox: true,
        checkoutLanguage: "en_US",
        productType: "PayOnly",
        placement: "Cart",
        buttonColor: "LightGray",
        estimatedOrderAmount: { amount: "109.99", currencyCode: "USD" },
        createCheckoutSessionConfig,
      };

      amazonPay.renderButton("#AmazonPayButton", amazonPaySetting);
    };

    if (router.isReady) {
      if (router.pathname === "/amazonpay-confirm") {
        renderAmazonPayButton(cart.id);
      }
      if (router.pathname === "/amazonpay-contribution-confirm") {
        renderAmazonPayButton();
      }
    }
    /** amazonButtonConfig is an object having signature and payload */
  }, [amazonPay, router, cart]);
};
