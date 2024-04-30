import Image from "next/image";
import Link from "next/link";
import styles from "./InfoBanner.module.css";
export const InfoBanner = () => {
  return (
    <section className={styles.infoBanner}>
      <div className="container">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/play-now" className={styles.infoBox}>
            <Image
              src="/assets/play_arrow.png"
              alt="banner-icon"
              width={40}
              height={40}
            />
            <h6 className="font-fugaz">Tag Someone</h6>
          </Link>
          <Link href="/contribute" className={styles.infoBox}>
            <Image
              src="/assets/volunteer_activism.png"
              alt="banner-icon"
              width={40}
              height={40}
            />
            <h6 className="font-fugaz">Contribute/Donate</h6>
          </Link>
          <Link href="#" className={styles.infoBox}>
            <Image
              src="/assets/accessibility.png"
              alt="banner-icon"
              width={40}
              height={40}
            />
            <h6 className="font-fugaz">Current Recipient</h6>
          </Link>
          <Link href="/story" className={styles.infoBox}>
            <Image
              src="/assets/local_library.png"
              alt="banner-icon"
              width={40}
              height={40}
            />
            <h6 className="font-fugaz">My Story</h6>
          </Link>
        </div>
      </div>
    </section>
  );
};
