import Image from "next/image";
import ProgressArrow from "../ProgressArrow/ProgressArrow";
import StaticGraph from "../StaticGraph/StaticGraph";
import styles from "./StatusCard.module.css";

interface StatusCardProps {
  title: string;
  amount?: string | null;
  percentage: string;
  color: string;
  count?: string | null;
  id: number;
  color_name: string;
}

const StatusCard = ({
  title,
  amount,
  percentage,
  color,
  count,
  id,
  color_name,
}: StatusCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_header}>
        <h6 className="font-fugaz uppercase">{title}</h6>
        <Image src="/assets/more.png" width="33" height="33" alt="more_btn" />
      </div>
      <div className={styles.card_body}>
        <div className="flex flex-col basis-2/6 gap-8 justify-evenly">
          <div className="text-lg xl:text-xl font-semibold">
            {amount || amount == "0" ? `$ ` + amount : ""}
            {count ?? ""}
          </div>
          <div className="flex items-center mb-6 gap-2">
            <ProgressArrow color={color} />
            <p className={styles.percentage + " " + styles[color_name]}>
              {percentage}
            </p>
          </div>
        </div>
        <StaticGraph color={color} id={id} />
      </div>
    </div>
  );
};

export default StatusCard;
