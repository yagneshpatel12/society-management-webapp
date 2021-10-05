import Styles from "./Card.module.css";

const Card = ({ name, position, phoneno, email, img, dataAos }) => {
  return (
    <>
      <div className={`box-shadow ${Styles.card}`} data-aos={dataAos}>
        <div className={Styles.imgWrapper}>
        <img src={img} alt="" />
        </div>
        <h3 className={`${Styles.name}`}>{name}</h3>
        <h4 className={`${Styles.position}`}>{position}</h4>
        <p style={{borderTop:'1px solid var(--input-border',paddingTop:'20px'}}>
          <i className="fas fa-phone-alt"></i>
               
          {phoneno}
        </p>
        <p>
           <i className="fas fa-envelope"></i>
          {email}
        </p>
      </div>
    </>
  );
};

export default Card;
