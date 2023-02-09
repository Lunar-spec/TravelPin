import './showErr.css'
import ErrorIcon from '@mui/icons-material/Error';
export default function showError({ setShowError }) {
    
    return (<div className='errorCom'>
                <div className='errlogo' >
                    <ErrorIcon sx={{ fontSize: 40 }}/>Travel Pin
                </div>
                <span className='errMessage'>
                Please enter the details then submit the form, empty pins aren't allowed.
                </span>
                <button className='errButton' onClick={() => setShowError(false)}>OK</button>
            </div>
        
    )
}