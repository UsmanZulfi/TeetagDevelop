import { useEffect, useState } from "react";

interface StaticGraphProps {
  color: string;
  id: number;
}
const StaticGraph = ({ color, id }: StaticGraphProps) => {
  const [svgWidth, setSvgWidth] = useState(200);

  useEffect(() => {
    const handleResize = () => {
      const breakpoint = 1350; // The "lg" breakpoint width
      const screenWidth = window.innerWidth;

      if (screenWidth < breakpoint) {
        setSvgWidth(180);
      } else {
        setSvgWidth(243);
      }
    };

    // Attach the resize event listener
    window.addEventListener("resize", handleResize);

    // Call the handleResize function on component mount
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <svg
      className="basis-4/6"
      width={svgWidth}
      height="92"
      viewBox="0 0 243 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.4868 65.514C19.3688 75.2728 12.6038 83.6374 0.426758 82.2433V91.9996H242.614V1.38347C241.712 0.454065 238.285 -0.847102 231.79 1.38347C223.672 4.17168 206.083 30.6597 189.847 39.0244C173.611 47.389 156.022 27.8702 139.786 26.4761C123.55 25.082 116.785 51.57 101.902 54.3582C87.0189 57.1464 76.1949 48.7847 61.3118 45.9965C46.4288 43.2083 35.6048 55.7553 27.4868 65.514Z"
        fill={`url(#paint${id})`}
      />
      <path
        d="M22.8301 71.1539C24.1816 72.611 28.2361 74.0681 33.6421 68.2397C40.3996 60.9541 44.4542 43.4689 60.6722 40.5547C76.8903 37.6405 80.9448 53.6686 101.217 58.0399C121.49 62.4112 128.247 58.0412 139.059 50.7556C149.872 43.4701 162.035 15.7852 180.956 15.7852C199.877 15.7852 206.635 21.6136 220.15 36.1846C230.962 47.8414 239.071 50.7556 241.774 50.7556"
        stroke={color}
        stroke-width="0.520819"
      />
      <defs>
        <linearGradient
          id={`paint${id}`}
          x1="195.259"
          y1="5.72828"
          x2="196.793"
          y2="81.7646"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color={color} />
          <stop offset="1" stop-color="#242424" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default StaticGraph;
