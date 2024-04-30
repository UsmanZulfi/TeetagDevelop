import Image from "next/image";
import styles from "./Player.module.css";

type PlayerProps = {
  name: string;
  image: string;
  state: string;
};

export const Player = ({ name, image, state }: PlayerProps) => {
  return (
    <div className={styles.playerbox}>
      <div className={styles.img}>
        <Image src={image} fill alt="player" className="teetag-image-shadow" />
      </div>
      <div>
        <h5 className="font-semibold uppercase h5 text-green-light">{name}</h5>
        <p className="capitalize h6">{state}</p>
      </div>
    </div>
  );
};
