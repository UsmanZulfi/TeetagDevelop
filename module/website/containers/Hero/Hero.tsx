import { Header } from "module/website/components/Header/Header";
import Link from "next/link";
import styles from "./Hero.module.css";
import { useEffect, useState } from "react";

export default function Hero() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <section className={styles.hero}>
      <Header />
      <div className="container text-center">
        <div className={styles.content}>
          <h4 className="h6 font-fugaz">
            Welcome to <span className="uppercase">TeeTag</span>
          </h4>
          <div className={styles.separator}></div>
          <h1 className={windowWidth < 767 ? "mt-20 uppercase heading font-fugaz shadow-heading mb-20 px-1" : "mt-12 uppercase h2 font-fugaz shadow-heading"}>
            AMERICA'S LARGEST GAME OF{" "}
            <span className="tag-span">
              <span className="text-yellow-primary">TAG</span> For a Greater
              Cause!
            </span>
          </h1>
          <Link href="/play-now" className="btn-teetag yellow min-width-300 " >
            Play Now
          </Link>
        </div>
      </div>
      {/* Modified tag. Need to check on live */}
      <video
        src="/assets/hero_video.mp4"
        autoPlay
        loop
        muted
        playsInline
      ></video>
    </section>
  );
}
