import { Link } from "react-router-dom";
import Styles from "./BusinessAdvertiseHomePage.module.css";
import {BusinessAdvertiseCard,SwiperSlider} from "../../../import";

const BusinessAdvertiseHomePage = ({advertises}) => {
  let slideArray = [];
    slideArray = advertises.map((data,index) => {
      return <BusinessAdvertiseCard {...data} key={index} type='link'/>;
    });
    slideArray.push(
      <Link to="/advertise">
        <p className={`secondary-heading ${Styles.btn}`}>
          Explore More Advertise
          <span>
            <i className="fas fa-arrow-right" ></i>
          </span>
        </p>
      </Link>
    );
  
  return  (
    <>
    <div className={Styles.advertiseWrapper}>

      <div className="container container-margin-top">
        <h1 className="heading" data-aos="zoom-in">
          Business Advertise
        </h1>
          <SwiperSlider type="advertise" slideArray={slideArray} />
      </div>
    </div>
    </>
  );
};

export default BusinessAdvertiseHomePage;
