import React, { useEffect, useState } from "react";

export interface BookmarkNode {
  id: string;
  title: string;
  url?: string;
  dateAdded?: number;
  children?: BookmarkNode[];
}

interface BookmarkTreeProps {
  onSelect: (bookmarks: BookmarkNode[]) => void;
}

const BookmarkTree: React.FC<BookmarkTreeProps> = ({ onSelect }) => {
  const [bookmarkTree, setBookmarkTree] = useState<BookmarkNode[]>([]);

  useEffect(() => {
    // Fetch the bookmark tree from the Chrome API
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      setBookmarkTree(bookmarkTreeNodes as BookmarkNode[]);
    });
  }, []);

  // Recursive function to render the tree structure
  const renderTree = (nodes: BookmarkNode[]) => {
    return nodes
      .filter((node) => !node.url) // Only include folders (nodes without a URL)
      .map((node) => (
        <li key={node.id} onClick={() => handleNodeClick(node)}>
          <span style={{ cursor: "pointer", fontWeight: "bold" }}>
            {node.title || "Untitled"}
          </span>
          {node.children && <ul>{renderTree(node.children)}</ul>}
        </li>
      ));
  };

  const handleNodeClick = (node: BookmarkNode) => {
    if (node.children) {
      // Pass the folder's children (bookmarks and subfolders) to the grid
      onSelect(node.children);
    }
  };

  return (
    <div>
      <h2>Bookmark Folders</h2>
      <ul>{renderTree(bookmarkTree)}</ul>
    </div>
  );
};

export default BookmarkTree;