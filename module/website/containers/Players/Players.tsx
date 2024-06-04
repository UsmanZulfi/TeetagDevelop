import Heading3 from "@/website/components/Heading3/Heading3";
import { Player } from "@/website/components/Player/Player";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

//spaces might be leading to errors!? Renamed files without spaces
const players = [
  {
    image: "https://teetag.com/wp-content/uploads/2024/06/Dan_Kentucky.png",
    name: "Dan",
    state: "Kentucky",
  },
  {
    image: "https://teetag.com/wp-content/uploads/2024/06/David_Illinois.png",
    name: "David",
    state: "Illinois",
  },
  {
    image: "https://teetag.com/wp-content/uploads/2024/06/Emma_Illinois.png",
    name: "Emma",
    state: "Illinois",
  },
  {
    image: "https://teetag.com/wp-content/uploads/2024/06/Evan_Illinois.png",
    name: "Evan",
    state: "Illinois",
  },
  {
    image: "https://teetag.com/wp-content/uploads/2024/06/SophiaAva_Illinois.png",
    name: "Sophia + Ava",
    state: "Illinois",
  },
  {
    image: "https://teetag.com/wp-content/uploads/2024/06/Maggie_Illinois.png",
    name: "Maggie",
    state: "Illinois",
  },
  {
    image: "https://teetag.com/wp-content/uploads/2024/06/Izzy_Illinois.jpg",
    name: "Izzy",
    state: "Illinois",
  },
  {
    image: "https://teetag.com/wp-content/uploads/2024/06/Grace_Illinois.png",
    name: "Grace",
    state: "Illinois",
  },
  {
    image: "https://teetag.com/wp-content/uploads/2024/06/IMG_8674.png",
    name: "Jack",
    state: "Illinois",
  },
];

import "swiper/css";

const SwiperButtonNext = ({ children }: any) => {
  const swiper = useSwiper();
  return <button onClick={() => swiper.slideNext()}>{children}</button>;
};

