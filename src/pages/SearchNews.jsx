import { useEffect, useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSearchNews } from "../fetch/newsSlice";
import FetchedNews from "../components/FetchedNews";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar"; 
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function SearchNews() {
  const navigate = useNavigate();
  const { currentPage, totalPages } = useSelector((state) => state.news);

  const handleSearch = (keyword) => {
    navigate(`/search/${keyword}`); 
  };

  
  const { keyword } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (keyword) {
      dispatch(fetchSearchNews({ keyword, page: currentPage })); // Dispatch with keyword and page
    }
  }, [dispatch, keyword, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(fetchSearchNews({ page: currentPage + 1 }));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(fetchSearchNews({ page: currentPage - 1 }));
    }
  };

  return (
    <section>
      <div className="bg-light">
        <div className="container py-4">
          <div className="mb-4 d-sm-none">
            <SearchBar onSearch={handleSearch} /> 
          </div>
          
          <h1 className="h2 text-center mb-3">
            Result for : <span className="text-center mb-4 display-5">{keyword} News</span>
          </h1>
          <FetchedNews type="searchnews" />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onNext={handleNextPage} 
            onPrevious={handlePreviousPage} 
          />
        </div>
      </div>
    </section>
  );
}

export default SearchNews;
