import { useState } from 'react';
import Styles from "../../RegisterAdmin.module.css"
import { verifyAdmin } from '../../../../http';
import { useGlobalContext } from '../../../../context/context';
import { Loader } from '../../../../import';
const EmailStep = ({onNext}) => {
    const {tempAdminData}=useGlobalContext();
    const [message,setMessage]=useState('');
    const [loading,setLoading]=useState(false);
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        adminCode:''
    })
   async function submit(e){
      e.preventDefault();
      setLoading(true);
      const {data} = await verifyAdmin({data:formData});
      //invalid
      if(data.next === false){
        setMessage(data.message);
      }else{
        tempAdminData(data);
        onNext();
      }
      setLoading(false)
    }
    function handleChange(e){
        const {name,value}=e.target;
      setFormData((prev)=>{
          return {...prev,[name]:value}
      })
    }
    return loading ? <Loader message='verifying..'/>:(
        <> 
           
                    <form onSubmit={submit} className='box-shadow'>
                      <p className='invalid'>{message}</p>
                       <div>
                          <label htmlFor='name'>Name</label>
                          <input 
                            type="text"
                            name='name'
                            placeholder='pratap sing lodha'
                            value={formData.name}
                            onChange={handleChange}
                            autoFocus
                            required />
                      </div>
                      <div>
                          <label htmlFor='email'> Email</label>
                          <input 
                            type="email"
                            name='email'
                            placeholder='example@gmail.com'
                            value={formData.email}
                            onChange={handleChange}
                            required />
                      </div>
                      <div>
                          <label htmlFor='adminCode'>Admin Code</label>
                          <input 
                            type="text"
                            name='adminCode'
                            placeholder='get code from your owner'
                            value={formData.adminCode}
                            onChange={handleChange}
                            required />
                      </div>
                      <div style={{textAlign:'center'}}>

                       <button type='submit' className={`btnStructure ${Styles.nextBtn}`}>
                       Next
                        <i className="fas fa-arrow-right"></i>
                    </button>
                      </div>
                    </form>
        </>
    )
}

export default EmailStep;
