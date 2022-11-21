import './register.css';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import ClearIcon from '@mui/icons-material/Clear';
import { useRef, useState } from 'react';
import axios from 'axios';

export default function Register({setShowRegister}) {
    const [success, setSuccess ] = useState(false);
    const [error, setError] = useState(false);
    
    const nameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passRef.current.value,
        };

        try {
            await axios.post('http://localhost:5000/api/users/reg',newUser)
            setError(false)
            setSuccess(true)
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className='registerContainer'>
            <div className='reglogo'>
                <AddLocationAltIcon sx={{ fontSize: 40 }}/>
                Register
            </div>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Username' ref={nameRef}/>
                <input type="text" placeholder='Email' ref={emailRef}/>
                <input type="password" placeholder='Password' ref={passRef}/>
                <button className='registerButton'>Register</button>
                {success && 
                <span className='success'>You can login now!</span>
                } {error && 
                <span className='failure'>Something went wrong!</span>
                }
            </form>
            <ClearIcon className='regCancel' onClick={() => setShowRegister(false)}/>
        </div>
    )
}