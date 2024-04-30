import { useState } from "react";
import { GoSearch } from "react-icons/go";
import styles from "./SearchBox.module.css";

interface SearchBoxProps {
  handleSearch: (search: string) => void;
}

const SearchBox = ({ handleSearch }: SearchBoxProps) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(search);
  };

  return (
    <form className={styles.cat__searchbox} onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Enter Search Value"
        onChange={handleSearchChange}
      />

      <button type="button" onClick={handleSearchSubmit}>
        <GoSearch />
      </button>
    </form>
  );
};

export default SearchBox;
