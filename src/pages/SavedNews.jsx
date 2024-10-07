import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function SavedNews() {
  const [savedNews, setSavedNews] = useState([]);

  useEffect(() => {
    // Retrieve saved news data from localStorage
    const news = JSON.parse(localStorage.getItem("savedNews")) || [];
    setSavedNews(news);
  }, []);

  const handleDeleteNews = (newsId) => {
    setSavedNews((prevNews) =>
      prevNews.filter((news) => news.newsId !== newsId)
    );
  };

  return (
    <section>
      <div className="bg-light">
        <div className="container py-4">
          <h1 className="text-center mb-4 display-5">
            Saved News
          </h1>
          {savedNews.length > 0 ? (
            <div className="row row-cols-1 row-cols-lg-3 ">
              {savedNews.map((news) => (
                <div className="col" key={news.newsId}>
                  <NewsCard
                    headline={news.headline}
                    paragraph={news.paragraph}
                    image={news.image}
                    alt={news.alt}
                    url={news.url}
                    byline={news.byline}
                    pub_date={news.pubDate}
                    newsId={news.newsId}
                    onDelete={handleDeleteNews}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '600px' }}>
              <div className="alert alert-info text-center">
                No news saved available
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SavedNews;
