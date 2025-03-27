<!-- filepath: c:\Projekte\minutemen-lm\minutemen-lm\src\components\BookmarkTable.vue -->
<template>
  <div class="ag-theme-material" style="height: 400px; width: 100%;">
    <ag-grid-vue :rowData="rowData" :columnDefs="columnDefs" :defaultColDef="defaultColDef"
      :animateRows="true" @grid-ready="onGridReady"
      ></ag-grid-vue>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import { ModuleRegistry, themeMaterial } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([
  AllCommunityModule]);

export default defineComponent({
  name: "BookmarkTable",
  components: {
    AgGridVue,
  },
  setup() {
    const rowData = ref<any[]>([]); // Data for the grid
    const columnDefs = ref([
      { field: "title", headerName: "Title", sortable: true, filter: true, rowDrag: true },
      { field: "url", headerName: "URL", sortable: true, filter: true },
      { field: "dateAdded", headerName: "Date Added", sortable: true, filter: "agDateColumnFilter" },
      {
        headerName: "Actions",
        cellRenderer: (params: any) => {
          return `
            <button onclick="editBookmark('${params.data.id}')">Edit</button>
            <button onclick="deleteBookmark('${params.data.id}')">Delete</button>
          `;
        },
      },
    ]);
    const defaultColDef = ref({
      resizable: true,
      sortable: true,
      filter: true,
    });
    const gridOptions = {
      rowSelection: 'multiple', // Enable multiple row selection
      rowSelectionMode: 'checkbox', // Use checkboxes for row selection
      rowDragManaged: true, // Enable drag-and-drop
      theme: themeMaterial, // Use the Material theme
    };
    const onGridReady = () => {
      // Fetch bookmarks when the grid is ready
      chrome.bookmarks.getTree((bookmarkTreeNodes) => {
        rowData.value = flattenBookmarks(bookmarkTreeNodes);
        console.log("Row Data:", rowData.value); // Debugging output
      });
    };

    const flattenBookmarks = (nodes: chrome.bookmarks.BookmarkTreeNode[]): any[] => {
      const result: any[] = [];
      const traverse = (node: chrome.bookmarks.BookmarkTreeNode) => {
        if (node.url) {
          result.push({ title: node.title, url: node.url, dateAdded: node.dateAdded });
        }
        if (node.children) {
          node.children.forEach(traverse);
        }
      };
      nodes.forEach(traverse);
      return result;
    };

    return {
      rowData,
      columnDefs,
      defaultColDef,
      gridOptions,
      onGridReady,
    };
  },
});

console.log("Hello from BookmarkTable.vue");
</script>

<style scoped>
/* Add any custom styles for the grid here */
</style>