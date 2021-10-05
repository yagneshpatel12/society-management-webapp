import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Keyboard,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "./swiper-slider.css";
import "swiper/swiper.min.css";
import "swiper/swiper-react.esm";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

function SwiperSlider({ type = "event", slideArray }) {
  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Keyboard]);
  return (
    <>
      <Swiper
        spaceBetween={0}
        slidesPerView={"auto"}
        pagination={{ dynamicBullets: true }}
        keyboard={true}
      >
        {slideArray.map((slide) => {
          return (
            <SwiperSlide className={`${type}-swiper`} key={slide.key}>
              {slide}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
export default SwiperSlider;
