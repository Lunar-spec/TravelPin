import './login.css';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import ClearIcon from '@mui/icons-material/Clear';
import { useRef, useState } from 'react';
import axios from 'axios';

export default function Login({setShowLogin, myStorage, setCurrentUser}) {
    
    const [error, setError] = useState(false);
    
    const nameRef = useRef();
    const passRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: nameRef.current.value,
            password: passRef.current.value,
        };

        try {
            const res = await axios.post('http://localhost:5000/api/users/login',user)
            myStorage.setItem("user",res.data.username)
            setCurrentUser(res.data.username)
            setShowLogin(false)
            setError(false)
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className='loginContainer'>
            <div className='loglogo'>
                <EditLocationAltIcon sx={{ fontSize: 40 }}/>
                Log In
            </div>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Username' ref={nameRef}/>
                <input type="password" placeholder='Password' ref={passRef}/>
                <button className='loginButton'>Login</button>
                {error && 
                <span className='failure'>Something went wrong!</span>
                }
            </form>
            <ClearIcon className='loginCancel' onClick={() => setShowLogin(false)}/>
        </div>
    )
}