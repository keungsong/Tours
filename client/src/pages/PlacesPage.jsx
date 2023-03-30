
import { Link, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";

import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function PlacesPage(){

    const [places, setPlaces] = useState([]);

    useEffect(() => {
       axios.get('/user-places').then(({data})=>{
           setPlaces(data);
       })
    }, [])
   

   
   

    return (
        <div>
            <AccountNav/>
           
                 <div className="text-center">
        
                 <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6"
                  to={'/account/places/new'}>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                   </svg>
 
                     Add new place</Link>
             </div>
       
           <div className="mt-4">
               {places.length > 0 && places.map(place => (
                <Link to={'/account/places/'+place._id} className="flex cursor-pointer bg-gray-100 gap-4 p-2">
                    <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                       <PlaceImg place={place}/>
                    </div>
                   <div className="grow-0 shrink">
                   <h2 className="text-xl">{place.title}</h2>
                    <p className="mt-2 text-sm">{place.description}</p>
                   </div>
                </Link>
               ))}
           </div>
        </div>
    )
}