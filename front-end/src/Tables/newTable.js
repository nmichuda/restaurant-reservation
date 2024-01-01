import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import DisplayErrors from "../Reservations/displayErrors";
import CancelButton from "../layout/CancelButton";
import { createTable } from "../utils/api";

//import DisplayErrors from "../Reservations/displayErrors";

function NewTable() {

    const [tableName,setTableName] = useState("");
    const [capacity,setCapacity] = useState(1);
    const history = useHistory();
    const [errors,setErrors] = useState(null);

    const handleTableNameChange = (event) => setTableName(event.target.value);

    const handleCapacityChange = (event) => setCapacity(Number(event.target.value));

    const handleSubmit = async(event) =>{
        event.preventDefault();
        //console.log(tableName, people);
        const abortController = new AbortController();
        try {
            let newTable = {
                table_name: tableName,
                capacity: capacity,
            }
           // console.log(newTable);
            await createTable(newTable, abortController.signal)
            console.log("table created")
            history.push(`/dashboard`);
        } catch (error) {
            setErrors([error])
        }

        return () => abortController.abort();
         
       
      
        

    }
    return (
        <div>
        
        <h1>New Table</h1>
        <DisplayErrors errors={errors}/>
        
    <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label>
            Table Name:
            <input id="name" name="table_name" type="text" required={true} minLength={2} value={tableName} onChange={handleTableNameChange}/>
        </label>
        </div>
        <div className="form-group">
        <label>
            Capacity:
            <input id="capacity" name="capacity" type="number" min={1} required={true} value={capacity} onChange={handleCapacityChange}/>
        </label>
        </div>
        <CancelButton/>
        <button type="submit">Submit</button>
        
        



    </form>

    </div>
    );
  }
  
  export default NewTable;