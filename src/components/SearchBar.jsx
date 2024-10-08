import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [keywordSearch, setKeywordSearch] = useState("");

  const handleSearchNews = (e) => {
    e.preventDefault();
    if (keywordSearch.trim()) {
      onSearch(keywordSearch);  
      setKeywordSearch("");  
    }
  };

  return (
    <form onSubmit={handleSearchNews} className="d-flex flex-column gap-2">
      <input
        type="text"
        value={keywordSearch}
        onChange={(e) => setKeywordSearch(e.target.value)}
        placeholder="Type here..."
        className="form-control"
      />
      <button type="submit" className="btn btn-warning text-white w-100">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
