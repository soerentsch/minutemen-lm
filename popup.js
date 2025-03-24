function displayBookmarks(bookmarkItems) {
    const bookmarkList = document.getElementById('bookmark-list');
    bookmarkList.innerHTML = '';

    bookmarkItems.forEach(item => {
        const bookmarkItem = document.createElement('div');
        bookmarkItem.className = 'bookmark-item';

        const link = document.createElement('a');
        link.href = item.url;
        link.textContent = item.title || item.url;
        link.target = '_blank';

        bookmarkItem.appendChild(link);
        bookmarkList.appendChild(bookmarkItem);
    });
}

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
    displayBookmarks(allBookmarks);
});