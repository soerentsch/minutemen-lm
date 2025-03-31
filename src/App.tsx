import React, { useState } from "react";
import BookmarkTree, { BookmarkNode } from "./components/BookmarkTree";
import BookmarkGrid from "./components/BookmarkGrid";

const App: React.FC = () => {
  const [selectedBookmarks, setSelectedBookmarks] = useState<BookmarkNode[]>([]);

  // Callback to handle selection from the tree
  const handleSelection = (bookmarks: BookmarkNode[]) => {
    setSelectedBookmarks(bookmarks);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left: Tree */}
      <div style={{ flex: "1", borderRight: "1px solid #ccc", overflowY: "auto" }}>
        <BookmarkTree onSelect={handleSelection} />
      </div>

      {/* Right: Grid */}
      <div style={{ flex: "2", padding: "10px", overflowY: "auto" }}>
        <BookmarkGrid rowData={selectedBookmarks} />
      </div>
    </div>
  );
};

export default App;