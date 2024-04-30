import Heading from "@/website/components/Heading/Heading";
import Image from "next/image";

const Recipient = () => {
  return (
    <section>
      <div className="container">
        <Heading title="current recipient" />
        <div className="grid items-center grid-cols-1 gap-16 mt-16 lg:mt-0 lg:grid-cols-2 lg:gap-44">
          <div>
            <Image
              src="/assets/my-mission.jpg"
              width={780}
              height={550}
              alt="recipient"
              className="teetag-image-shadow"
            />
          </div>
          <div>
            <h2 className="uppercase h2 font-fugaz text-green-light">
              Daniel Stevens
            </h2>
            <p className="mt-6 h8">
              Daniel is TeeTag's current scholarship recipient. He receives 20%
              of the proceeds from every shirt sold. Daniel lost he beautiful
              mom to Breast Cancer in December of 2021. We are excited for the
              opportunity to help aid his educational future.
            </p>
            <div className="mt-16 fund__progress_bar">
              <div className="image-container">
                <Image src="/assets/loader.png" fill alt="loader" />
              </div>

              <div className="flex items-center justify-between mt-8">
                <p className="h8">
                  Fund Raised <span className="font-bold">$5000</span>
                </p>
                <p className="h8">
                  Fund Goal <span className="font-bold">$100,000</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recipient;
