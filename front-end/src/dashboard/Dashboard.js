import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next, today } from "../utils/date-time";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TableList from "../Tables/tableList";
import ListReservations from "../Reservations/listReservations";
import { updateStatus } from "../utils/api";

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

  const cancelHandler = async (event)=>{
    const confirm = window.confirm("Do you want to cancel this reservation? This cannot be undone.");
    if(confirm){
      await updateStatus(event.target.value, "cancelled");
      console.log("status updated");
      loadDashboard();
    }
  }
  

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}: </h4>
      </div>
      <ErrorAlert error={reservationsError} />
     
      <ListReservations reservations={reservations} filter={true} cancelHandler={cancelHandler}/>
      <TableList tables = {tables}/>
      <button type="button" onClick ={()=>history.push(`/dashboard?date=${previous(date)}`)}>Previous</button>
      <button type="button" onClick ={()=>history.push(`/dashboard?date=${today()}`)}>Today</button>
      <button type="button" onClick ={()=>history.push(`/dashboard?date=${next(date)}`)}>Next</button>
    </main>
  );
}

export default Dashboard;
