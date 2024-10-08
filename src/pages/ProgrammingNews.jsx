import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProgrammingNews } from "../fetch/newsSlice";
import FetchedNews from "../components/FetchedNews";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar"; 
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function ProgrammingNews() {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector((state) => state.news);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProgrammingNews({ page: 1 }));
  }, [dispatch]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(fetchProgrammingNews({ page: currentPage + 1 }));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(fetchProgrammingNews({ page: currentPage - 1 }));
    }
  };

  const handleSearch = (keyword) => {
    navigate(`/search/${keyword}`); 
  };

  return (
    <section>
      <div className="bg-light">
        <div className="container py-4">
          <div className="mb-4 d-sm-none">
            <SearchBar onSearch={handleSearch} /> 
          </div>
          
          <h1 className="text-center mb-4 display-5">
            Computer/Tech News
          </h1>
          <FetchedNews type="programming" />
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

export default ProgrammingNews;
