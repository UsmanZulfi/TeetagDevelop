import ApplyBanner from "@/website/components/ApplyBanner/ApplyBanner";
import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import Heading from "@/website/components/Heading/Heading";
import { Loader } from "@/website/components/Loader/Loader";
import { Paginator } from "@/website/components/Paginator/Paginator";
import TeetagList from "@/website/components/TeetagList/TeetagList";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import MinionList from "@/website/containers/MinionList/MinionList";
import { teetagListItems } from "@/website/lib/types/common";
import { SingleMinion } from "@/website/lib/types/teetagTypes";
import { useState } from "react";

const Minions = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [allMinions, setAllMinions] = useState<SingleMinion[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleDataChange = (data: SingleMinion[]) => {
    setAllMinions(data);
    setIsLoading(false);
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TitleHead title="State Ambassador" metaTitle="Minions" metaDesc="" />
          <section className="minions-hero">
            <Header />
            <div className="story-content" style={{ marginTop: "0px" }}>
              <div className="container">
                <h1 className="text-center uppercase h1 font-fugaz shadow-heading">
                  State Ambassadors
                </h1>
              </div>
            </div>
          </section>
          <p className="mt-10 mb-20 text-center h8 px-10 md:px-52">
            State Ambassadors are selectively chosen teenagers,
            <br />
            <div className="flex flex-col xl:flex-row justify-between items-center mt-8 xl:gap-2">
              {teetagListItems.map((item, index) => (
                <TeetagList
                  key={index}
                  ulClassConfig={"teetag-list sm"}
                  liClassConfig={"ml-3 capitalize text-yellow-primary "}
                  items={[item]}
                />
              ))}
            </div>
            <br />
            State Ambassadors are in charge and responsible for spreading TeeTag
            throughout their own state. State Ambassadors get rewarded by
            receiving a portion of every tag they generate. This creates a fun,
            competitive, and interactive way to spread the game of TeeTag while
            also giving back to those in financial need.
          </p>
          <ApplyBanner
            btnText="Apply here "
            btnUrl="/apply-minion"
            title="Apply to be a State Ambassador"
            titleClass="h4"
          />
          <div className="flex justify-center items-center mt-20">
            <Heading title="Current State Ambassadors" />
          </div>
          <MinionList minions={allMinions || []} />
        </>
      )}
      <Paginator
        pageNumber={pageNumber}
        onPageChange={setPageNumber}
        onDataLoad={handleDataChange}
        apiURL={`/minion/all?page=${pageNumber}&limit=12`}
        parameter="minions"
      />
      <Footer />
    </>
  );
};

export default Minions;
