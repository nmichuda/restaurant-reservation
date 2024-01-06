import React from "react";
import { finishTable, updateStatus } from "../utils/api";
import { useHistory } from "react-router-dom";



export const TableList = ({ tables }) => {
  const history = useHistory();
  
  return (
    <div className="container-fluid d-flex">
      {tables.map((table) => (
        <div className="item" key={table.table_id}>
          <div className="">
            <div className="item">
                <div className="">
            <h2 className="item"> {table.table_name}</h2>
            <h4 className="item">Capacity: {table.capacity} seats</h4>
            <h5 data-table-id-status={table.table_id}>
              {" "}
              <b>{table.occupied ? "occupied" : "free"}</b>
            </h5>
            <div>{table.occupied ? <button className="finish" data-table-id-finish={table.table_id} onClick={()=>{

              updateStatus(table.reservation_id, "finished");
              finishTable(table.table_id);
              

              setTimeout(history.go("/dashboard"), 1000)} //set delay so that all the data is displaying correctly. I know this is a bad way to do it, will try and fix.
            
            }>Finish</button> : ""}
            
            </div>
          </div>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableList;
