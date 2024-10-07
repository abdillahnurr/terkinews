import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSearchNews } from "../fetch/newsSlice";
import FetchedNews from "../components/FetchedNews";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function SearchNews() {
  const [keywordSearch, setKeywordSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchNews = (e) => {
    e.preventDefault();
    if (keywordSearch.trim()) {
      navigate(`/search/${keywordSearch}`);
      setKeywordSearch("");
    }
  };

  const { keyword } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (keyword) {
      dispatch(fetchSearchNews(keyword));
    }
  }, [dispatch, keyword]);

  return (
    <section>
      <div className="bg-light">
        <div className="container py-4">
          <div className="mb-4 d-md-none"> {/* Visibility adjustment for small screens */}
            <form onSubmit={handleSearchNews} className="d-flex flex-column gap-2">
              <input
                type="text"
                value={keywordSearch}
                onChange={(e) => setKeywordSearch(e.target.value)}
                placeholder="Type here..."
                className="form-control"
              />
              <button
                type="submit"
                className="btn btn-warning text-white w-100" // Bootstrap button styles
              >
                Search
              </button>
            </form>
          </div>
          <h1 className="h2 text-center mb-3">
            Result for : <span className="text-center mb-4 display-5">{keyword} News</span>
          </h1>
          <FetchedNews type="searchnews" />
        </div>
      </div>
    </section>
  );
}

export default SearchNews;
