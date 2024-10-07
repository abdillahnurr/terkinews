import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchNewYorkTimes } from "../fetch/newsSlice";
import FetchedNews from "../components/FetchedNews";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function HomeNews() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewYorkTimes());
  }, [dispatch]);

  const [keywordSearch, setKeywordSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchNews = (e) => {
    e.preventDefault();
    if (keywordSearch.trim()) {
      navigate(`/search/${keywordSearch}`);
      setKeywordSearch("");
    }
  };

  return (
    <section>
      <div className="bg-light">
        <div className="container py-4">
          {/* Search form for mobile */}
          <div className="mb-4 d-sm-none">
            <form onSubmit={handleSearchNews} className="d-flex flex-column gap-2">
              <input
                type="text"
                value={keywordSearch}
                onChange={(e) => setKeywordSearch(e.target.value)}
                placeholder="Type here..."
                className="form-control"
              />
              <button className="btn btn-warning text-white w-100">
                Search
              </button>
            </form>
          </div>
          
          {/* Page Heading */}
          <h1 className="text-center mb-4 display-5">
            New York Times
          </h1>

          {/* News List */}
          <FetchedNews type="home" />
        </div>
      </div>
    </section>
  );
}

export default HomeNews;
