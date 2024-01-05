import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next, today } from "../utils/date-time";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TableList from "../Tables/tableList";
import ListReservations from "../Reservations/listReservations";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables()
      .then(setTables)
      
    return () => abortController.abort();
  }
  

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}: </h4>
      </div>
      <ErrorAlert error={reservationsError} />
     
      <ListReservations reservations={reservations} filter={true}/>
      <TableList tables = {tables}/>
      <button type="button" onClick ={()=>history.push(`/dashboard?date=${previous(date)}`)}>Previous</button>
      <button type="button" onClick ={()=>history.push(`/dashboard?date=${today()}`)}>Today</button>
      <button type="button" onClick ={()=>history.push(`/dashboard?date=${next(date)}`)}>Next</button>
    </main>
  );
}

export default Dashboard;
