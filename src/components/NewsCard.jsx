import { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NewsCard.css'

function NewsCard({
  headline,
  image,
  alt,
  paragraph,
  pub_date,
  byline, // Author information
  url,
  newsId,
  onDelete,
}) {
  const [isSaved, setIsSaved] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check the news in the localStorage
    const savedNews = JSON.parse(localStorage.getItem("savedNews")) || [];
    const saved = savedNews.some((news) => news.newsId === newsId);
    setIsSaved(saved);
  }, [newsId]);
  
  const pubDate = new Date(pub_date);
  const formattedPubDate = `${pubDate.getDate()}-${`0${
    pubDate.getMonth() + 1
  }`.slice(-2)}-${pubDate.getFullYear()}`;

  const handleSaveNews = () => {
    let savedNews = JSON.parse(localStorage.getItem("savedNews")) || [];

    if (isSaved) {
      // If the news is saved, delete from localStorage
      savedNews = savedNews.filter((news) => news.newsId !== newsId);
      localStorage.setItem("savedNews", JSON.stringify(savedNews));
      setModalMessage("News removed from saved!"); // Show modal when removed from saved
      if (onDelete) {
        onDelete(newsId); // Call onDelete function for updating news list on SAVED page
      }
    } else {
      // Add news to localStorage savedNews
      const newsToSave = { headline, image, alt, paragraph, pubDate, byline, url, newsId };
      savedNews.push(newsToSave);
      localStorage.setItem("savedNews", JSON.stringify(savedNews));
      setModalMessage("News added to saved!"); // Show modal when added to saved
    }

    setIsSaved(!isSaved); // Toggle saved state
    setShowModal(true); // Show modal for feedback
  };

  return (
    <div className="news-card h-100 d-inline-block pb-4">
      <div className="card h-100 d-flex flex-column justify-content-between">
        <img
          className="card-img-top h-50"
          src={image}
          alt={alt}
        />
        <div className="card-body">
          <h5 className="card-title">{headline.main}</h5>
          <p className="card-text">{paragraph}</p>
          <p className="card-text"><small className="text-muted">Published on: {formattedPubDate}</small></p>
          <p className="card-text"><small className="text-muted">{byline && byline.original ? byline.original : 'Unknown'}</small></p>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <Button variant={isSaved ? 'danger' : 'primary'} onClick={handleSaveNews}>
            {isSaved ? 'Un-Save' : 'Save'}
          </Button>
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            Read More
          </a>
        </div>
      </div>

      {/* Modal for feedback */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NewsCard;
