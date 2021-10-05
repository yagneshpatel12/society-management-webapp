import { useEffect } from 'react';
import Styles from './Error.module.css';
const Error = () => {
    useEffect(()=>{
         document.title='Page not found'
    },[])
    return (
        <>
        <div className={`${Styles.errorWrapper} container container-margin-top`}>
            <h1>404</h1>
            <h3>Opps! page not found</h3>
            <p>The page you were looking for doesn't exist.You may have mistyped the address or the page may have moved.</p>
            <button className='btnStructure'>Back to home</button>
        </div>

        </>
    )
}

export default Error
