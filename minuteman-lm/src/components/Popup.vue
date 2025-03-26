<!-- filepath: c:\Projekte\minutemen-lm\minutemen-lm\src\components\Popup.vue -->
<template>
  <div>
    <h1>Minutemen LM</h1>
    <p>Welcome to the Minutemen LM Chrome Extension!</p>
    <button @click="fetchBookmarks">Fetch Bookmarks</button>
    <ul>
      <li v-for="bookmark in bookmarks" :key="bookmark.id">
        {{ bookmark.title }} - {{ bookmark.url }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Popup",
  setup() {
    const bookmarks = ref<any[]>([]);

    const fetchBookmarks = () => {
      chrome.bookmarks.getTree((bookmarkTreeNodes) => {
        console.log("Bookmarks:", bookmarkTreeNodes);
        bookmarks.value = flattenBookmarks(bookmarkTreeNodes);
      });
    };

    const flattenBookmarks = (nodes: chrome.bookmarks.BookmarkTreeNode[]): any[] => {
      const result: any[] = [];
      const traverse = (node: chrome.bookmarks.BookmarkTreeNode) => {
        if (node.url) {
          result.push({ id: node.id, title: node.title, url: node.url });
        }
        if (node.children) {
          node.children.forEach(traverse);
        }
      };
      nodes.forEach(traverse);
      return result;
    };

    return {
      bookmarks,
      fetchBookmarks,
    };
  },
});
</script>

<style scoped>
h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
button {
  margin-bottom: 1rem;
}
</style>