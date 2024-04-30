import Image from "next/image";
import uuid from "react-uuid";
import styles from "./StatusListCard.module.css";

interface StatusListCardProps {
  title: string;
  data: {
    name: string;
    date?: string;
    amount?: string;
    percentage?: string;
    tag?: string;
    state?: string;
  }[];
}
const StatusListCard = ({ data, title }: StatusListCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_header}>
        <h6 className="h8 font-fugaz uppercase">{title}</h6>
        <Image src="/assets/more.png" width="33" height="33" alt="more_btn" />
      </div>
      <div className={styles.card_body}>
        <ul className="teetag_dashboard_list">
          {data.map((listData) => (
            <li key={uuid()}>
              <div className="flex justify-between items-start">
                <div className="teetag_dashboard_list__left">
                  <h6 className="title">
                    {listData.name}{" "}
                    {listData.tag ? (
                      <span className="text-green-light">
                        ({listData.tag} Tag)
                      </span>
                    ) : null}
                  </h6>
                  <p className="date">{listData.date}</p>
                </div>
                <div className="teetag_dashboard_list__right">
                  <p className="amount">
                    {listData.percentage ?? listData.amount}
                  </p>
                  <p className="state">{listData.state}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StatusListCard;
