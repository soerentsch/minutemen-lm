<!-- filepath: c:\Projekte\minutemen-lm\minutemen-lm\src\components\Popup.vue -->
<template>
  <div>
    <h1>Minutemen LM</h1>
    <BookmarkTable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BookmarkTable from "./BookmarkTable.vue";
import { ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([
  AllCommunityModule]);

export default defineComponent({
  name: "Popup",
  components: {
    BookmarkTable,
  },
});
console.log("Hello from Popup.vue");
</script>