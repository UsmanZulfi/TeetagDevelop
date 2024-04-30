import TeetagList from "@/website/components/TeetagList/TeetagList";
import Heading3 from "module/website/components/Heading3/Heading3";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import styles from "./Story.module.css";

export default function Story() {
  const videoRef = useRef(null);
  const [showButton, setShowButton] = useState(true);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <section className={styles.story}>
      <div className={styles.story_video_bg}>
        <div className="container">
          <div className="grid grid-cols-1 gap-48 lg:grid-cols-2">
            <div className="relative z-10">
              <h4 className="uppercase h5 font-fugaz text-yellow-primary">
                Meet the Creator
              </h4>
              <h2 className="uppercase h2 font-fugaz text-green-light">
                Jack Bradley
              </h2>
              <p className="max-w-5xl font-normal h7">
                Learn more about my personal story and my motivation behind the
                creation of TeeTag.
              </p>
              <Link href="/story" className="btn-teetag yellow">
                Learn my Story
              </Link>
            </div>
          </div>
        </div>
        {/* Modified tag. Need to check on live */}
        <video autoPlay loop muted playsInline><source src="/assets/jack.mp4" type="video/mp4"/></video>
      </div>
      <div className="container">
        <div className="grid items-center grid-cols-1 gap-16 py-60  lg:gap-24 lg:py-40 lg:grid-cols-2 ">
          <div className="flex flex-col justify-center items-start">
            <Heading3 title="my mission" />
            <div className="mt-10">
              <TeetagList
                ulClassConfig={"teetag-list sm"}
                liClassConfig={"ml-3 font-bold"}
                items={[
                  "1 million people to be tagged across all of America",
                  "Raise $5000 for the current scholarship recipient - Daniel Stevens",
                  "Assist as many teenagers as possible who’ve lost a parent to cancer",
                ]}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-10">
            <div className="image-container">
              <Image
                src="/assets/my-mission.jpg"
                alt="story"
                fill
                className="teetag-image-shadow"
              />
            </div>
            <p className="text-xl font-bold">
              Current Scholarship Recipient - Daniel Stevens
            </p>
          </div>
        </div>
        <div className="grid items-center grid-cols-1 gap-16 lg:gap-24 lg:grid-cols-2">
          <div className={styles.storybox__thumb + " order-2 lg:order-1"}>
            <div className="relative inline-block lg:mt-16 xl:mt-0">
              <video
                ref={videoRef}
                src="/assets/cbc-video.mp4"
                controls
                className="teetag-image-shadow"
                onPlay={() => {
                  setShowButton(false);
                }}
                onPause={() => setShowButton(true)}
              />
              {showButton && (
                <button
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    width: "50px",
                  }}
                  onClick={handlePlayPause}
                >
                  <img src="/assets/playbutton.svg" alt="Play Button" />
                </button>
              )}
            </div>
          </div>
          <div className="order-1 px-0 lg:px-40 lg:order-2">
            <Heading3 title="Featured on cbs news" />
          </div>
        </div>
      </div>
    </section>
  );
}
