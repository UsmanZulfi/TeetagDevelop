import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import Heading from "@/website/components/Heading/Heading";
import { Loader } from "@/website/components/Loader/Loader";
import { Product } from "@/website/components/Product/Product";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import Rules from "@/website/containers/Rules/Rules";
import { fetchRelatedProducts } from "@/website/lib/networkCalls/storeFunctions";
import { ProductType } from "@/website/lib/types/wooCommerceTypes";
import { useEffect, useRef, useState } from "react";

const IowaChildren = () => {
  const videoRef = useRef(null);
  const [showButton, setShowButton] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getRelatedProducts(ids: number[]) {
      const relatedArray = await fetchRelatedProducts(ids);
      setIsLoading(false);
      setRelatedProducts(relatedArray);
    }
    getRelatedProducts([16284, 16334, 16383]);
  });
  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TitleHead
            title="Iowa-Children"
            metaTitle="Iowa-Children"
            metaDesc=""
          />
          <section className="iowa-children-hero">
            <Header />
            <div className="story-content-iowa">
              <div className="container">
                <h1 className="text-center uppercase h1 font-fugaz shadow-heading">
                  University of Iowa Stead family children's hospital + TeeTag
                </h1>
              </div>
            </div>
          </section>
          <p className="mt-14 mb-20 mx-8 text-center h8 px-10 md:px-96 font-semibold">
            I am excited to announce that TeeTag has partnered with the
            University of Iowa Stead Family Children's hospital. With me being a
            current student at the University of Iowa, working and raising money
            for the children's hospital has always been at the top of my bucket
            list. Please watch the quick video below where I explain the
            mission, the game of TeeTag, and how to play! A portion of EVERY
            single shirt sold will be donated. The grand goal is to raise
            $100,000 for these rock star kids. We got this Iowa!
          </p>
          <div className="container md:mb-10">
            <div className="px-0 lg:px-20">
              <Heading title="Watch Video" />
            </div>
            <div className="flex items-center justify-center gap-16 lg:gap-24 ">
              <div className="w-96">
                <div className="relative inline-block lg:mt-16 xl:mt-0">
                  <video
                    ref={videoRef}
                    src="/assets/iowa-children-hosp.mp4"
                    controls
                    className="teetag-image-shadow"
                    onPlay={() => {
                      setShowButton(false);
                    }}
                    onPause={() => setShowButton(true)}
                  />
                  {showButton && (
                    <button
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1,
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        width: "25px",
                      }}
                      onClick={handlePlayPause}
                    >
                      <img src="/assets/playbutton.svg" alt="Play Button" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Rules rules={rules} />
          <section className="section">
            <div className="container">
              <Heading title="T-SHIRT DESIGNS" />
              <div className="grid grid-cols-2 gap-10 mt-24 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 mx-13">
                {relatedProducts?.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
          <Footer />
        </>
      )}
    </>
  );
};

export default IowaChildren;

const rules = [
  {
    num: 1,
    shadowColor: "yellow",
    title: "Pick a person...",
    text: "Pick a person you'd like to send a shirt to: family, friends, neighbors, co-workers… absolutely anybody!",
  },
  {
    num: 2,
    shadowColor: "green",
    title: "Select a Shirt",
    text: "Select the shirt you'd like to give the person you are 'tagging'",
  },
  {
    num: 3,
    shadowColor: "yellow",
    title: "Send it off!",
    text: "Ship the shirt off to the person you'd like to tag",
  },
  {
    num: 4,
    shadowColor: "green",
    title: "Tag! They're it!",
    text: "You have successfully played TeeTag! And the person you tagged is now it!",
  },
];
