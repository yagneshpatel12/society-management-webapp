import Styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { Copyright } from "../../../import";

const Footer = () => {
  return (
    <>
      <div className={`${Styles.footerWrapper}`}>
        <div className={`container ${Styles.footer}`}>
          <div className={`${Styles.aboutSociety}`}>
            <div>
              <h2>Contact us</h2>
              <p>
                <i className="fas fa-envelope"></i>
                <span> digitalsociety2@gmail.com</span>
              </p>
              <p style={{alignItems:'flex-start'}}>
                      <i className="fas fa-map-marker-alt"></i>
                <span>
                  Digital Society ,thalota <br /> road,visnagar,gujrat,
                  <br /> india.
                </span>
              </p>
            </div>
          </div>
          <div className={`${Styles.quickLinks}`}>
            <div>
              <h2>Quick Links</h2>
              <ul>
                <Link to="/2dview">
                  <li>2D view</li>
                </Link>
                <Link to="/advertise">
                  <li>Advertise</li>
                </Link>
                <Link to="/gallery">
                  <li>Gallery</li>
                </Link>
                <Link to="/contact">
                  <li>Contact us</li>
                </Link>
              </ul>
            </div>
          </div>
          <div className={`${Styles.eventsPlanning}`}>
            <div>
              <h2>Events Planning</h2>
              <p>
                For performing any events in the society grant permission from society admin.
              </p>
              <Link to="/contact">
                <button className="btnStructure">Contact Us</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.imagesWarning}>
        <p>All images used in this project are downloded from unsplash.com and pexels.com .so credite goes to this websites and his users. Any images or content are not familier so you can contact us we will delete them.</p>
      </div>
      <Copyright />
    </>
  );
};

export default Footer;
