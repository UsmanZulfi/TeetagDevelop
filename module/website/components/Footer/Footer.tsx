import { Exo, Fugaz_One } from "@next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { TbMail, TbMapPin, TbPhone } from "react-icons/tb";

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

export const Footer = () => {
  return (
    <footer
      className={`${exo.variable} ${fugaz.variable} font-exo bg-black-secondary`}
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-12 py-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-start lg:justify-items-center footer__header">
          <div>
            <Image
              src="/assets/TeeTag-Logo-WHITE-Lettering.png"
              width={300}
              height={130}
              alt="footer-logo"
            />
          </div>
          <div>
            <h6 className="text-2xl uppercase font-fugaz text-green-light">
              TeeTag
            </h6>
            <ul className="flex flex-col gap-8 mt-8">
              <li>
                <Link
                  href="/"
                  className="text-xl font-regular hover:text-yellow-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/play-now"
                  className="text-xl font-regular hover:text-yellow-primary"
                >
                  Play Now!
                </Link>
              </li>
              <li>
                <Link
                  href="/contribution"
                  className="text-xl font-regular hover:text-yellow-primary"
                >
                  Contribute
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-xl font-regular hover:text-yellow-primary"
                >
                  Track Your Tag
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="text-xl font-regular hover:text-yellow-primary"
                >
                  State Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="/bulk-order"
                  className="text-xl font-regular hover:text-yellow-primary"
                >
                  Bulk Order
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="text-2xl uppercase font-fugaz text-green-light">
              The Cause
            </h6>
            <ul className="flex flex-col gap-8 mt-8">
              <li>
                <Link
                  href="/scholarship-recipient"
                  className="text-xl font-regular hover:text-yellow-primary"
                >
                  Current Scholarship Recipient
                </Link>
              </li>
              <li>
                <Link
                  href="/apply-scholarship"
                  className="text-xl font-regular hover:text-yellow-primary"
                >
                  Apply to be Scholarship Recipient
                </Link>
              </li>
              <li>
                <Link
                  href="/apply-minion"
                  className="text-xl font-regular hover:text-yellow-primary"
                >
                  Apply to become a State Ambassador
                </Link>
              </li>
              <li>
                <Link
                  href="/story"
                  className="text-xl font-regular hover:text-yellow-primary"
                >
                  My Story (Jack Bradley)
                </Link>
              </li>
              <li>
                <Link
                  href="/influencer"
                  className="text-xl font-regular hover:text-yellow-primary"
                >
                  Influencers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="text-2xl uppercase font-fugaz text-green-light">
              Useful Links
            </h6>
            <ul className="flex flex-col gap-8 mt-8">
              <li>
                <a href="tel:+1-111-222-3345">
                  <div className="flex items-center justify-start gap-4">
                    <TbPhone />
                    <p>My Account</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="">
                  <div className="flex items-center justify-start gap-4">
                    <TbMapPin />
                    <Link
                      href="/contact-us"
                      className="text-xl font-regular hover:text-yellow-primary"
                    >
                      Contact
                    </Link>
                  </div>
                </a>
              </li>
              <li></li>
              <li>
                <a href="mailto:jack@teetag.com">
                  <div className="flex items-center justify-start gap-4">
                    <TbMail />
                    <p>Jack@TeeTag.com</p>
                  </div>
                </a>
              </li>
            </ul>
            <ul className="flex items-center gap-10 mt-10">
              <li>
                <a href="https://www.instagram.com/tagacrossamerica">
                  <FaInstagram className="h8 text-yellow-primary hover:text-green-dark" />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/people/Tag-Across-America/100094108641059">
                  <FaFacebookF className="h8 text-yellow-primary hover:text-green-dark" />
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@tagacrossamerica">
                  <FaTiktok className="h8 text-yellow-primary hover:text-green-dark" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="px-4 py-4 lg:px-0 footer__bottom bg-green-light">
        <p className="text-base text-center font-regular text-black-secondary">
          TEETAG © 2023 All Rights Reserved |{" "}
          <a
            href="/assets/privacy-policy.pdf"
            target="_blank"
            className="hover:font-semibold"
          >
            Privacy Policy
          </a>{" "}
          | Terms of Service
        </p>
      </div>
    </footer>
  );
};
