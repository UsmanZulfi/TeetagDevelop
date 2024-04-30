import { SingleMinion } from "@/website/lib/types/teetagTypes";
import Image from "next/image";

interface MinionBoxProps {
  minion: SingleMinion;
}

const MinionBox = ({ minion }: MinionBoxProps) => {
  return (
    minion && (
      <div className="flex flex-col gap-12">
        <div className="image-container-minion-box">
          <Image
            src={minion.image ? minion.image : "/assets/placeholder-large.png"}
            blurDataURL="/assets/placeholder-large.png"
            placeholder="blur"
            fill
            alt={minion.image}
          />
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h6 className="h6 font-bold uppercase">{minion.name}</h6>
            <p className="h8">{minion.state}</p>
          </div>
          <p className="h6 text-green-light font-bold">{minion.total_tags}</p>
        </div>
      </div>
    )
  );
};

export default MinionBox;
