import { React, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import CancelButton from "../layout/CancelButton";
import { isValidReservation } from "./isValidReservation";
import DisplayErrors from "./displayErrors";
import { fetchReservation, updateReservation } from "../utils/api";

function EditReservation() {

    const initialState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 1,
      };
    const history = useHistory();
    const [errors,setErrors] = useState([]);

    const {reservation_id} = useParams();
    const[reservation,setReservation] = useState({...initialState});

    const changeHandler = (event) => {
        if (event.target.name === "people") {
          setReservation({
            ...reservation,
            [event.target.name]: Number(event.target.value),
          });
        } else {
          setReservation({
            ...reservation,
            [event.target.name]: event.target.value,
          });
        }
      };
    


    useEffect(()=>{
        const abortController = new AbortController();
        setErrors([]);
        fetchReservation(reservation_id, abortController.signal)
        .then(setReservation)
        .catch(setErrors)
        

        
        return () => abortController.abort();
    }, [reservation_id])

    


    const handleSubmit = async(event) =>{
        event.preventDefault();
        const abortController = new AbortController();
        
        try {
            
            setErrors(isValidReservation(reservation));
            if(errors.length > 0){
                return errors;
            }
            
            await updateReservation(reservation.reservation_id, reservation, abortController.signal)
            history.push(`/reservations`);
        } catch (error) {
            setErrors([error])
            
        }

        


        return () => abortController.abort();
        
        

    }
    return (
        <div>
        <p>{reservation.reservation_time}</p>
        <h1>Edit Reservation</h1>
        <p></p>
        <DisplayErrors errors={errors}/>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label>
            First Name:
            <input id="name" name="name" type="text" required={true} value={reservation.first_name} onChange={changeHandler}/>
        </label>
        </div>
        <div className="form-group">
        <label>
            Last Name:
            <input id="lastname" name="lastname" type="text" required={true} value={reservation.last_name} onChange={changeHandler}/>
        </label>
        </div>
        <div className="form-group">
        <label>
            Mobile Number:
            <input id="number" name="number" type="text" required={true} value={reservation.mobile_number} onChange={changeHandler}/>
        </label>
        </div>
        <div className="form-group">
        <label>
            Date:
            <input id="reservation_date" name="reservation_date" type="date" required={true} value={reservation.reservation_date} onChange={changeHandler}/>
        </label>
        </div>
        <div className="form-group">
        <label>
            Reservation Time:
            <input id="reservation_time" name="reservation_time" type="time" required={true} value={reservation.reservation_time} onChange={changeHandler}/>
        </label>
        </div>
        <div className="form-group">
        <label>
            Guests:
            <input id="people" name="people" type="number" min={1} required={true} value={reservation.people} onChange={changeHandler}/>
        </label>
        </div>
        <CancelButton/>
        <button type="submit">Submit</button>
        
        



    </form>

    </div>
    );
  }
  
  export default EditReservation;