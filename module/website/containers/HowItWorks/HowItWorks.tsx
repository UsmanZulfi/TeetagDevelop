import Heading from "module/website/components/Heading/Heading";
import Image from "next/image";
import Link from "next/link";
import styles from "./HowItWorks.module.css";

export default function HowitWorks() {
  return (
    <section className="section">
      <div className="container">
        <Heading title="HOW IT WORKS!" />
        <div className="grid gap-16 gird-cols-1 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col items-center justify-start gap-6 text-center lg:col-start-1 lg:col-end-5">
            <Image
              src="/assets/hand.svg"
              width={35}
              height={50}
              className="mx-auto"
              alt="hand"
            />
            <h4 className="uppercase h5 font-fugaz text-green-light">
              You are it!
            </h4>
            <p className="h8">
              If you receive a shirt - You've been tagged! YOU ARE IT!
            </p>
          </div>
          <div className="flex flex-col items-center justify-start gap-6 text-center lg:col-start-5 lg:col-end-9 ">
            <Image
              src="/assets/diversity.svg"
              width={35}
              height={50}
              alt="hand"
            />
            <h4 className="uppercase h5 font-fugaz text-green-light">
              TAG SOMEBODY!
            </h4>
            <p className="h8">
              Purchase a shirt(s) and send it to somebody. DO NOT BREAK THE
              CHAIN. Your small act of kindness can lead to so much more
            </p>
          </div>
          <div className="flex flex-col items-center justify-start gap-6 text-center lg:col-start-9 lg:col-end-13">
            <Image src="/assets/touch.svg" width={35} height={50} alt="hand" />
            <h4 className="uppercase h5 font-fugaz text-green-light">
              WHO TO TAG?
            </h4>
            <p className="h8">
              Family, friends, neighbors, colleagues, a secret crush, a
              stranger, the kid ignored at school... Anyone you want!
            </p>
          </div>
          <div className="flex flex-col items-center justify-start gap-6 text-center lg:col-start-3 lg:col-end-7">
            <Image
              src="/assets/activisim.svg"
              width={35}
              height={50}
              alt="hand"
            />
            <h4 className="uppercase h5 font-fugaz text-green-light">
              DON’t WANnA BUY A SHIRT?
            </h4>
            <p className="h8">
              Make a contribution! Jack will personally tag & spread shirts
              across the country on your behalf. Every $25 contributed, 1 person
              will be sent a shirt and tagged.
            </p>
          </div>
          <div className="flex flex-col items-center justify-start gap-6 text-center lg:col-start-7 lg:col-end-11">
            <Image src="/assets/link.svg" width={35} height={50} alt="hand" />
            <h4 className="uppercase h5 font-fugaz text-green-light">
              START YOUR OWN<br></br> CHAIN!
            </h4>
            <p className="h8">
              YOU DO NOT NEED TO BE TAGGED TO PLAY TEETAG. Start your own chain!
              Your tag/tags can lead to many more beyond yourself
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-32 lg:gap-16 mt-24 lg:grid-cols-3 lg:mt-48">
          <Link
            href="/contribution"
            className={styles.btn_teetag2 + " " + styles.yellow}
          >
            <Image
              src="/assets/hand_heart.png"
              width={35}
              height={50}
              alt="icon-contribute"
            />
            <p className="font-fugaz">CONTRIBUTE HERE</p>
          </Link>
          <Link
            href="/play-now"
            className={styles.btn_teetag2 + " " + styles.blue}
          >
            <Image
              src="/assets/arrow.png"
              width={35}
              height={50}
              alt="icon-play"
            />
            <p className="font-fugaz text-5xl">PLAY NOW!</p>
          </Link>
          <Link
            href="/play-now"
            className={styles.btn_teetag2 + " " + styles.green}
          >
            <Image
              src="/assets/link2.png"
              width={35}
              height={50}
              alt="icon-link"
            />
            <p className="font-fugaz">START YOUR CHAIN!</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
