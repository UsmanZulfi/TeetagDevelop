import styles from "./FilterBox.module.css";
interface FilterBoxProps {
  values: string[];
  onChange: (value: string) => void;
}

const FilterBox = ({ values, onChange }: FilterBoxProps) => {
  return (
    <form className={styles.sortbox}>
      <select onChange={(e) => onChange(e.target.value)}>
        <option value="">Filter By</option>
        {values &&
          values.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
      </select>
    </form>
  );
};

export default FilterBox;
