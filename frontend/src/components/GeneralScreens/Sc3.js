import React from 'react';
import './Sc3.css';
import bo1 from '../../Assets/bo1.jpg';
import bo2 from '../../Assets/bo2.jpg';
import bo3 from '../../Assets/bo3.jpg';
import { Col, Row } from 'react-bootstrap';

function ArticleCard({ image, title, description }) {
  return (
    <article className="article-card" tabIndex={0} aria-label={`Article: ${title}`}>
      <div className="article-image-container">
        <img src={image} alt={title} className="article-image" />
      </div>
      <div className="article-content">
        <h3 className="article-title">{title}</h3>
        <p className="article-description">{description}</p>
        <a href="/summary" className="article-link" aria-label={`Read more about ${title}`}>
          Know More &rarr;
        </a>
      </div>
    </article>
  );
}

function Articles() {
  const articles = [
    {
      image: bo1,
      title: "Cargo Flow Through Better Supply Chain Visibility Control",
      description: "Enhancing Cargo Flow: Transforming Logistics Through Better Supply Chain Visibility Control At Flashfleet..."
    },
    {
      image: bo2,
      title: "New Additions To Our Great Metro Trucks Fleet",
      description: "Exciting News from Flashfleet: Introducing Our New Metro Trucks Fleet! At Flashfleet, we’re..."
    },
    {
      image: bo3,
      title: "The New Driver Training Recruitment Program",
      description: "Introducing Flashfleet's New Driver Training Recruitment Program! At Flashfleet, we’re committed to excellence..."
    }
  ];

  return (
    <section className="articles-section" aria-labelledby="articles-title">
      <header className="section-header">
        <span className="section-category">Insights and Trends</span>
        <h2 id="articles-title" className="section-title">Recent Articles</h2>
      </header>
      <Row className="articles-container">
        {articles.map((article, index) => (
          <Col md={4} sm={6} xs={12} key={index}>
            <ArticleCard 
              image={article.image}
              title={article.title}
              description={article.description}
            />
          </Col>
        ))}
      </Row>
    </section>
  );
}

function Sc3() {
  return (
    <main className="App">
      <Articles />
    </main>
  );
}

export default Sc3;
