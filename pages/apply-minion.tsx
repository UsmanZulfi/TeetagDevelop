import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import MinionForm from "@/website/components/MinionForm/MinionForm";
import TeetagList from "@/website/components/TeetagList/TeetagList";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { teetagListItems } from "@/website/lib/types/common";

const ApplyMinion = () => {
  return (
    <>
      <TitleHead
        title="Apply State Ambassadors"
        metaTitle="Apply State Ambassadors"
        metaDesc=""
      />
      <section className="minions-hero">
        <Header />
        <div className="story-content">
          <div className="container">
            <h1 className="text-center uppercase h1 font-fugaz shadow-heading">
              Apply State Ambassadors
            </h1>
          </div>
        </div>
      </section>
      <div className="mx-96 mt-20">
        <p className="mt-4 text-center h9">
          If you made it here. It may mean you are interested in becoming a
          State Ambassador. If you meet the following criteria, you are eligible
          to apply!
        </p>
        <div className="flex flex-col xl:flex-row justify-between items-center mt-8 xl:gap-2 ">
          {teetagListItems.map((item, index) => (
            <TeetagList
              key={index}
              ulClassConfig={"teetag-list sm"}
              liClassConfig={"ml-3 capitalize text-yellow-primary "}
              items={[item]}
            />
          ))}
        </div>
        <p className="text-white text-center h9">
          As a state ambassador, you have a mission… you are responsible for
          spreading and tagging as many people across your state as possible.
          You will receive a personal custom code and your mission is to get as
          many people in your state to play TeeTag using your code.
          <br />
          When you start, I will provide you with complimentary shirts with
          whatever design, color, and size you want in order to help kick off.
          <br />
          Additionally, there is a monetary incentive as well. State Ambassadors
          earn a portion of every shirt sold where their custom code is used.
          They also receive a portion of the tags created by the people who used
          their code (since you technically created those following tags too).
          <br />
          You and your state will then compete against all the other 49 states
          across the country and compete for the top! **You may have multiple
          state ambassadors in your state.
          <br />
          I’d like to note that you can spread your code in any way you want:
          social media, word-of-mouth, giving out t-shirts, etc. There is no
          wrong or right way. You can be as creative as you’d like with this.
          TeeTag is meant to be a fun and interactive game. I want this to be an
          exciting and enjoyable experience for you. Whatever you need help with
          to succeed, I am here to help!
          <br /> Feel free to apply below if interested! Only a select number of
          applicants will be accepted to be State Ambassadors per state.
          <br />
          Hope to talk to you soon! And if you have any questions regarding any
          of this, don’t hesitate to email me at Jack@teetag.com
        </p>
      </div>
      <MinionForm />
      <Footer />
    </>
  );
};

export default ApplyMinion;
