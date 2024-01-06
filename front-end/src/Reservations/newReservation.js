import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { isValidReservation } from "./isValidReservation";
import DisplayErrors from "./displayErrors";
import ReservationForm from "./reservationForm";
function NewReservation() {

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
    const [reservation, setReservation] = useState({...initialState})

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

    const handleSubmit = async(event) =>{
        event.preventDefault();
        const abortController = new AbortController();
        try {

            
            setErrors(isValidReservation(reservation));
            if(errors.length > 0){
                return errors;
            }
            await createReservation(reservation, abortController.signal)
            history.push(`/reservations`);
        } catch (error) {
            setErrors([error])
        }

        return () => abortController.abort();
        
        

    }
    return (
        <div>
        
        <h1>Create Reservation</h1>
        <DisplayErrors errors={errors}/>
        <ReservationForm changeHandler={changeHandler} handleSubmit={handleSubmit} reservation={reservation}/>
        
        



    

    </div>
    );
  }
  
  export default NewReservation;