import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, AllCommunityModule, ModuleRegistry, themeMaterial, colorSchemeDarkWarm, GridOptions } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule])
interface Bookmark {
  id: string;
  title: string;
  url?: string;
  dateAdded?: number;
}

const App: React.FC = () => {
  const [rowData, setRowData] = useState<Bookmark[]>([]);

  useEffect(() => {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      const flattenBookmarks = (nodes: chrome.bookmarks.BookmarkTreeNode[]): Bookmark[] => {
        return nodes.flatMap((node) => 
          node.url
            ? [{ id: node.id, title: node.title, url: node.url, dateAdded: node.dateAdded }]
            : flattenBookmarks(node.children || [])
        );
      };

      setRowData(flattenBookmarks(bookmarkTreeNodes));
    });
  }, []);

  const columnDefs: ColDef<Bookmark>[] = [
    { field: "title", headerName: "Titel", flex: 2 },
    { field: "url", headerName: "URL", flex: 3 },
    { field: "dateAdded", headerName: "Hinzugefügt", flex: 1, 
      valueFormatter: (params) => params.value ? new Date(params.value).toLocaleString() : "" 
    }
  ];

  const theme = themeMaterial
    .withPart(colorSchemeDarkWarm)
    .withParams({
      headerTextColor: 'rgb(255, 255, 255)'
    });

  const gridOptions: GridOptions<Bookmark> = {
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
    },
    animateRows: true,
    pagination: true,
    paginationPageSize: 20,
    domLayout: "autoHeight",
    rowDragMultiRow: true,
    rowSelection: "multiple",
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} theme={theme} gridOptions={gridOptions} />
    </div>
  );
};

export default App;
