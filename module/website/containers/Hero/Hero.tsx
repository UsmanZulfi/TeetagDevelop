import { Header } from "module/website/components/Header/Header";
import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Header />
      <div className="container text-center">
        <div className={styles.content}>
          <h4 className="h4 font-fugaz">
            Welcome to <span className="uppercase">TeeTag</span>
          </h4>
          <div className={styles.separator}></div>
          <h1 className="mt-12 uppercase h1 font-fugaz shadow-heading">
            AMERICA'S LARGEST GAME OF{" "}
            <span className="text-yellow-primary">TAG</span> For a Greater
            Cause!
          </h1>
          <Link href="/play-now" className="btn-teetag yellow">
            Play Now
          </Link>
        </div>
      </div>
      {/* Modified tag. Need to check on live */}
      <video src="/assets/hero_video.mp4" autoPlay loop muted playsInline></video>
    </section>
  );
}
