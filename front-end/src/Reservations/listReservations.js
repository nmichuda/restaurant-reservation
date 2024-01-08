import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


/**
 * 
 * @param {*} time formatted as string in 24hr time
 * @returns the hour and minute formatted as XX:XX AM/PM
 */
function formatTime(time) {
  let hours = time.substring(0, 2);
  const minutes = time.substring(3, 5);
  let post = "AM";
  if (hours > 12) {
    hours = hours - 12;
    post = "PM";
  }

  return hours + ":" + minutes + post;
}
/**
 * 
 * @param {*} param0 
 * @returns 
 */


export const ListReservations = ({ reservations, filter, cancelHandler }) => {
  let resMap = "";
  let filterReservations = reservations;
  if(filter){
    filterReservations = reservations.filter((res)=>(res.status === "booked" || res.status === "seated"));
  }
  
  if (filterReservations.length) {

    resMap = filterReservations.map((reservation, index) => {
      
      return (
        <div className="reservations" key={reservation.reservation_id}>
            <div>
              <div>
                <h5>
                  {reservation.first_name} {reservation.last_name}
                </h5>
              </div>
              <p>{reservation.people} Guests</p>
              <p>{formatTime(reservation.reservation_time)}</p>
              <p data-reservation-id-status={reservation.reservation_id}>{reservation.status}</p>
              {reservation.status === "booked" ? (
              <div>
                <Link
                  className="item"
                  to={`/reservations/${reservation.reservation_id}/seat`}
                >
                  Seat
                </Link>
              </div>
              ): ""}
              <Link className="item" to={`/reservations/${reservation.reservation_id}/edit`}>Edit</Link>
              <button type="button" data-reservation-id-cancel={reservation.reservation_id} value={reservation.reservation_id} onClick={cancelHandler}>Cancel</button>
            </div>
          
        </div>
      );
    });
    
  }
  else{
    return <p>No reservations found.</p>
  }
  return <div>{resMap}</div>
};

export default ListReservations;
