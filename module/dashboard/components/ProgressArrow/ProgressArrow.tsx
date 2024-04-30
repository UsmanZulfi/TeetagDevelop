interface ProgressArrowProps {
  color: string;
}
const ProgressArrow = ({ color }: ProgressArrowProps) => {
  return (
    <svg
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.597656 3.67059L3.35745 0.915161L6.11725 3.67059"
        stroke={color}
        stroke-width="0.829448"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.35742 0.915161V11.0184"
        stroke={color}
        stroke-width="0.829448"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ProgressArrow;
