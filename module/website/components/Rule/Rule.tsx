import styles from "./Rule.module.css";

type RoleProps = {
  num: number;
  text: string;
  shadowColor: string;
  title?: string;
};
export default function Rule({ num, text, title, shadowColor }: RoleProps) {
  return (
    <div className={styles.rule + " " + styles[shadowColor]}>
      <h2 className="font-fugaz">{num}</h2>
      {title && (
        <h6 className="mb-2 uppercase h8 xl:h8 font-fugaz text-black-bg">
          {title}
        </h6>
      )}
      <p className="text-black-dark h9 font-medium">{text}</p>
    </div>
  );
}
