import Styles from "./ManagmentPeoples.module.css";
import Card from "./Card/Card";

const Managmentpeoples = ({management}) => {
  return (
    <>
    <div className={Styles.managementWrapper}>
      <div className="container container-margin-top">
        <h1 className="heading" data-aos="zoom-in">
          Management Peoples
        </h1>
        <div className={`${Styles.cardList}`}>
          {
            management.map((people,index)=>{
              return <Card {...people} key={index} dataAos="fade-up"/>
            })
          }
        </div>
      </div>
        </div>
    </>
  );
};

export default Managmentpeoples;
