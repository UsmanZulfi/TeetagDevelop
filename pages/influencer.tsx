import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import Heading from "@/website/components/Heading/Heading";
import { Loader } from "@/website/components/Loader/Loader";
import { Paginator } from "@/website/components/Paginator/Paginator";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import MinionList from "@/website/containers/MinionList/MinionList";
import { SingleInfluencer } from "@/website/lib/types/teetagTypes";
import { useState } from "react";

const Influencer = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [allInfluencers, setAllInfluencers] = useState<SingleInfluencer[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleDataChange = (data: SingleInfluencer[]) => {
    setAllInfluencers(data);
    setIsLoading(false);
  };
  return (
    <>
      {(isLoading && <Loader />) || (
        <>
          <TitleHead title="Influencers" metaTitle="Influencers" metaDesc="" />
          <section className="minions-hero">
            <Header />
            <div className="story-content">
              <div className="container">
                <h1 className="text-center uppercase h1 font-fugaz shadow-heading">
                  INFLUENCERs
                </h1>
              </div>
            </div>
          </section>
          <p className="mt-14 mb-20 text-center h8 px-10 md:px-52">
            Influencers are people who have a mid to large-size following on any
            form of social media. Either I have reached out to them or they have
            reached out to me to partner with TeeTag and work together. TeeTag
            is willing to work with any influencer (in good standing) who is
            interested. If you fit this criterion or know somebody who does and
            wants to reach out - feel free to email Jack@teetag.com for more
            information or inquiries.
            <br /> <br />
            <span className="text-center mt-8 text-yellow-primary">Note</span>
            <br />
            Influencers have the option to use their earnings to raise money for
            a specific person/organization that's special to them if they’d
            like.
          </p>
          <div className="flex justify-center items-center mt-40">
            <Heading title="Current Influencers" />
          </div>
          <MinionList minions={allInfluencers || []} />
        </>
      )}
      <Paginator
        pageNumber={pageNumber}
        onPageChange={setPageNumber}
        onDataLoad={handleDataChange}
        apiURL={`/influencer/all?page=${pageNumber}&limit=12`}
        parameter="influencers"
      />
      <Footer />
    </>
  );
};

export default Influencer;
