<template>
  <ag-grid-vue style="width: 100%; height: 100%;" :columnDefs="columnDefs" :rowData="rowData" :theme="theme"></ag-grid-vue>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import { AllCommunityModule } from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import { themeMaterial, colorSchemeDark } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

export default defineComponent({
  name: 'BookmarkGrid',
  components: {
    AgGridVue
  },
  setup() {
    return {
      columnDefs: [
        { field: 'title', sortable: true, filter: true },
        { field: 'url', sortable: true, filter: true },
        { field: 'tags', sortable: true, filter: true },
        { field: 'notes', sortable: true, filter: true },
        { field: 'created', sortable: true, filter: true },
        { field: 'updated', sortable: true, filter: true }
      ],
      rowData: [
        { title: 'Google', url: 'https://www.google.com', tags: 'search', notes: 'search engine', created: '2021-01-01', updated: '2021-01-01' },
        { title: 'Vue.js', url: 'https://vuejs.org', tags: 'javascript', notes: 'frontend framework', created: '2021-01-01', updated: '2021-01-01' },
        { title: 'Bootstrap', url: 'https://getbootstrap.com', tags: 'css', notes: 'frontend framework', created: '2021-01-01', updated: '2021-01-01' },
        { title: 'GitHub', url: 'https://github.com', tags: 'git', notes: 'version control', created: '2021-01-01', updated: '2021-01-01' },
        { title: 'Stack Overflow', url: 'https://stackoverflow.com', tags: 'search', notes: 'programming community', created: '2021-01-01', updated: '2021-01-01' }
      ],
      theme: themeMaterial.withPart(colorSchemeDark),
    }
  }
});
</script>

<style scoped>
</style>
