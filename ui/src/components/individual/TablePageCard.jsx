import React from "react";
import PageCard from "./PageCard";
import MUIDataTable from "mui-datatables";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

const TablePageCard = ({
  title = "",
  table: { columns, data, options },
  button,
  button: { isRendered = false, label = "", handleClick, icon = <AddIcon /> },
}) => {
  return (
    <PageCard
      title={title}
      render={
        <>
          {isRendered && (
            <div className={"row"}>
              <div className={"col d-flex"}>
                {button instanceof Element ? (
                  <button />
                ) : (
                  <Button
                    variant={"outlined"}
                    color={"primary"}
                    size={"small"}
                    onClick={handleClick}
                    startIcon={icon}
                  >
                    {label}
                  </Button>
                )}
              </div>
            </div>
          )}
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
