import Styles from "./Card.module.css";
const Card = ({ name, discription, date, time, place, img }) => {
  return (
    <>
      <div className={` box-shadow ${Styles.eventCard}`}>
        <div className={`${Styles.eventCardText}`}>
          <h3>{name}</h3>
          <p className={`${Styles.discription}`}>{discription}</p>
          <div>
            <p>
             <i className="fas fa-calendar-alt"></i>
              {date}
            </p>
            <p>
             <i className="far fa-clock"></i>
              {time}
            </p>
            <p>
                <i className="fas fa-map-marker-alt"></i>
              {place}
            </p>
          </div>
        </div>
        <div className={`${Styles.eventCardImg}`}>
          <img src={img} alt="" />
        </div>
      </div>
    </>
  );
};

export default Card;
