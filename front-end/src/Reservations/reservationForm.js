import CancelButton from "../layout/CancelButton"
import React from "react"



function ReservationForm({changeHandler, reservation, handleSubmit}){


return(
<form onSubmit={handleSubmit}>
<div className="form-group">
<label>
    First Name:
    <input id="name" name="first_name" type="text" required={true} value={reservation.first_name} onChange={changeHandler}/>
</label>
</div>
<div className="form-group">
<label>
    Last Name:
    <input id="lastname" name="last_name" type="text" required={true} value={reservation.last_name} onChange={changeHandler}/>
</label>
</div>
<div className="form-group">
<label>
    Mobile Number:
    <input id="number" name="mobile_number" type="text" required={true} value={reservation.mobile_number} onChange={changeHandler}/>
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
)
}


export default ReservationForm;