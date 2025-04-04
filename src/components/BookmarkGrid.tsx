import React from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule, ColDef, themeMaterial } from "ag-grid-community";
import { BookmarkNode } from "./BookmarkTree";

interface BookmarkGridProps {
  rowData: BookmarkNode[];
}

ModuleRegistry.registerModules([AllCommunityModule]);

const BookmarkGrid: React.FC<BookmarkGridProps> = ({ rowData }) => {
  const columnDefs: ColDef<BookmarkNode>[] = [
    { field: "title", headerName: "Title", sortable: true, filter: true },
    { field: "url", headerName: "URL", sortable: true, filter: true },
    { field: "dateAdded", headerName: "Date Added", sortable: true, filter: "agDateColumnFilter" },
  ];

  const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
  };

  const theme = themeMaterial;
  
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} theme={theme} />
    </div>
  );
};

export default BookmarkGrid;