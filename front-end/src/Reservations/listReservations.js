import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export const ListReservations = ({ reservations }) => {
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
  function listReservations(reservations) {
    if (reservations.length) {
      return reservations.map((reservation) => {
        return (
          <div className="reservations" key={reservation.reservation_id}>
            <div>
              <h5>
                {reservation.first_name} {reservation.last_name}
              </h5>
            </div>
            <p>{reservation.people} Guests</p>
            <p>{formatTime(reservation.reservation_time)}</p>

            <div>
              <Link className="item" to={`/reservations/${reservation.reservation_id}/seat`}>Seat</Link>
            </div>
          </div>
        );
      });
    }
  }

  return <div>{listReservations(reservations)}</div>;
};

export default ListReservations;
