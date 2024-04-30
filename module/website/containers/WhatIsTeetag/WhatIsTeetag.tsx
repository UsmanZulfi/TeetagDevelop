import Heading from "module/website/components/Heading/Heading";
import styles from "./WhatIsTeetag.module.css";

export default function WhatIsTeetag() {
  return (
    <section className={styles.what_is_teetag + " section"}>
      <div className="container">
        <Heading title="What is TEETAG?" />
        <p className="max-w-screen-xl text-center h8 font-semibold px-10 lg:px-36 2xl:px-0 sm:px-0">
          TeeTag is simple… It’s TAG! America’s LARGEST game of tag through the
          use of custom t-shirts in order to help raise money for children
          who’ve lost a parent to Cancer. TeeTag spans across all 50 states of
          America and is meant to be a fun, interactive, pay-it-forward game to
          raise money for a greater cause.
        </p>
      </div>
    </section>
  );
}
