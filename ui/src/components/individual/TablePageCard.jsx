import React from "react";
import PageCard from "./PageCard";
import MUIDataTable from "mui-datatables";

const TablePageCard = ({ title = "", table: { columns, data, options } }) => {
  return (
    <PageCard
      title={title}
      render={
        <>
          <div className={"row pt-3"}>
            <div className={"col"}>
              <MUIDataTable data={data} columns={columns} options={options} />
            </div>
          </div>
        </>
      }
    />
  );
};

export default TablePageCard;
