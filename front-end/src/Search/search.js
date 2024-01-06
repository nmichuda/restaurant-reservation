import { React, useState } from "react";

import DisplayErrors from "../Reservations/displayErrors";
import CancelButton from "../layout/CancelButton";

import { listReservations } from "../utils/api";
import ListReservations from "../Reservations/listReservations";

//import DisplayErrors from "../Reservations/displayErrors";

function Search() {

    const [mobileNumber,setMobileNumber] = useState("");
    const [reservations,setReservations] = useState({})
    
    const [searched, setSearched] = useState(false);
    const errors = []

    const handleMobileNumberChange = (event) => setMobileNumber(event.target.value);

   

    const handleSubmit = async(event) =>{
        event.preventDefault();
        //console.log(tableName, people);
        setSearched(true);
        const abortController = new AbortController();
        let reserve = await listReservations({mobile_number: mobileNumber}, abortController.signal);
        setReservations(reserve);

        return () => abortController.abort();
         
       
      
        

    }
    return (
        <div>
        
        <h1>Search Reservations</h1>
        <DisplayErrors errors={errors}/>
        
    <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label>
            Search:
            <input id="mobile_number" name="mobile_number" type="text" placeholder="Enter a customer's phone number" required={true} minLength={2} maxLength={12} value={mobileNumber} onChange={handleMobileNumberChange}/>
        </label>
        </div>
        <CancelButton/>
        <button type="submit">Find</button>
        
        



    </form>
    {searched ? 
    <ListReservations reservations = {reservations} filter={false}/> : ""
    }
    
    </div>
    );
  }
  
  export default Search;