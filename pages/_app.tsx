import { Loader } from "@/website/components/Loader/Loader";
import { useScrollRestoration } from "@/website/lib/hooks/useScrollRestoration";
import { Shield } from "@/website/lib/routes/Shield";
import { Exo, Fugaz_One } from "@next/font/google";
import MainLayout from "module/website/layout/MainLayout";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "store/store";
import "../styles/dashboard.css";
import "../styles/globals.css";
import "../styles/ngprogress.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const persistor = persistStore(store);

const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-exo",
  display: "fallback",
});

const fugaz = Fugaz_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fugaz",
  display: "fallback",
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  useScrollRestoration(router);
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const handleRouteChange = () => {
      NProgress.start();
    };

    const handleRouteComplete = () => {
      NProgress.done();
    };

    const handleRouteError = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);
    router.events.on("routeChangeError", handleRouteError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("routeChangeError", handleRouteChange);
    };
  }, []);
  const getLayout =
    Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);
  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <div className={`${exo.variable} ${fugaz.variable} font-exo`}>
            <Shield>
              <Component {...pageProps} />
            </Shield>
          </div>
        </PersistGate>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>,
  );
}
