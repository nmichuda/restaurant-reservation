import React from "react";
import { finishTable } from "../utils/api";
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
            <h2 className="item">Table {table.table_name}</h2>
            <h4 className="item">Capacity: {table.capacity} seats</h4>
            <h5 data-table-id-status={table.table_id}>
              {" "}
              <b>{table.occupied ? "occupied" : "free"}</b>
            </h5>
            <div>{table.occupied ? <button className="finish" data-table-id-finish={table.table_id} onClick={()=>{
              finishTable(table.table_id);

              setTimeout(history.go("/dashboard"), 100)}
            
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
