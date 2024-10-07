import { useSelector } from "react-redux";
import NewsCard from "./NewsCard";
import dummyImage from "../assets/nyt.jpg";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

function FetchedNews({ type }) {
  const { homeNews, indonesiaNews, programmingNews, searchNews, loading, error } =
    useSelector((state) => state.news);

  const articleNews =
    type === "home"
      ? homeNews
      : type === "indonesia"
      ? indonesiaNews
      : type === "programming"
      ? programmingNews
      : searchNews;

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '600px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '600px' }}>
        <div className="alert alert-danger d-flex justify-content-center align-items-center w-100" role="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24" 
            height="24"
            fill="currentColor"
            className="bi bi-exclamation-triangle-fill me-2"
            viewBox="0 0 16 16"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0l-6.857 11.5c-.457.765.091 1.684.98 1.684h13.714c.89 0 1.437-.92.98-1.684l-6.857-11.5zM8 5c.535 0 .954.462.9.995l-.35 4a.552.552 0 0 1-1.1 0l-.35-4A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
          <span>Something went wrong, unable to load content. Please try again later.</span>
        </div>
      </div>
    );

  return (
    <div className="container mt-3">
      <div className="row d-flex g-6">
        {articleNews.map((article, index) => (
          <div key={article._id || `${article.headline.main}-${article.web_url}`} className="col-md-4 col-sm-6">
            <NewsCard
              headline={article.headline.main}
              paragraph={article.lead_paragraph}
              image={
                article.multimedia && article.multimedia.length > 0 ? `http://www.nytimes.com/${article.multimedia[0].url}`: dummyImage
              }
              alt={article.snippet}
              url={article.web_url}
              byline={article.byline}
              pub_date={article.pub_date}
              newsId={article._id || `${article.headline.main}-${article.web_url}`}
            />
          </div>
        ))}
      </div>
  </div>
  );
}

export default FetchedNews;
