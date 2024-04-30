import { getProgress } from "@/website/lib/networkCalls/websiteFunctions";
import { useEffect, useState } from "react";
import styles from "./ProgressBanner.module.css";
export default function ProgressBanner() {
  const [progress, setProgress] = useState(null);
  useEffect(() => {
    const getAmericaProgress = async () => {
      const res: any = await getProgress();
      setProgress(res);
    };
    getAmericaProgress();
  }, []);
  return (
    <section className={styles.banner}>
      <div className="container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          <div className={styles.banner_left}>
            <h3 className="text-center uppercase lg:text-left h3 font-fugaz text-shadow-yellow">
              America's Progress...
            </h3>
          </div>
          <div className={styles.box}>
            <h3 className="text-shadow-black font-fugaz">{progress?.users}</h3>
            <p className="font-bold uppercase text-black-bg"># of Players</p>
          </div>
          <div className={styles.box}>
            <h3 className="text-shadow-black font-fugaz">{progress?.tags}</h3>
            <p className="font-bold uppercase text-black-bg">Total Tags</p>
          </div>
          <div className={styles.box}>
            <h3 className="text-shadow-black font-fugaz">
              $ {progress?.money_raised}
            </h3>
            <p className="font-bold uppercase text-black-bg">Money Raised</p>
          </div>
        </div>
      </div>
    </section>
  );
}
