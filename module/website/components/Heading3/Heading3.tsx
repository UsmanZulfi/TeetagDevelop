import styles from "./Heading3.module.css";

type HeadingProps = {
  title?: string;
};
export default function Heading3({ title }: HeadingProps) {
  return (
    <div
      className={styles.heading + " font-fugaz uppercase text-center relative"}
    >
      <h1>{title}</h1>
      <h3>{title}</h3>
    </div>
  );
}
