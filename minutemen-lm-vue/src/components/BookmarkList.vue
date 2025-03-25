<template>
    <div>
      <h2>{{ i18n.popupTitle }}</h2>
      <ul>
        <li v-for="bookmark in bookmarks" :key="bookmark.id">
          <a :href="bookmark.url" target="_blank">{{ bookmark.title || bookmark.url }}</a>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        bookmarks: [],
        i18n: {},
      };
    },
    mounted() {
      this.fetchBookmarks();
      this.loadMessages();
    },
    methods: {
      fetchBookmarks() {
        chrome.bookmarks.getTree(bookmarkTreeNodes => {
          const allBookmarks = [];
  
          function traverseBookmarks(nodes) {
            nodes.forEach(node => {
              if (node.url) {
                allBookmarks.push(node);
              }
              if (node.children) {
                traverseBookmarks(node.children);
              }
            });
          }
  
          traverseBookmarks(bookmarkTreeNodes);
          this.bookmarks = allBookmarks;
        });
      },
      loadMessages() {
        this.i18n.popupTitle = chrome.i18n.getMessage('popupTitle')
      },
    },
  };
  </script>