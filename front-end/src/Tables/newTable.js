import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import CancelButton from "../layout/CancelButton";
import { createTable } from "../utils/api";

import DisplayErrors from "../Reservations/displayErrors";

function NewTable() {

    const [tableName,setTableName] = useState("");
    const [people,setPeople] = useState(1);
    const history = useHistory();
    const [errors,setErrors] = useState(null);

    const handleTableNameChange = (event) => setTableName(event.target.value);

    const handlePeopleChange = (event) => setPeople(Number(event.target.value));

    const handleSubmit = async(event) =>{
        event.preventDefault();
        
       
      
        

    }
    return (
        <div>
        
        <h1>New Table</h1>
        
    <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label>
            Table Name:
            <input id="name" name="name" type="text" required={true} minLength={2} value={tableName} onChange={handleTableNameChange}/>
        </label>
        </div>
        <div className="form-group">
        <label>
            Capacity:
            <input id="people" name="people" type="number" min={1} required={true} value={people} onChange={handlePeopleChange}/>
        </label>
        </div>
        <CancelButton/>
        <button type="submit">Submit</button>
        
        



    </form>

    </div>
    );
  }
  
  export default NewTable;