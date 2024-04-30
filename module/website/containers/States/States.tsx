import { statesLeaderboard } from "@/website/lib/networkCalls/storeFunctions";
import { LeaderBoardProps } from "@/website/lib/types/teetagTypes";
import Heading3 from "module/website/components/Heading3/Heading3";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./States.module.css";

export default function States() {
  const [leaderboard, setLeaderboard] = useState<any>([]);
  useEffect(() => {
    async function getStatesLeaderBoard() {
      const res: LeaderBoardProps[] = await statesLeaderboard(5);
      setLeaderboard(res);
    }
    getStatesLeaderBoard();
  }, []);
  return (
    <section className={styles.states}>
      <div className="container">
        <div className="">
          <Heading3 title="Top 5 States" />
          <ul className="mt-16 lg:mt-32 leaderboard-list">
            {leaderboard?.map((item: any, index: number) => {
              return (
                <li className="font-fugaz" key={index}>
                  {item.name}{" "}
                  <span className="font-exo">{item.count} tags</span>
                </li>
              );
            })}
          </ul>
          <Link
            href="/leaderboard"
            className="text-center lg:text-start btn-teetag yellow"
          >
            See Complete Leaderboard
          </Link>
        </div>
      </div>
    </section>
  );
}
