import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables } from "../utils/api";
import CancelButton from "../layout/CancelButton";
import { updateTable } from "../utils/api";


import { fetchReservation } from "../utils/api";
export const SeatReservation = () =>{


    const {reservation_id} = useParams();
    const [tables, setTables] = useState([]);
    const [tableId, setTableId] = useState("");
    const [reservation, setReservation] = useState({})
    const handleIdChange = (event) => setTableId(event.target.value);
    const history = useHistory();


    useEffect(()=>{
        listTables().then(setTables);
    }, []);
    useEffect(()=>{
        fetchReservation(reservation_id).then(setReservation);
    }, [reservation_id])

    const handleSubmit = async(event) =>{
        event.preventDefault();
        await updateTable(reservation.reservation_id, tableId);
        history.push("/dashboard");
        
    }
    return (
        <div>
        
        <h1>Choose Your Table</h1>
        
    <form onSubmit={handleSubmit}>
        <fieldset>
        <div>
            <p>{reservation.people}</p>
        <select
             id="table_id" name="table_id" required={true} value={tableId} onChange={handleIdChange}>
                <option value="">Select Table</option>
                {tables.map((table)=>(
                    <option disabled={table.capacity < reservation.people || table.occupied} key={table.table_id} value={table.table_id}>{table.table_name} - {table.capacity}</option>
                ))}
        </select>
        </div>
        <CancelButton/>
        <button type="submit">Submit</button>
        </fieldset>
        



    </form>

    </div>
    );








}






export default SeatReservation;