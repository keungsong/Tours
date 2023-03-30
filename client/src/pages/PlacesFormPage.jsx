import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import Perks from "../Perks";
import axios from "axios";
import PhotosUploader from "../PhotoUpload";
export default function PlacesFormPage(){

    const {id} = useParams();
    console.log({id});
    const [title, setTitle] = useState('');
    const [address, setAddress] =useState('');
    const [addedPhoto, setAddedPhoto] = useState([]);
   
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redicect, setRedirect] = useState(false);

    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response => {
          const {data} = response;
          setTitle(data.title);
          setAddress(data.address);
          setAddedPhoto(data.photos);
          setDescription(data.description);
          setPerks(data.perks);
          setExtraInfo(data.extraInfo);
          setCheckIn(data.checkIn);
          setCheckOut(data.checkOut);
          setMaxGuests(data.maxGuests);
          setPrice(data.price);
        });
    }, [id])
    function inputHeader(text){
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }

    function inputDescription(text){
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }

    function preInput(header, description){
        return (
            <>
              {inputHeader(header)}
              {inputDescription(description)}
            </>
        )
    }
  
   async function savePlace(ev){

        ev.preventDefault();
        const placeData = {
            title, address, addedPhoto, description, perks, extraInfo,
             checkIn, checkOut, maxGuests, price,
        };
        if(id){
          // update
          await axios.put('/places', {
            id,
            ...placeData
            });
           setRedirect(true);
        }else{

            // new 
            await axios.post('/places', placeData);
               setRedirect(true);
        }
      
        
    }

    if(redicect){
        return <Navigate to={'/account/places'}/>
    }

    return (
       
       <div>
            <AccountNav/>
            <form action="" onSubmit={savePlace}>
               
             {preInput('Title', 'Title for your place')}
               <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title"/>
               {preInput('Address','Address for this place')}
               
               <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="addresse"/>
               {preInput('Image','more better')}
               <PhotosUploader addedPhoto = {addedPhoto} onChange={setAddedPhoto}/>
                
               {preInput('Description','description of the place')}
              
               <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>
               {preInput('Perks','select all the perks')}
               
               <div className="grid  gap-2 mt-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                   <Perks selected={perks} onChange={setPerks}/>
               </div>
               {preInput('Extra info','house rules, etc')}
               
               <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
               {preInput('Check in&out times','add check in and out times, remember to have some time window for cleaning the room between guests')}
               
               <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                   <div>
                         <h3 className="mt-2 -mb-1">CheckIn</h3>
                          <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                   </div>
                   <div>
                         <h3 className="mt-2 -mb-1">CheckOut</h3>
                          <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}/>
                   </div>
                   <div>
                         <h3 className="mt-2 -mb-1">Max number of guests</h3>
                          <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)}/>
                   </div>
                   <div>
                         <h3 className="mt-2 -mb-1">Price per night</h3>
                          <input type="number" value={price} onChange={ev => setPrice(ev.target.value)}/>
                   </div>
               </div>
               
                   <button className="primary mt-4">Save</button>
             
            </form>
       </div>
    );
}