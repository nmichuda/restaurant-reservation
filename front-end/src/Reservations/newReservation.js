import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import CancelButton from "../layout/CancelButton";
import { isValidReservation } from "./isValidReservation";
import DisplayErrors from "./displayErrors";

function NewReservation() {

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [number,setNumber] = useState("");
    const [date,setDate] = useState("");
    const [time,setTime] = useState("");
    const [people,setPeople] = useState(1);
    const history = useHistory();
    const [errors,setErrors] = useState(null);

    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);
    const handleNumberChange = (event) => setNumber(event.target.value);
    const handleTimeChange = (event) => setTime(event.target.value);
    const handleDateChange = (event) => setDate(event.target.value);
    const handlePeopleChange = (event) => setPeople(Number(event.target.value));

    const handleSubmit = async(event) =>{
        event.preventDefault();
        const abortController = new AbortController();
        try {
            let newRes = {
                first_name: firstName,
                last_name: lastName,
                mobile_number: number,
                reservation_date: date,
                reservation_time: time,
                people: people,
            }
            setErrors(isValidReservation(newRes));
            if(errors.length > 0){
                return errors;
            }
            await createReservation(newRes, abortController.signal)
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
    <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label>
            First Name:
            <input id="name" name="name" type="text" required={true} value={firstName} onChange={handleFirstNameChange}/>
        </label>
        </div>
        <div className="form-group">
        <label>
            Last Name:
            <input id="lastname" name="lastname" type="text" required={true} value={lastName} onChange={handleLastNameChange}/>
        </label>
        </div>
        <div className="form-group">
        <label>
            Mobile Number:
            <input id="number" name="number" type="text" required={true} value={number} onChange={handleNumberChange}/>
        </label>
        </div>
        <div className="form-group">
        <label>
            Date:
            <input id="reservation_date" name="reservation_date" type="date" required={true} value={date} onChange={handleDateChange}/>
        </label>
        </div>
        <div className="form-group">
        <label>
            Reservation Time:
            <input id="reservation_time" name="reservation_time" type="time" required={true} value={time} onChange={handleTimeChange}/>
        </label>
        </div>
        <div className="form-group">
        <label>
            Guests:
            <input id="people" name="people" type="number" min={1} required={true} value={people} onChange={handlePeopleChange}/>
        </label>
        </div>
        <CancelButton/>
        <button type="submit">Submit</button>
        
        



    </form>

    </div>
    );
  }
  
  export default NewReservation;