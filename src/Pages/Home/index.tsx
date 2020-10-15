import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import {
  HomeContainer,
  HomeCard,
  HomeJumbotron,
  HomeRow,
  HomeCol,
  AdContainer,
} from './styles';
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
    api.get('/articles/').then(res => setArticles(res.data.articles));
  }, []);

  return (
    <>
      <HomeJumbotron fluid>
        <h1>Encontre investimentos em que você acredita!</h1>
      </HomeJumbotron>
      <AdContainer />
      <HomeContainer>
        <HomeRow>
          {articles.length > 0 ? (
            articles.map(article => (
              <HomeCol key={article._id} sm={6}>
                <Link to={'/view/' + article.slug}>
                  <HomeCard className="text-center h-100">
                    <HomeCard.Body>
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
                    </HomeCard.Body>
                    <HomeCard.Footer>
                      {new Date(article.date).toLocaleString()}
                    </HomeCard.Footer>
                  </HomeCard>
                </Link>
              </HomeCol>
            ))
          ) : (
            <HomeCol>
              {' '}
              <h1>Não encontramos nenhum artigo.</h1>{' '}
            </HomeCol>
          )}
        </HomeRow>
      </HomeContainer>
      <Footer />
    </>
  );
};

export default Home;
