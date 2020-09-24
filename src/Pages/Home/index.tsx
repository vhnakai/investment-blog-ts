import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { HomeContainer, HomeCard, HomeJumbotron, HomeCardColumns } from './styles';
import Footer from '../../Components/Footer';

interface Article {
  _id: string;
  slug: string;
  title: string;
  description: string;
  markdownArticle: string;
  // createdAt: string;
  date: string;
}

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    api.get('/articles/').then(res => {
      setArticles(res.data);
    });
  }, []);

  return (
    <>
      <HomeJumbotron>
        <h1>Encontre investimentos em que você acredita!</h1>
      </HomeJumbotron>
      <HomeContainer fluid>
        <HomeCardColumns>
          {articles.map(article => (
            <HomeCard key={article._id} className="text-center">
              <HomeCard.Body>
                <Link to={'/' + article.slug}>
                  <HomeCard.Title>{article.title}</HomeCard.Title>
                  <HomeCard.Text>
                    <p>{article.description}</p>
                    {/* <div className="small">
                    <ReactMarkdown
                      className="small"
                      source={article.markdownArticle}
                    />
                  </div> */}
                  </HomeCard.Text>
                </Link>
              </HomeCard.Body>
              <HomeCard.Footer>
                {new Date(article.date).toLocaleString()}
              </HomeCard.Footer>
            </HomeCard>
          ))}
        </HomeCardColumns>
      </HomeContainer>
      <Footer />
    </>
  );
};

export default Home;
