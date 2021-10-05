import {Link} from 'react-router-dom'
import Styles from './Successful.module.css'

const Successful = () => {
    return (
        <>
            <div className={`box-shadow ${Styles.successful}`}>
                <h3>password changed <br />successfully .</h3>
                <img src="./images/icons/success.png" alt="" />
                <Link to='/login'><button className='btnStructure'> login</button></Link>
            </div>
        </>
    )
}

export default Successful;
