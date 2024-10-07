import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProgrammingNews } from "../fetch/newsSlice";
import FetchedNews from "../components/FetchedNews";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function ProgrammingNews() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProgrammingNews());
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
          {/* Search form, visible only on small screens (using d-sm-none for hiding on medium and above) */}
          <div className="mb-3 d-sm-none">
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
          <h1 className="text-center mb-4 display-5">
            Computer/Tech News
          </h1>
          <FetchedNews type="programming" />
        </div>
      </div>
    </section>
  );
}

export default ProgrammingNews;
