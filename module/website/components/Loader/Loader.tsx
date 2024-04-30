import { ThreeDots } from "react-loader-spinner";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center loader">
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
