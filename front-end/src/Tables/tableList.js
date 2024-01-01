import React from "react";

export const TableList = ({ tables }) => {
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
          </div>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableList;
