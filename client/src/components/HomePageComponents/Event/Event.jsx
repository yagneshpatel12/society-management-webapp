  import Styles from "./Event.module.css";
import {EventCard,SwiperSlider} from '../../../import';

function Event({events}) {
  //geting the data from data.js and making array as a element objectc
  let slideArray = [];
  slideArray = events.map((data,index) => {
    return <EventCard {...data} key={index} />;
  });
  return (
    <>
      <div className={`${Styles.eventWrapper} container`}>
        <h1 className="heading" data-aos="zoom-in">
          Upcoming Events
        </h1>
        <SwiperSlider slideArray={slideArray} />
      </div>
    </>
  );
}

export default Event;
