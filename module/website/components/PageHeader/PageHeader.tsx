import styles from "./PageHeader.module.css";

type PageHeaderProps = {
  title: string;
};

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <section className={styles.header}>
      <div className="container">
        <h1 className="text-center uppercase h2 text-shadow-yellow font-fugaz">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default PageHeader;
