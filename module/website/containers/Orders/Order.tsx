import ApplyBanner from "@/website/components/ApplyBanner/ApplyBanner";
import TeetagList from "@/website/components/TeetagList/TeetagList";
import Heading3 from "module/website/components/Heading3/Heading3";
import Image from "next/image";
import Link from "next/link";

interface OrderProps {
  showBanner: boolean;
}

export default function Order({ showBanner }: OrderProps) {
  return (
    <>
      <section className="md:block section">
        <div className="container">
          <div className="grid items-center grid-cols-1 gap-32 lg:grid-cols-2 xl:gap-52">
            <div>
              <Heading3 title="bulk order?" />
              <p className="mt-12 mb-10 h8">
                Types of groups we've done bulk orders for:
              </p>
              <div className="grid grid-cols-2 gap-10">
                <TeetagList
                  ulClassConfig={"teetag-list"}
                  liClassConfig={"ml-3 capitalize"}
                  items={[
                    "clubs",
                    "local groups",
                    "non-for-profits",
                    "organizations",
                  ]}
                />
                <TeetagList
                  ulClassConfig={"teetag-list"}
                  liClassConfig={"ml-3 capitalize"}
                  items={[
                    "sports teams",
                    "greek life",
                    "events",
                    "schools & more!",
                  ]}
                />
              </div>
              <p className="mt-10 h8 text-yellow-primary font-semibold">
                NOTE: We can do custom/personalized license plate designs
                catered to what you want and need.
              </p>
              <Link
                href="/bulk-order"
                className="btn-teetag yellow text-center w-full sm:w-1/2"
              >
                Learn more
              </Link>
            </div>
            <div className="image-container">
              <Image
                src="/assets/order-image.png"
                fill
                alt="order"
                className="teetag-image-shadow"
              />
            </div>
          </div>
        </div>
      </section>
      {showBanner && (
        <ApplyBanner
          btnText="Play Now"
          btnUrl="/play-now"
          title="join america’s largest game of tag today!"
          titleClass="h-custom"
        />
      )}
    </>
  );
}
