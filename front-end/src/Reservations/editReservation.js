import { React, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { isValidReservation } from "./isValidReservation";
import DisplayErrors from "./displayErrors";
import { fetchReservation, updateReservation } from "../utils/api";
import ReservationForm from "./reservationForm";

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
        <h1>Edit Reservation</h1>
        <p></p>
        <DisplayErrors errors={errors}/>
        <ReservationForm changeHandler={changeHandler} handleSubmit={handleSubmit} reservation={reservation}/>

         </div>
    );
  }
  
  export default EditReservation;