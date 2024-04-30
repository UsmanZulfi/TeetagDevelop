import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import Heading from "@/website/components/Heading/Heading";
import StateBox from "@/website/components/LeaderBoard-State/StateBox";
import LoaderTransparent from "@/website/components/LoaderTransparent/LoaderTransparent";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { statesLeaderboard } from "@/website/lib/networkCalls/storeFunctions";
import { LeaderBoardProps } from "@/website/lib/types/teetagTypes";
import { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaderBoard, setLeaderBoard] = useState<LeaderBoardProps[]>([]);
  const [top4, setTop4] = useState<LeaderBoardProps[]>([]);
  const [loadedStates, setLoadedStates] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getLeaderBoard() {
      const res: LeaderBoardProps[] = await statesLeaderboard();
      setLeaderBoard(res);
      setTop4(res.slice(0, 4));
      setLoadedStates(res.slice(0, 10));
    }
    getLeaderBoard();
  }, []);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const nextLeaderBoard = leaderBoard.slice(0, loadedStates.length + 10);
      setLoadedStates(nextLeaderBoard);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <TitleHead title="leaderboard" metaTitle="Leaderboard" metaDesc="" />
      <section className="leaderboard-hero">
        <Header />
        <div className="story-content">
          <div className="container">
            <h1 className="text-center uppercase h1 font-fugaz shadow-heading">
              STATE LEADERBOARD
            </h1>
            <p className="mt-4 text-center h8">
              As the creator/founder of TeeTag.com, I would like to use this
              page as an opportunity to share my story and background with you,
              as it is the primary motivation behind my creation of TeeTag.
              Thank you
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Heading title="Top 4 states" />
          <div className="grid grid-cols-2 md:grid-cols-4 max-w-screen-lg gap-8 sm:gap-16 mx-auto">
            {top4.map((leader: LeaderBoardProps, index: number) => (
              <StateBox
                id={index}
                key={index}
                state={leader.name}
                tags={leader.count}
              />
            ))}
          </div>
          <div className="m-auto sm:w-1/2">
            <ul className="mt-16 lg:mt-32 font-bold mr-8 text-black text-stroke-yellow text-transparent line-height-1">
              <div className="mb-10">
                <Heading title="All states" />
              </div>
              {loadedStates.length > 0 &&
                loadedStates.map((item: any, index: number) => {
                  return (
                    <li
                      className="font-fugaz border-2 border-yellow-primary p-4 mb-8 flex flex-row justify-between items-center text-2xl"
                      key={index}
                    >
                      <span className="leaderboard-number text-3xl">
                        {index + 1}
                      </span>
                      <span className="mr-auto ml-5 text-green-light uppercase ">
                        {item.name}
                      </span>
                      <span className="text-white uppercase">
                        {item.count} tags
                      </span>
                    </li>
                  );
                })}
            </ul>
          </div>
          {(loading && <LoaderTransparent />) || (
            <div className="flex justify-center mt-8">
              {loadedStates.length < leaderBoard.length && (
                <button className="btn-teetag yellow" onClick={loadMore}>
                  Load More
                </button>
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Leaderboard;
