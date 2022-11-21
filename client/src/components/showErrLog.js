import './showErrLog.css'
import NearbyErrorIcon from '@mui/icons-material/NearbyError';
export default function showErrorLogin({setShowErrorLogin}) {


    return (<div className='errorLog'>
                <div className='allogo' >
                    <NearbyErrorIcon sx={{ fontSize: 40 }}/>Travel Pin
                </div>
                <span className='errMes'>
                Please login to pin your travels.
                </span>
                <button className='errBtn' onClick={() => setShowErrorLogin(false)}>OK</button>
            </div>
        
    )
}