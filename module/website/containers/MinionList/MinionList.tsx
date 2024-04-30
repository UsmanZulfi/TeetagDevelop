import MinionBox from "@/website/components/MinionBox/MinionBox";
import {
  SingleInfluencer,
  SingleMinion,
} from "@/website/lib/types/teetagTypes";
import uuid from "react-uuid";

interface MinionBoxProps {
  minions?: SingleMinion[] | SingleInfluencer[];
}

const MinionList = ({ minions }: MinionBoxProps) => {
  return (
    <section className="section minion_list" style={{ padding: "75px" }}>
      <div className="container">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {minions?.map((minion) => {
            return <MinionBox key={uuid()} minion={minion} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default MinionList;