const SwiperButtonPrev = ({ children }: any) => {
  const swiper = useSwiper();
  return <button onClick={() => swiper.slidePrev()}>{children}</button>;
};
export default function Players() {
  return (
    <>
      <style>{`
        .swiper {
          overflow: visible ;
        }

        `}</style>
      <section className="overflow-hidden mb-8 md:mb-0">
        <div className="container">
          <div className="flex items-center justify-between">
            <Heading3 title="recent players" />
          </div>
          <Swiper
            className="mt-24"
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            breakpoints={{
              // when window width is >= 640px
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            // slidesPerView="auto"
            speed={1500}
            grabCursor={true}
            modules={[Autoplay]}
          >
            {players.map((player) => (
              <SwiperSlide key={player.name}>
                <Player
                  image={player.image}
                  name={player.name}
                  state={player.state}
                />
              </SwiperSlide>
            ))}

            {/* <div className="flex items-center justify-end mt-12 space-x-8 slider_nav">
              <SwiperButtonPrev>
                <svg
                  className=" hover:fill-green-dark"
                  width="77"
                  height="76"
                  viewBox="0 0 77 76"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M38.2773 52.9561L38.6285 53.3026L38.9797 52.9561L44.1077 47.896L44.4684 47.5401L44.1077 47.1842L39.1145 42.2573H53.2799H53.7799V41.7573V34.5287V34.0287H53.2799H39.1145L44.1077 29.1017L44.4684 28.7458L44.1077 28.3899L38.9797 23.3299L38.6285 22.9834L38.2773 23.3299L23.6259 37.7871L23.2652 38.143L23.6259 38.4989L38.2773 52.9561ZM12.3626 12.2159C9.0193 15.515 6.3744 19.3935 4.42816 23.847C2.4752 28.3101 1.5 33.0772 1.5 38.143C1.5 43.2088 2.47524 47.9759 4.42825 52.4391C6.3745 56.8925 9.0193 60.771 12.3626 64.07C15.706 67.3691 19.6359 69.9782 24.1476 71.898C28.6688 73.8242 33.4974 74.7859 38.6285 74.7859C43.7596 74.7859 48.5883 73.8242 53.1096 71.8979C57.6211 69.9781 61.551 67.3691 64.8943 64.07C68.2377 60.771 70.8824 56.8925 72.8287 52.4391C74.7817 47.9759 75.7569 43.2088 75.7569 38.143C75.7569 33.0771 74.7817 28.31 72.8287 23.8468C70.8824 19.3934 68.2377 15.515 64.8943 12.2159C61.551 8.9169 57.6211 6.3067 53.1096 4.3845C48.5883 2.46061 43.7595 1.5 38.6285 1.5C33.4974 1.5 28.6688 2.46051 24.1476 4.3844C19.636 6.3066 15.706 8.9169 12.3626 12.2159ZM59.0639 58.2982C53.4827 63.8055 46.6811 66.5573 38.6285 66.5573C30.5758 66.5573 23.7742 63.8055 18.193 58.2982C12.6121 52.7912 9.8257 46.0829 9.8257 38.143C9.8257 30.203 12.6121 23.4947 18.193 17.9877C23.7742 12.4805 30.5758 9.7286 38.6285 9.7286C46.6811 9.7286 53.4827 12.4805 59.0639 17.9877C64.6448 23.4947 67.4312 30.203 67.4312 38.143C67.4312 46.0829 64.6448 52.7912 59.0639 58.2982Z"
                    stroke="#00FF00"
                    strokeOpacity="0.2"
                    strokeWidth="2"
                  />
                </svg>
              </SwiperButtonPrev>
              <SwiperButtonNext>
                <svg
                  className="rotate-180 hover:fill-green-dark"
                  width="77"
                  height="76"
                  viewBox="0 0 77 76"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M38.2773 52.9561L38.6285 53.3026L38.9797 52.9561L44.1077 47.896L44.4684 47.5401L44.1077 47.1842L39.1145 42.2573H53.2799H53.7799V41.7573V34.5287V34.0287H53.2799H39.1145L44.1077 29.1017L44.4684 28.7458L44.1077 28.3899L38.9797 23.3299L38.6285 22.9834L38.2773 23.3299L23.6259 37.7871L23.2652 38.143L23.6259 38.4989L38.2773 52.9561ZM12.3626 12.2159C9.0193 15.515 6.3744 19.3935 4.42816 23.847C2.4752 28.3101 1.5 33.0772 1.5 38.143C1.5 43.2088 2.47524 47.9759 4.42825 52.4391C6.3745 56.8925 9.0193 60.771 12.3626 64.07C15.706 67.3691 19.6359 69.9782 24.1476 71.898C28.6688 73.8242 33.4974 74.7859 38.6285 74.7859C43.7596 74.7859 48.5883 73.8242 53.1096 71.8979C57.6211 69.9781 61.551 67.3691 64.8943 64.07C68.2377 60.771 70.8824 56.8925 72.8287 52.4391C74.7817 47.9759 75.7569 43.2088 75.7569 38.143C75.7569 33.0771 74.7817 28.31 72.8287 23.8468C70.8824 19.3934 68.2377 15.515 64.8943 12.2159C61.551 8.9169 57.6211 6.3067 53.1096 4.3845C48.5883 2.46061 43.7595 1.5 38.6285 1.5C33.4974 1.5 28.6688 2.46051 24.1476 4.3844C19.636 6.3066 15.706 8.9169 12.3626 12.2159ZM59.0639 58.2982C53.4827 63.8055 46.6811 66.5573 38.6285 66.5573C30.5758 66.5573 23.7742 63.8055 18.193 58.2982C12.6121 52.7912 9.8257 46.0829 9.8257 38.143C9.8257 30.203 12.6121 23.4947 18.193 17.9877C23.7742 12.4805 30.5758 9.7286 38.6285 9.7286C46.6811 9.7286 53.4827 12.4805 59.0639 17.9877C64.6448 23.4947 67.4312 30.203 67.4312 38.143C67.4312 46.0829 64.6448 52.7912 59.0639 58.2982Z"
                    stroke="#00FF00"
                    strokeOpacity="0.2"
                    strokeWidth="2"
                  />
                </svg>
              </SwiperButtonNext>
            </div> */}
          </Swiper>
        </div>
      </section>
    </>
  );
}
