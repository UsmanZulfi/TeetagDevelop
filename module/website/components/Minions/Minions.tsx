import Image from "next/image";
import Link from "next/link";
import Heading3 from "../Heading3/Heading3";
import TeetagList from "../TeetagList/TeetagList";
import useWindowWidth from '../UserWindowWidth';
const Minions = () => {
  const windowWidth = useWindowWidth();
  const height = windowWidth > 767 ? 80 : 54;
  const fontSize = windowWidth > 767 ? "1.9rem" : 14.19;
  const paddingLeft = windowWidth > 767 ? 30 : 25;

  const style = {
    height: `${height}px`,
    fontSize: fontSize,
    paddingLeft: `${paddingLeft}px`, 
    paddingRight: `${paddingLeft}px`,
  };

  return (
    <section className="mb-40">
      <div className="container">
        <div className="grid items-center grid-cols-1 gap-20 lg:grid-cols-2">
          <div className="image-container">
            <Image
              src="/assets/minion-image.png"
              alt=""
              fill
              className="teetag-image-shadow"
            />
          </div>
          <div>
            <Heading3 title="State Ambassadors" />
            <p className="mt-6 mb-12 h8">
              State Ambassadors are selectively chosen teenagers
            </p>
            <TeetagList
              ulClassConfig={"teetag-list sm"}
              liClassConfig={"ml-3 capitalize "}
              items={[
                "Ages 16-22",
                "Have lost a parent to cancer",
                "Demonstrates a need for financial support",
              ]}
            />
            <p className="mt-12 h8 ">
              State Ambassadors are in charge of growing and spreading TeeTag
              throughout their state. State Ambassadors get rewarded by
              receiving a portion of every tag they generate. This creates a fun
              and interactive way to spread the game of TeeTag across the
              country while also giving back to those in financial need.
            </p>
            <div className="flex flex-col items-stretch md:space-x-10 md:flex-row">
              <Link
                href="/apply-minion"
                className="text-center btn-teetag yellow"
                style={style}
              >
                Become a State Ambassador
              </Link>
              <Link href="/minions" className="text-center btn-teetag green"  style={style}>
                current state ambassadors
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Minions;
