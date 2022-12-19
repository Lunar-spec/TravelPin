/* eslint-disable */
/* eslint-disable no-console */
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
import StarIcon from '@mui/icons-material/Star';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import NearMeIcon from '@mui/icons-material/NearMe';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import axios from 'axios';
import Register from './components/Register';
import Login from './components/Login';
import Error from './components/showError';
import ErrorLog from './components/showErrLog';
import Footer from './components/footer';
import { format } from 'timeago.js';
import AnchorIcon from '@mui/icons-material/Anchor';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';

const App= () => {
const myStorage = window.localStorage;

  const [currentUser, setCurrentUser] = React.useState(myStorage.getItem('user'));
  
  const [showRegister, setShowRegister] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);

  const [showError, setShowError] = React.useState(false);

  const [showErrorLogin,setShowErrorLogin] = React.useState(false);

  const [pins, setPins] = React.useState([]);

  const [currentPlaceId, setCurrentPlaceId] = React.useState(null);

  const [newPlace, setNewPlace] = React.useState(null);

  const [title, setTitle] = React.useState(null);
  const [desc, setDesc] = React.useState(null);
  const [rating, setRating] = React.useState(0);

  React.useEffect(() => {
    axios.get("http://localhost:5000/api/pin").then((response) => {
      setPins(response.data);
    });
  }, []);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

  const delPin = (id) => {
    axios.delete(`http://localhost:5000/api/pin/${id}`);
    window.location.reload(false);
  }


  const handleAddClick = (e) => {

    if (currentUser != null)
    {
      const [long, lat] = e.lngLat.toArray();
      setNewPlace({
      long,
      lat,
    })
    }
    else {setShowErrorLogin(true)}
    //console.log(long,lat)

  }; 
  //console.log(newPlace);

  const handleSubmit = async (e) => {
      e.preventDefault()
      const newPin = {
      username: currentUser,
      title: title,
      desc: desc,
      rating: rating,
      lat: newPlace.lat,
      long: newPlace.long,
    }
    //console.log(newPin)
    if (newPin.username == null || title == null || desc== null || rating == null)
      {
        setShowError(true)
      }
    
    else {
      try {
      const res = await axios.post("http://localhost:5000/api/pin", newPin)
      setPins([...pins,res.data])
      setNewPlace(null);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  }
  };

  const delPinStyle  = {
    color:currentUser ? 'rgb(255, 146, 123)' : 'rgb(229, 228, 226)',
    top: 10,
    right:30,
    position: 'absolute',
    cursor: 'pointer',
  }

  const handleLogout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  }

  return <div>
    
    <div className='navbar'>
    <span className='title'>
    <button className='buttonTitle'>Travel Pin<NearMeIcon color='secondary' className='fly' sx={{ fontSize: 30 }}/></button>
    </span>
    <span>
    <button className='button reloadbtn' onClick={() => window.location.reload(false)}>Reload <ModeOfTravelIcon className='reloadIcon'/></button>
    </span>
    {currentUser ? 
    (<>
    <span>
    <button className='button logoutbtn' onClick={handleLogout}>Log Out</button>
    <LogoutIcon color={'warning'} className='logoutIcon'/>
    
    </span>
    <span>
    <button className='button name'>Hello, {myStorage.getItem('user')}<AnchorIcon className='nameIcon'/></button>
    </span>
    </>
    ) : (
      <>
      <span>
        <button className='button loginbtn' onClick={() => setShowLogin(true)}>Login</button><LockOpenIcon color='success' className='loginIcon'/>
        
      </span>
      <span>
        <button className='button regbtn' onClick={() => setShowRegister(true)}>Register<HowToRegIcon color='info' className='regIcon'/></button>
    </span>
      </>
    )}
    
    
    </div>
    <Map
    initialViewState={{
      longitude: 0,
      latitude: 0,
      zoom: 1,
      doubleClickZoom: false
    }}
    style={{width: '100vw', height: '100vh'}}
    mapStyle="mapbox://styles/mapbox/dark-v10"
    mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    onDblClick={handleAddClick}
  >
    {pins.map((mark) => {
      return <div>
        <Marker longitude={mark.long} latitude={mark.lat} anchor="bottom" 
        style={{cursor:'pointer'}}
        onClick={() => handleMarkerClick(mark._id)}
        >
      <svg 
        width="25" height="25" 
        stroke={mark.username === currentUser ? "rgb(255, 66, 0)" : "cyan"} strokeWidth={"2"} 
        fill="none" strokeLinecap={"round"} 
        strokeLinejoin={"round"}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
      </Marker>
      {
        mark._id === currentPlaceId && (
          <Popup longitude={mark.long} latitude={mark.lat}
        anchor="top"
        closeButton={true}
        closeOnClick={false}
        closeOnMove={true}
        onClose={() => setCurrentPlaceId(null)}>
          <div className='card'>
            <label className='di'>Place:</label>
            <h4 className='place'>{mark.title}</h4>
            <label className='di'>Review</label>
            <p className='desc'>{mark.desc}</p>
            <label className='di'>Rating</label>
            <div className='stars'>
              {Array(mark.rating).fill(<StarIcon className='star'/>)}
            </div>
            <label className='di'>Information</label>
            <span className='username'>Created by: <b>{mark.username}</b></span>
            <span className='date'>Created {format(mark.createdAt)}</span>
            <DeleteIcon style={delPinStyle} sx={{ fontSize: 25 }} onClick={mark.username === currentUser ? () => delPin(mark._id) : null}/>
          </div>
        </Popup>
      )   
      
    } 
    </div>
  })
    }
    
    { newPlace &&
       (<Popup longitude={newPlace.long} latitude={newPlace.lat}
          anchor="top"
          closeButton={true}
          closeOnClick={false}
          maxWidth= 'none'
          closeOnMove={false}
          onClose={() => setNewPlace(null)}>
            <div>
              <>
                <form onSubmit={handleSubmit}>
                  <label className='pform'>Title</label>
                  <input 
                  placeholder='Enter a title' 
                  onChange={(pformf) => setTitle(pformf.target.value)} />
                  <label className='pform'>Review</label>
                  <textarea 
                  placeholder='Say something about this place' 
                  onChange={(pformf) => setDesc(pformf.target.value)}/>
                  <label className='pform'>Rating</label>
                  <select onChange={(pformf) => setRating(pformf.target.value)}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                  <button className='submitButton' type="submit">Add Pin</button>
                </form>
              </>
            </div>
          </Popup> 
      )
    }
    {showRegister && 
      <Register setShowRegister = {setShowRegister} />
    }
    {showLogin && 
      <Login setShowLogin = {setShowLogin} myStorage = {myStorage} setCurrentUser = {setCurrentUser}/>
    }
    { showError &&
      <Error setShowError={setShowError}/>
    }
    { showErrorLogin &&
      <ErrorLog setShowErrorLogin={setShowErrorLogin}/>
    }
  <Footer />
  </Map>;
  </div>
}

export default App;