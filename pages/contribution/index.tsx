import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./contribution.module.css";

const prices = [
  {
    id: 1,
    name: "$25",
  },
  {
    id: 2,
    name: "$50",
  },
  {
    id: 3,
    name: "$100",
  },
  {
    id: 4,
    name: "$250",
  },
  {
    id: 5,
    name: "$500",
  },
  {
    id: 6,
    name: "$1000",
  },
  {
    id: 7,
    name: "$5000",
  },
];

const Contribution = () => {
  const router = useRouter();
  const [active, setActive] = useState<number>(1);
  const [price, setPrice] = useState<string>("25");

  function handleClick(
    e: React.MouseEvent<Element, MouseEvent>,
    index: number,
  ) {
    setActive(index);
    const selectedPrice = e.currentTarget.textContent;
    const contributePrice = selectedPrice?.replace("$", "");

    setPrice(contributePrice ? contributePrice : "");
  }
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleContribute = () => {
    if (price) {
      localStorage.setItem("contribute_price", price);
      router.push("/contribution-checkout");
    }
  };
  return (
    <>
      <TitleHead
        title="Contribution"
        metaTitle="contribution"
        metaDesc="AMERICA'S LARGEST GAME OF TAG For a Greater Cause!"
      />
      <section className="contribution-hero">
        <Header />
        <div className="story-content">
          <div className="container">
            {
              windowWidth > 768 ?(
                <h1 className="text-center uppercase h3 font-fugaz shadow-heading forMobile"  >
              
                make a contribution
              </h1>

              ):(
                <h1 className="text-center uppercase heading font-fugaz shadow-heading forMobile"  >
              
                make a <br/> contribution
              </h1>
              )
            }
          </div>
        </div>
      </section>
      {windowWidth > 768 ? (
        <div className="container" style={{marginBottom:'-5%',width:'80%'}}>
          <p className="mt-10 text-center h10 px-11 md:px-52 lg:px-80 md:font-medium">
            Contributions are a fast and easy way to continue spreading the game of
            TeeTag while also raising money for the cause! For every $25 contributed
            - 1 selectively chosen individual will automatically be tagged and sent
            a t-shirt! TeeTag has hundreds of people all across America who are
            ready and waiting to get tagged!
            <br />
            <br />
            20% of all proceeds from contributions will still go directly to the
            cause.
          </p>
        </div>
      ) : (
          <p className="mt-20 text-center h11 px-12 md:px-52 lg:px-80 md:font-medium h9" >
            Contributions are a fast and easy way to continue spreading the game of
            TeeTag while also raising money for the cause! For every $25 contributed
            - 1 selectively chosen individual will automatically be tagged and sent
            a t-shirt! TeeTag has hundreds of people all across America who are
            ready and waiting to get tagged!
            <br />
            <br />
            20% of all proceeds from contributions will still go directly to the
            cause.
          </p>
      )}
      <section className="section" >
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:gap-20 xl:gap-30 items-start lg:items-center xl:items-center mx-4 lg:mx-8">
            <div className="image-container hidden md:block">
              <Image
                src="/assets/group-TeeShirt.png"
                fill
                alt="contribution-image"
                className="teetag-image-shadow"
                
              />
            </div>
            <div>
              <h3 className= {windowWidth > 768 ?"h5 font-fugaz uppercase text-green-light mb-10":"h2 font-fugaz uppercase text-green-light mb-10"}>
                Custom Contribution
              </h3>
              <div>
              {windowWidth > 768 ? (
                <p className="h9 text-green-light font-fugaz uppercase mb-8">
                  price
                </p>):
                <p className="h9 text-green-light font-fugaz uppercase mb-8">
                price:
              </p>}
                <div className="flex flex-wrap items-center gap-6 mb-10 variation_flex">
                  {prices.map((price) => (
                    <label
                      htmlFor={price.name}
                      key={price.id}
                      className={
                        styles.contribution__checkbox +
                        ` font-fugaz ${active === price.id ? " active" : ""}`
                      }
                      onClick={(e) => handleClick(e, price.id)}
                    >
                      <input
                        className="cursor-pointer"
                        type="checkbox"
                        name={price.name}
                        value={price.name}
                        checked={active === price.id ? true : false}
                      />
                      {price.name}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <div className="teetag__input max-w-xl">
                  <label
                    htmlFor="name"
                    className="h9 block font-fugaz uppercase mb-4"
                  >
                    Add Custom Amount
                  </label>
                  <input
                    type="number"
                    name="name"
                    id="name"
                    placeholder="Enter Custom Amount"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <button
                className= {windowWidth > 768 ? "btn-teetag text-center yellow btn-contribute_2 padding-top-5":"btn-teetag text-center yellow btn-contribute_2 padding-top-10"} 
                onClick={handleContribute}
              >
                Contribute Now
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.section} style={{paddingTop:0}}>
        <div className="container">
          <ul className="teetag-list2 sm">
            <li>
              <span className="pl-3 bullet font-exo">
                For every $25 contributed = 1 select individual will
                automatically be tagged and sent a t-shirt
              </span>
            </li>
            <li>
              <span className="pl-3 bullet font-exo">
                20% of ALL proceeds from contributions will still go directly to
                the scholarship recipient TeeTag is currently helping raise
                money for.
              </span>
            </li>
            <li>
              <span className="pl-3 bullet font-exo">
                The more people tagged, the FASTER & BIGGER TeeTag spreads!
              </span>
            </li>
            <li>
              <span className="pl-3 bullet font-exo">
                Your generosity is greatly appreciated :)
              </span>
            </li>
          </ul>
          <p className="h11 pl-5 Note_Text">
            <span className="font-semibold Note">Note:</span> Contributions are not
            considered donations for tax purposes.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contribution;
