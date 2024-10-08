import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewYorkTimes } from "../fetch/newsSlice";
import FetchedNews from "../components/FetchedNews";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar"; 
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function HomeNews() {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector((state) => state.news);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchNewYorkTimes({ page: 1 }));
  }, [dispatch]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(fetchNewYorkTimes({ page: currentPage + 1 }));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(fetchNewYorkTimes({ page: currentPage - 1 }));
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
            <SearchBar onSearch={handleSearch} />  {/* Gunakan komponen SearchBar */}
          </div>
          
          {/* Page Heading */}
          <h1 className="text-center mb-4 display-5">
            New York Times
          </h1>

          <FetchedNews type="home" />
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

export default HomeNews;
