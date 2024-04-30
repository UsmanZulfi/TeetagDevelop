import styles from "./InnerHeader.module.css";

interface InnerHeaderProps {
  title: string;
  component?: React.ReactNode;
  alignRight?: boolean;
}

const InnerHeader = ({ title, component }: InnerHeaderProps) => {
  return (
    <div className={styles.header}>
      <h4
        className={`${
          (component && "col-span-4") || "col-span-12"
        } font-fugaz h5 uppercase`}
      >
        {title}
      </h4>
      {component && <>{component}</>}
    </div>
  );
};

export default InnerHeader;
