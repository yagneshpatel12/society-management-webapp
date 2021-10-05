import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { adminDataOperation } from '../../http';
import { useGlobalContext } from '../../context/context';
import Styles from './Complaine.module.css'

const Complaine = () => {
  const {user}=useGlobalContext();
    const [complaineData, setComplaineData] = useState({
       subject: "",
       details: "",
  });
  const history = useHistory();
    const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaineData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };
   const submit= async (e)=>{
    e.preventDefault();
    const fieldName='complaines';
    const dbData={...complaineData,email:user.email,houseNo:user.houseNo,familyName:user.familyName}
    let reqData={fieldName,operationName:"create",dbData};
    const {data}= await adminDataOperation({data:reqData});
    if(data.next===true){
        alert('Thank you we will resolve your complaine soon...');
        history.push('/profile');
    }else{
      alert('please try again');
    }
  }
  useEffect(()=>{
    document.title='Complaine - Digital Society'
  },[])
    return (
        <>
        <div className={`container container-margin-top ${Styles.complaineWrapper}`}>
            <h2 className="heading">Complaine to Society</h2>
            <p>
              Write your complaine subject and discription below.We will solve your complaine soon as much as possible.
              Thank you for improving our system.
            </p>
            <form onSubmit={submit} className='box-shadow'>
                <label htmlFor="email">Complaine subject</label>
                <input
                   type="text"
                   name="subject"
                   value={complaineData.email}
                   onChange={handleChange}
                   required
                   autoFocus
                />
               <label htmlFor="message">Complaine details</label>
               <textarea
                  name="details"
                  rows="5"
                  value={complaineData.message}
                  onChange={handleChange}
                  required
               />
            <button type="submit" className="btnStructure">Submit complaine</button>
            </form>
        </div>
        </>
    )
}

export default Complaine;
