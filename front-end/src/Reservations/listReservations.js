import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function formatTime(time) {
  let hours = time.substring(0, 2);
  const minutes = time.substring(3, 5);
  let post = "AM";
  if (hours > 12) {
    hours = 24 - hours;
    post = "PM";
  }

  return hours + ":" + minutes + post;
}

export const ListReservations = ({ reservations }) => {
  let resMap = "";
  if (reservations.length) {

    resMap = reservations.map((reservation, index) => {
      
      return (
        <div>
          {reservation.status === "booked" || reservation.status === "seated" ? (
            <div className="reservations" key={index}>
              <div>
                <h5>
                  {reservation.first_name} {reservation.last_name}
                </h5>
              </div>
              <p>{reservation.people} Guests</p>
              <p>{formatTime(reservation.reservation_time)}</p>
              <p data-reservation-id-status={reservation.reservation_id}>{reservation.status}</p>

              <div>
                <Link
                  className="item"
                  to={`/reservations/${reservation.reservation_id}/seat`}
                >
                  Seat
                </Link>
              </div>
            </div>
          ) : (
            <div className="reservations" key={index}></div>
          )}
        </div>
      );
    });
    
  }
  return <div>{resMap}</div>
};

export default ListReservations;
