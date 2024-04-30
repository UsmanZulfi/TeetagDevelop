import styles from "./Heading.module.css";

type HeadingProps = {
  title: string;
};

export default function Heading({ title }: HeadingProps) {
  return (
    <div
      className={styles.heading + " font-fugaz uppercase text-center relative"}
    >
      <h1>{title}</h1>
      <h3>{title}</h3>
    </div>
  );
}
