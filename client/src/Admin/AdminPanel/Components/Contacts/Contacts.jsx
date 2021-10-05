import { useEffect, useState,useRef } from "react";
import{adminDataOperation} from "../../../../http";
import Loader from "../../../../components/shared/Loader/Loader";
import Styles from "./Contacts.module.css";

const Contacts = () => {
    const [contacts,setContacts]=useState([]);
    const [loading,setLoading]=useState(false);
    const [message,setMessage]=useState('');
    const contactRef = useRef();
    async function contactsBackend(operationName,contactData=''){
        setLoading(true);
        const fieldName='contacts';
        let reqData={fieldName,operationName};
        if(operationName==="delete"){
          reqData.dbData=contactData;
        }
        const {data}=await adminDataOperation({data:reqData});
        if(data && operationName === 'delete') contactsBackend('get');
        if(data && operationName ==='get') {
            setContacts(data);
            setLoading(false)
            data.length <1 ? setMessage('No complaine yet') : setMessage('');
        }
    }
    contactRef.current=()=>contactsBackend('get');
    useEffect(()=>{
       contactRef.current();
    },[])
    function ContactsCard(data){
        const {name,email,message} = data;
        return <div className={`${Styles.card} box-shadow`}>
              <span onClick={()=>contactsBackend('delete',data)} className={Styles.deleteBtn}><i className="fas fa-trash"></i></span>
              <h3>{name}</h3>
              <p className={Styles.cardEmail}>
                  <i className="fas fa-envelope"></i>
                  <span>{email}</span>
              </p>
              <p className={Styles.cardMessage}>{message}</p>
        </div>
    }
   return (
        <>
            <div className={Styles.contactWrapper}>
                <h2 className='heading'>Contacts</h2>
                
                {
                    loading ? <Loader message='Loading...'  type='true'/> :
                <div className={Styles.cardWrapper}>
                    {
                    message ? <p className='invalid'>{message}</p> : <></>
                }
                {
                    contacts.map((contact,index)=>{
                        return <ContactsCard key={index} {...contact}/>
                    })
                }
                </div>}
            </div>
        </>
    )
}

export default Contacts;

