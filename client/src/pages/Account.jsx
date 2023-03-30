import { useContext, useState } from "react"
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function AccountPage(){
    const [redicect, setRedirect] = useState(null);
    const {ready, user, setUser} = useContext(UserContext);

    let {subpage} = useParams();
    if(subpage === undefined){
        subpage = 'profile';
    }


   async function logout(){
       await axios.post('/logout');
       setUser(null);
       setRedirect('/');
    }
    if(!ready){
        return 'Loading...';
    }

    if(ready && !user && !redicect){
        return <Navigate to={'/login'}/>
    }

    
    
   


    if(redicect){
        return <Navigate to={redicect}/>
    }
    return (
        <div className="">
            <AccountNav/>
           {subpage === 'profile' && (
            <div className="text-center max-w-lg mx-auto">
                Logged in as {user.name} ({user.email}) <br/>
                <button onClick={logout} className="primary mt-2 max-w-sm">Logout</button>
            </div>
           )}
           {subpage === 'places' && (
            <div>
                <PlacesPage/>
            </div>
           )}
        </div>
    )
}