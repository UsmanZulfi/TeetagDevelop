import { ThreeDots } from "react-loader-spinner";
import styles from "./LoaderTransparent.module.css";
const LoaderTransparent = () => {
  return (
    <div className={styles.loader}>
      <ThreeDots
        height="100"
        width="100"
        radius="9"
        color="#ffff00"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};

export default LoaderTransparent;
