import { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import "./App.css";
import {format} from "timeago.js";

function App() {
  const currentUser ="john"
  const [pins , setPins ] = useState([])
  const [ currentPlaceId , setCurrentPlaceId] = useState(null);
  const [ newPlace , setNewPlace] = useState(null);
  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)
  const [rating, setRating] = useState(0)
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 35.6892,
    longitude: 51.389,
    zoom: 4,
  });

  useEffect(() => {
    const getPins = async ()=>{
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (error) {
        console.log(error)
      }
    };
    getPins();
  }, [])
const handelmarkerClick=(id , lat , long)=>{
  setCurrentPlaceId(id)
  setViewport({
    ...viewport ,
    latitude: lat,
    longitude: long,

  })
}

const handleAddClick=(e)=>{
  const [long , lat ] = e.lngLat

  setNewPlace({
    lat,long
  })
}
const handlSubmit = async (e)=>{
e.preventDefault();
const newPin={
  username:currentUser,
  title,
  desc,
  rating,
  lat:newPlace.lat,
  long:newPlace.long,
}
try {
  const res =await axios.post("/pins" , newPin)
  setPins([...pins , res.data])
  setNewPlace(null)
} catch (err) {
  console.log(err)
}
}
  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/eska99/ckwtjb71mcz3g15p2t998dlg5"
        onDblClick={handleAddClick}
        transitionDuration="200"
      >

      {pins.map((pin)=>{
        return (<> <Marker
          latitude={pin.lat}
          longitude={pin.long}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <div>
            <MyLocationIcon 
            onClick={()=>handelmarkerClick(pin._id ,pin.lat , pin.long)}
            style={{color :pin.username === currentUser ? "green" :" "}}
            />
          </div>
        </Marker>
     
       
{ pin._id === currentPlaceId &&
        <Popup
          latitude={pin.lat}
          longitude={pin.long}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setCurrentPlaceId(null)}
          anchor="left"
        >
          <div className="card">
            <label>Place</label>
            <h4 className="place">{pin.title}</h4>
            <label>Review</label>
            <p className="desc">{pin.desc}</p>
            <label>Rating</label>
        
            <div>
              {" "}
              <StarIcon className="star" />
              <StarIcon className="star" />
              <StarIcon className="star" />
              <StarIcon className="star" />
              <StarIcon className="star" />
              <StarIcon className="star" />
            </div>
            <label>information</label>
            <span className="username"> created by <b>{pin.username}</b></span>
            <span className="date"> {format(pin.createdAt)} </span>
          </div>
        </Popup> }
        </>)})}

    { newPlace &&   <Popup
          latitude={newPlace.lat}
          longitude={newPlace.long}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setNewPlace(null)}
          anchor="left"
        ><div>
          <form onSubmit={handlSubmit}>
            <label>Title</label>
            <input onChange={(e)=> setTitle(e.target.value)} placeholder="enter a title" />
            <label>Review</label>
            <textarea
             onChange={(e)=> setDesc(e.target.value)}
             placeholder="say something about this place"/>
            <label>3ating</label>
            <select  onChange={(e)=> setRating(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button className="submitButton" type="submit">Add pin </button>
          </form>
        </div></Popup>}
      </ReactMapGL>
    </div>
  );
}

export default App;
