interface TeetagListProps {
  items: string[];
  ulClassConfig: string;
  liClassConfig: string;
}
const TeetagList = ({
  items,
  ulClassConfig,
  liClassConfig,
}: TeetagListProps) => {
  return (
    <ul className={ulClassConfig}>
      {items.map((item) => (
        <li key={item}>
          <span className={liClassConfig}>{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default TeetagList;
